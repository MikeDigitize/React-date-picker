const NEWAVAILABLEDATESANDCHARGES = "NEWAVAILABLEDATESANDCHARGES";
const BASKETTOTALUPDATE = "BASKETTOTALUPDATE";
const ADDTOTOTAL = "ADDTOTOTAL";
const SUBTRACTFROMTOTAL = "SUBTRACTFROMTOTAL";
const NEWCHOSENTIMESLOTDATA= "NEWCHOSENTIMESLOTDATA";
const NEWBASKETPRODUCTS = "NEWBASKETPRODUCTS";
const ADDBASKETDISCOUNTS = "ADDBASKETDISCOUNTS";
const BASKETTOTALINCDISCOUNTSUPDATE = "BASKETTOTALINCDISCOUNTSUPDATE";
const ISDISCOUNTELIGIBLE = "ISDISCOUNTELIGIBLE";

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

export function basketTotalIncDiscountsUpdate(data) {
    return { state : data, type: BASKETTOTALINCDISCOUNTSUPDATE };
}

export function addToBasketTotal(data) {
    return { state : data, type: ADDTOTOTAL };
}

export function subtractFromBasketTotal(data) {
    return { state : data, type: SUBTRACTFROMTOTAL };
}

export function isDiscountEligible(data) {
    return { state : data, type : ISDISCOUNTELIGIBLE }
}

export function addToBasket(products) {
    return function (dispatch) {
        dispatch(basketProducts(products));
        dispatch(basketTotal());
        dispatch(isDiscountEligible());
        dispatch(basketTotalIncDiscountsUpdate());
    }
}

export function addDiscount(discount) {
    return function (dispatch) {
        dispatch(addToBasketDiscounts(discount));
        dispatch(isDiscountEligible());
        dispatch(basketTotalIncDiscountsUpdate());
    }
}