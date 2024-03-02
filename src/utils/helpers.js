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


export {getDateOptions, dateValueFormatter}


