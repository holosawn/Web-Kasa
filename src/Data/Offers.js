function get3Pay2(Items) {
  const updatedItems = Items.map((item) => {
    const isPiece = item.product.unit === "piece";
    const divideNum = isPiece ? 3 : 3000;

    const qtyToApply = Math.floor(item.qty / divideNum) * divideNum;

    const isAppliable =
      (item.offersApplied === undefined ||
        item.defaultPrice !== item.computedPrice + item.saved) &&
      qtyToApply >= divideNum;

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
        'ru':''
      },
      offerFunc: get3Pay2,
    },
    'none': {
      key:'none',
      name: 'No Offer',
      displayNames:{
        'en':'No Offer',
        'tr':'Kampanya yok',
        'ru':''
      },
      offerFunc: resetOffers,
    },
  };

  export {offers, get3Pay2, resetOffers}