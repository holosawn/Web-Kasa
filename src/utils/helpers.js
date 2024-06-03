import React from 'react'

// Returns options for date value display. Passed as parameter to dateValueFormatter
function getDateOptions(timeline){
    if (timeline === "today" || timeline === "yesterday") {
        return { hour: "2-digit" };
    } else {
        return { month: "short", day: "2-digit" };
    }
};

// To be used in MUI chart to display date values
function dateValueFormatter(dateItem, dateOptions){
    return dateItem.toLocaleString("En-us", dateOptions);
};

function productArrHandler(productArr){
    const updatedProductArr = productArr.map(product => {
        const newProduct={
            id:product['Uniq Id'],
            name: product["Product Name"],
            categories:product['Product Category'],
            images:product["Product Image Url"],
            code: product['Product Barcode'],
            price: product["Product Price"],
            tax: product["Product Tax"],
            stock: product["Product Available Inventory"],
            cost: product["Product Cost"],
            barcode: product["Product Barcode"],
            code: product["Product Code"],
            unit: product["Product Unit"],
            discount: product["Product Discount"],
            isFavorite:product["Favorite"]
        }
        return newProduct
    })
    return updatedProductArr
};

const salesDataHandler = (data) => {

    const salesResult={};
    
    for (const financial in data.salesResultOverTime ) {
        if (financial === 'date') {
            continue;
        } else {
            salesResult[financial] = data.salesResultOverTime[financial].values.reduce((acc, curr)=> acc+curr, 0)
        }
    }
    
    const salesDeduction={};
    
    for (const financial in data.salesDeductionOverTime ) {
        if (financial === 'date') {
            continue;
        } else {
            salesDeduction[financial] = data.salesDeductionOverTime[financial].values.reduce((acc, curr)=> acc+curr, 0)
        }
    }
    
    data.salesResult = salesResult;
    data.salesDeduction = salesDeduction;
    data.topProducts.sort((a,b) => b.qty - a.qty);
    data.topCategories.sort((a,b) => b.qty - a.qty);
    
    return data;
    }
    
    function formatDateToISO(date) {
        const timezoneOffsetMilliseconds = Math.abs(date.getTimezoneOffset() * 60000);
        const adjustedTime = new Date(date.getTime() + timezoneOffsetMilliseconds);
        const isoDateString = adjustedTime.toISOString();
        return isoDateString.split('T')[0];
    }


export {getDateOptions, dateValueFormatter, salesDataHandler, productArrHandler, formatDateToISO}


