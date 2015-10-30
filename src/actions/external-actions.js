const BASKETTOTALUPDATE = "BASKETTOTALUPDATE";
const ADDTOTOTAL = "ADDTOTOTAL";
const SUBTRACTFROMTOTAL = "SUBTRACTFROMTOTAL";
const NEWBASKETPRODUCTS = "NEWBASKETPRODUCTS";
const ADDBASKETDISCOUNTS = "ADDBASKETDISCOUNTS";
const BASKETTOTALINCDISCOUNTSUPDATE = "BASKETTOTALINCDISCOUNTSUPDATE";
const ISDISCOUNTELIGIBLE = "ISDISCOUNTELIGIBLE";
const UPDATEPRODUCTCOUNT = "UPDATEPRODUCTCOUNT";

function basketProducts(data) {
    return { state : data, type : NEWBASKETPRODUCTS };
}

function basketTotal(data) {
    return { state : data, type: BASKETTOTALUPDATE };
}

function addToBasketDiscounts(data) {
    return { state : data, type: ADDBASKETDISCOUNTS };
}

function basketTotalIncDiscountsUpdate(data) {
    return { state : data, type: BASKETTOTALINCDISCOUNTSUPDATE };
}

export function addToBasketTotal(data) {
    return { state : data, type: ADDTOTOTAL };
}

export function subtractFromBasketTotal(data) {
    return { state : data, type: SUBTRACTFROMTOTAL };
}

function isDiscountEligible(data) {
    return { state : data, type : ISDISCOUNTELIGIBLE }
}

function productCount(data){
    return { state : data, type : UPDATEPRODUCTCOUNT}
}

export function addProductsToBasket(products) {
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

export function updateProductCount(name) {
    return function (dispatch) {
        dispatch(productCount(name));
        dispatch(basketTotal());
        dispatch(isDiscountEligible());
        dispatch(basketTotalIncDiscountsUpdate());
    }
}