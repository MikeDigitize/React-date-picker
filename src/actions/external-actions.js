const BASKETTOTALUPDATE = "BASKETTOTALUPDATE";
const NEWBASKETPRODUCTS = "NEWBASKETPRODUCTS";
const ADDBASKETDISCOUNTS = "ADDBASKETDISCOUNTS";
const BASKETTOTALINCDISCOUNTSUPDATE = "BASKETTOTALINCDISCOUNTSUPDATE";
const ISDISCOUNTELIGIBLE = "ISDISCOUNTELIGIBLE";
const UPDATEPRODUCTCOUNT = "UPDATEPRODUCTCOUNT";
const ADDCHARGE = "ADDCHARGE";
const REMOVECHARGE = "REMOVECHARGE";
const BASKETTOTALINCCHARGESSUPDATE = "BASKETTOTALINCCHARGESSUPDATE";

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

function isDiscountEligible(data) {
    return { state : data, type : ISDISCOUNTELIGIBLE }
}

function productCount(data){
    return { state : data, type : UPDATEPRODUCTCOUNT}
}

function addToBasketCharge(data) {
    return { state : data, type : ADDCHARGE }
}

function removeBasketCharge(data) {
    return { state : data, type : REMOVECHARGE }
}

function basketTotalIncChargesUpdate(data) {
    return { state : data, type : BASKETTOTALINCCHARGESSUPDATE }
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

export function addCharge(charge) {
    return function(dispatch) {
        dispatch(removeBasketCharge(charge));
        dispatch()
    }
}