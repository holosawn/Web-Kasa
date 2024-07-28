function get3Pay2(items) {
  const resettedItems = items.map(item => ({
  ...item,
  computedPrice: item.defaultPrice,
  offersApplied: null,
}));

const updatedItems = resettedItems.map((item) => {
  const isPiece = item.product.unit === "piece";
  // Set the divide number based on whether the item is a piece or not
  const divideNum = isPiece ? 3 : 3000;

  // Change number to closest power of divideNum
  const qtyToApply = Math.floor(item.qty / divideNum) * divideNum;

  const isAppliable =
    (item.offersApplied === undefined ||
      item.defaultPrice !== item.computedPrice + item.saved) &&
    qtyToApply >= divideNum;

  // Create a new object with updated computed price and offers applied
  const updatedItem = {
    ...item,
    computedPrice: isAppliable
      ? item.defaultPrice - item.product.price * (qtyToApply / divideNum)
      : item.computedPrice,
    offersApplied: {
      ...(item.offersApplied || {}),
      "3/2": {
        saved: item.product.price * (qtyToApply / divideNum),
        name: "3 Al 2 Öde",
      },
    },
    qty: item.qty,
  };

  return updatedItem;
});

return updatedItems;
}

function careTime (items) {
  const resettedItems = items.map(item => ({
  ...item,
  computedPrice: item.defaultPrice,
  offersApplied: null,
}));

return resettedItems.map((item) => {
  let computedPrice = item.defaultPrice;
  let offersApplied = item.offersApplied;

  // Check if the item's product category includes "Personal Care"
  if (item.product.categories.toLowerCase().includes("personal care")) {
    // Apply 50% discount on Personal Care category
    const discountAmount = item.defaultPrice * 0.5;
    computedPrice = item.defaultPrice - discountAmount;
    offersApplied = {
      ...(item.offersApplied || {}),
      "50% Care Time Off": {
        saved: discountAmount,
        name: "50% Care Time Off",
      },
    };
  }

  return {
    ...item,
    computedPrice,
    offersApplied,
    qty: item.qty,
  };
});
}

function resetOffers(items) {
const updatedItems = items.map(item => ({
  ...item,
  computedPrice: item.defaultPrice,
  offersApplied: null,
}));

return updatedItems
}

const offers = {
"3/2": {
  key:'3/2',
  name: "3 al 2 öde",
  displayNames:{
    'en':'Get 3 pay 2',
    'tr':'3 al 2 öde',
    'ru':'Купи 3, плати за 2'
  },
  offerFunc: get3Pay2,
},
"careTime": {
  key:'careTime',
  name: "Care Time",
  displayNames:{
    'en':'Care Time',
    'tr':'Bakım Zamanı',
    'ru':'время обслуживания'
  },
  offerFunc: careTime,
},
'none': {
  key:'none',
  name: 'No Offer',
  displayNames:{
    'en':'No Offer',
    'tr':'Kampanya yok',
    'ru':'Нет предложения'
  },
  offerFunc: resetOffers,
},
};

export {offers, get3Pay2, careTime, resetOffers}