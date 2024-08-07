import React, { useState, useEffect } from 'react';
import { formatDateToISO } from '../helpers/helpers';

const ShiftStatusContext = React.createContext(null);

const initialStatus = {
  isOpen: false,
  startAmount:0,
  amount: 0,
  clockedOut: false,
  transactions: [] // To store additions and removals
};

// Helper function to save to session storage
const saveShiftStatusToSessionStorage = (shiftStatus) => {
  localStorage.setItem('shiftStatus', JSON.stringify(shiftStatus));
};

// Helper function to load from session storage
const loadShiftStatusFromSessionStorage = () => {
  const storedStatus = localStorage.getItem('shiftStatus');
  return storedStatus ? JSON.parse(storedStatus) : initialStatus;
};

export function ShiftStatusProvider({ children }) {
  // Use the loaded status from session storage or the provided initial status
  const [shiftStatus, setShiftStatus] = useState(loadShiftStatusFromSessionStorage());

  useEffect(() => {
    // Store the shiftStatus in session storage whenever it changes
    saveShiftStatusToSessionStorage(shiftStatus);
  }, [shiftStatus]); // Effect runs every time shiftStatus changes

    // Helper functions to manage drawer transactions
    const updateAmount = (amount) => {
      setShiftStatus(prevStatus => {
        if (amount != prevStatus.amount) {
          const newTransactions = [...prevStatus.transactions, { amount: amount - prevStatus.amount, date: new Date().toISOString() }];
          return { ...prevStatus, transactions: newTransactions, amount: amount };
        }
        else{
          return { ...prevStatus, amount: amount };
        }

      });
    };
  
    // Initial shift state
    const startShift = (amount) => {
      setShiftStatus(prevStatus => ({
        ...prevStatus,
        isOpen: true,
        startAmount:amount,
        amount: amount,
        transactions: []
      }));
    };
  
    // Create Z report and clean the shift state
    const endShift = () => {
      const sales = JSON.parse(sessionStorage.getItem('sales')) || [];
      createReport(sales, shiftStatus)
      setShiftStatus(prevStatus => ({
        ...prevStatus,
        isOpen: false,
      }));
    };

  return (
    <ShiftStatusContext.Provider value={{ shiftStatus, setShiftStatus, updateAmount, startShift, endShift }}>
      {children}
    </ShiftStatusContext.Provider>
  );
}

export function useShiftStatus() {
  return React.useContext(ShiftStatusContext);
}

const createReport = (sales, shiftStatus) =>{

  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0); // Set milliseconds to 0 to ensure it's part of the current day

  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999); 

  const dayOfYear = (endDate.getDate() + endDate.getMonth() * 31); // Simplified calculation for day of the year
  const ZNO = "Z" + endDate.getFullYear().toString() + dayOfYear.toString().padStart(3, "0");

  let totalCashPayments = 0;
  let totalCardPayments = 0;
  let cashTransactions = 0;
  let cardTransactions = 0;

  let grossSales = 0;
  let totalDiscount = 0;
  let totalSavedByOffers = 0;
  let totalCouponsSaved = 0;
  let totalNetSales = 0;

  let totalTaxAmount = 0;
  let categorySales = {};


  // Computing transactions based on payment type
  sales.forEach(sale => {
    sale.transactions.forEach(transaction => {
        if (transaction.type === 'cash') {
            totalCashPayments += parseFloat(transaction.amount.replace(',', ''));
            cashTransactions += 1;
        } else if (transaction.type === 'card') {
            totalCardPayments += parseFloat(transaction.amount.replace(',', ''));
            cardTransactions += 1;
        }
    });

    grossSales += parseFloat(sale.subTotal);
    totalDiscount += sale.subTotal * sale.discount/100  ;
    totalSavedByOffers += sale.savedByOffers;
    sale.coupons.forEach(coupon => {
        totalCouponsSaved += coupon.saved;
    });
    

    sale.items.forEach(item => {
      const taxRate = parseFloat(item.product.tax) / 100;
      totalTaxAmount += (item.computedPrice * taxRate);

      const category = item.product.categories.split(' > ')[0];
      if (!categorySales[category]) {
          categorySales[category] = 0;
      }
      categorySales[category] += item.qty;
    });

    totalNetSales += grossSales.toFixed(2) - totalDiscount.toFixed(2) - totalSavedByOffers.toFixed(2) - totalCouponsSaved.toFixed(2);
  });

  // Computing additions to drawer amount and total on end
  const drawerActions = {
    openingBalance: shiftStatus.startAmount,
    removals: shiftStatus.transactions.reduce((totRemoval, currAction) => {
      return currAction.amount < 0 ? totRemoval + currAction.amount : totRemoval;
    }, 0),
    additions: shiftStatus.transactions.reduce((totAdditions, currAction) => {
      return currAction.amount > 0 ? totAdditions + currAction.amount : totAdditions;
    }, 0),
    total: shiftStatus.amount
  };

  const newReport = {
    id:ZNO.replace("Z", ""),
    ZNO: ZNO,
    shop: "Kapaklı Şube",
    location:"Turkiye/Tekirdağ/Kapaklı/Cumhuriyet Mah.",
    cashier:"Kate Grimes",
    date: formatDateToISO(new Date()).split(" ")[0],
    dateRangeStr : `${formatDateToISO(startDate).split(" ")[0]} - ${formatDateToISO(endDate).split(" ")[0]}`,
    drawerActions : drawerActions,
    totalTaxAmount: totalTaxAmount,
    transactions : {
      cashTotal : totalCashPayments,
      cashTransactions : cashTransactions,
      cardTotal : totalCardPayments,
      cardTransactions: cardTransactions
    },
    saleSummary: {
      grossSales : grossSales,
      totalDiscount : totalDiscount,
      totalSavedByOffers : totalSavedByOffers,
      totalCouponsSaved : totalCouponsSaved,
      totalNetSales : totalNetSales,
    },
    categorySales:categorySales
  }


  const pastReports = JSON.parse(localStorage.getItem("reports") || "[]");
  // Check if there's already a report with the same ID
  const isDuplicate = pastReports.some(report => report.id === newReport.id);
  
  // If it's not a duplicate, add the new report
  if (!isDuplicate) {
      localStorage.setItem("reports", JSON.stringify([...pastReports, newReport]));
  } else {
      // console.log("Report with the same ID already exists. Not adding duplicate.");
  }

}