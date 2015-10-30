import { format } from "../utils/cost-formatter";

export function basketTotals(state = { total: 0, overallTotal : 0, activeDiscounts : [], basketProducts : [], selectedTimeslot : {}, activeCharges : [] }, action = {}) {
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
                overallTotal : format(state.total - discount)
            });
        case "ADDCHARGE" :
            let activeCharges = state.activeCharges.filter(charge => charge.name === action.state.name);
            if(activeCharges.length) {
                return state;
            }
            else {
                return Object.assign({}, state, {
                    activeCharges : state.activeCharges.concat(action.state)
                });
            }
        case "REMOVECHARGE" :
            let charges = state.activeCharges.filter(charge => charge.name !== action.state.name);
            return Object.assign({}, state, {
                activeCharges : charges
            });
        case "BASKETTOTALINCCHARGESSUPDATE" :
            return state;
            //let discount = state.activeDiscounts.map(d => {
            //    if(d.isActive) {
            //        if(d.percentage) {
            //            return state.total / 100 * d.percentage;
            //        }
            //        else {
            //            return d.value;
            //        }
            //    }
            //    else {
            //        return 0;
            //    }
            //}).reduce((a,b) => a + b, 0);
            //return Object.assign({}, state, {
            //    overallTotal : format(state.total - discount)
            //});
        // anytime a delivery charge is selected and affects the total inc discounts
        case "ADDTOTOTAL" :
            return Object.assign({}, state, {
                total : format(state.overallTotal + action.state)
            });
        // anytime a delivery charge is selected and affects the total inc discounts
        case "SUBTRACTFROMTOTAL" :
            return Object.assign({}, state, {
                total : format(state.overallTotal - action.state)
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