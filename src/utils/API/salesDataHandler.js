import React from "react";

const salesDataHandler = (data) => {
    // total values will be derived here

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

export default salesDataHandler;
