const BASKETTOTALUPDATE = "BASKETTOTALUPDATE";
const NEWBASKETPRODUCTS = "NEWBASKETPRODUCTS";
const ADDBASKETDISCOUNTS = "ADDBASKETDISCOUNTS";
const OVERALLBASKETTOTAL = "OVERALLBASKETTOTAL";
const ISDISCOUNTELIGIBLE = "ISDISCOUNTELIGIBLE";
const UPDATEPRODUCTCOUNT = "UPDATEPRODUCTCOUNT";
const ADDCHARGE = "ADDCHARGE";
const REMOVECHARGE = "REMOVECHARGE";

function basketProducts(data) {
    return { state : data, type : NEWBASKETPRODUCTS };
}

function basketTotal(data) {
    return { state : data, type: BASKETTOTALUPDATE };
}

function addToBasketDiscounts(data) {
    return { state : data, type: ADDBASKETDISCOUNTS };
}

function overallBasketTotal(data) {
    return { state : data, type: OVERALLBASKETTOTAL };
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

export function addProductsToBasket(products) {
    return function (dispatch) {
        dispatch(basketProducts(products));
        dispatch(basketTotal());
        dispatch(isDiscountEligible());
        dispatch(overallBasketTotal());
    }
}

export function addDiscount(discount) {
    return function (dispatch) {
        dispatch(addToBasketDiscounts(discount));
        dispatch(isDiscountEligible());
        dispatch(overallBasketTotal());
    }
}

export function updateProductCount(name) {
    return function (dispatch) {
        dispatch(productCount(name));
        dispatch(basketTotal());
        dispatch(isDiscountEligible());
        dispatch(overallBasketTotal());
    }
}

export function addCharge(charge) {
    return function(dispatch) {
        dispatch(removeBasketCharge(charge));
        dispatch(addToBasketCharge(charge));
        dispatch(basketTotal());
        dispatch(isDiscountEligible());
        dispatch(overallBasketTotal())
    }
}

export function removeCharge(charge) {
    return function(dispatch) {
        dispatch(removeBasketCharge(charge));
        dispatch(basketTotal());
        dispatch(isDiscountEligible());
        dispatch(overallBasketTotal())
    }
}

export function deliveryCharge(data) {
    return function(dispatch) {
        if(data.isActive) {
            dispatch(addCharge({ name : "delivery-charge", value : data.charge }));
        }
        else {
            dispatch(removeCharge({ name : "delivery-charge" }));
        }
        dispatch(overallBasketTotal())
    }
}