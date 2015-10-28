const NEWAVAILABLEDATESANDCHARGES = "NEWAVAILABLEDATESANDCHARGES";
const BASKETTOTALUPDATE = "BASKETTOTALUPDATE";
const ADDTOTOTAL = "ADDTOTOTAL";
const SUBTRACTFROMTOTAL = "SUBTRACTFROMTOTAL";
const NEWCHOSENTIMESLOTDATA= "NEWCHOSENTIMESLOTDATA";
const NEWBASKETPRODUCTS = "NEWBASKETPRODUCTS";
const ADDBASKETDISCOUNTS = "ADDBASKETDISCOUNTS";
const REMOVEBASKETDISCOUNT = "REMOVEBASKETDISCOUNT";
const BASKETTOTALINCDISCOUNTSUPDATE = "BASKETTOTALINCDISCOUNTSUPDATE";

export function availableDates(data) {
    return { state : data, type: NEWAVAILABLEDATESANDCHARGES };
}

export function selectedTimeslotData(data) {
    return { state : data, type : NEWCHOSENTIMESLOTDATA };
}

export function basketProducts(data) {
    return { state : data, type : NEWBASKETPRODUCTS };
}

export function basketTotal(data) {
    return { state : data, type: BASKETTOTALUPDATE };
}

export function addToBasketDiscounts(data) {
    return { state : data, type: ADDBASKETDISCOUNTS };
}

export function removeBasketDiscount(data) {
    return { state : data, type: REMOVEBASKETDISCOUNT };
}

export function basketTotalIncDiscountsUpdate(data) {
    return { state : data, type: BASKETTOTALINCDISCOUNTSUPDATE };
}

export function addToBasketTotal(data) {
    return { state : data, type: ADDTOTOTAL };
}

export function subtractFromBasketTotal(data) {
    return { state : data, type: SUBTRACTFROMTOTAL };
}

