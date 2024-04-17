import React from 'react'

function getDateOptions(timeline){
    if (timeline === "today" || timeline === "yesterday") {
        return { hour: "2-digit" };
    } else {
        return { month: "short", day: "2-digit" };
    }
};

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
            unit: product["Product Unit"],
            discount: product["Product Discount"],
        }
        return newProduct
    })
    return updatedProductArr
};


export {getDateOptions, dateValueFormatter, productArrHandler}


