import { format } from "../utils/cost-formatter";

export function availableDates(state = {}, action = {}) {
    switch(action.type) {
        case "NEWAVAILABLEDATESANDCHARGES" :
            return action.state;
        default :
            return state;
    }
}

export function basketTotal(state = { total: 0, totalIncDiscounts : 0, activeDiscounts : [], basketProducts : [] }, action = {}) {
    switch(action.type) {
        // store products in basket - called every time basket is updated
        case "NEWBASKETPRODUCTS" :
            var store = Object.assign({}, state, {
                basketProducts : action.state
            });
            return store;
        // updates after basket products are updated - no new state needed
        case "BASKETTOTALUPDATE" :
            return Object.assign({}, state, {
                total : format(state.basketProducts.map(p => p.quantity * p.cost || 0).reduce((a,b) => a+b, 0))
            });
        // when a discount becomes active - recalculate total inc discount after
        case "ADDBASKETDISCOUNTS" :
            let notInBasket = state.activeDiscounts.filter(discount => discount.name === action.state.name);
            if(notInBasket.length) {
                return state;
            }
            else {
                return Object.assign({}, state, {
                    activeDiscounts : state.activeDiscounts.concat(action.state)
                });
            }
        // check to see if any discounts on poge are valid via the the value at which they become active
        case "ISDISCOUNTELIGIBLE" :
            let total = state.total;
            let discounts = state.activeDiscounts.map(d => {
                let threshold = d.threshold;
                d.isActive = total >= threshold;
                return d;
            });
            return Object.assign({}, state, {
                activeDiscounts : discounts
            });
        // updates after basket products are updated AND when a discount is added / removed - no new state needed
        case "BASKETTOTALINCDISCOUNTSUPDATE" :
            let discount = state.activeDiscounts.map(d => {
                if(d.isActive) {
                    if(d.percentage) {
                        return state.total / 100 * d.percentage;
                    }
                    else {
                        return d.value;
                    }
                }
                else {
                    return 0;
                }
            }).reduce((a,b) => a + b, 0);
            return Object.assign({}, state, {
                totalIncDiscounts : format(state.total - discount)
            });
        // anytime a delivery charge is selected and affects the total inc discounts
        case "ADDTOTOTAL" :
            return Object.assign({}, state, {
                total : format(state.totalIncDiscounts + action.state)
            });
        // anytime a delivery charge is selected and affects the total inc discounts
        case "SUBTRACTFROMTOTAL" :
            return Object.assign({}, state, {
                total : format(state.totalIncDiscounts - action.state)
            });
        // update quantities of products in basket
        case "UPDATEPRODUCTCOUNT" :
            let product = state.basketProducts.filter(prod => prod.name === action.state.name).shift();
            if(action.state.add) {
                product.quantity++;
            }
            else {
                product.quantity--;
            }
            return Object.assign({}, state, {
                basketProducts : state.basketProducts
            });
        default :
            return state;
    }
}

export function selectedTimeslotData(state = {}, action = {}) {
    switch(action.type) {
        case "NEWCHOSENTIMESLOTDATA" :
            return action.state;
        default :
            return state;
    }
}