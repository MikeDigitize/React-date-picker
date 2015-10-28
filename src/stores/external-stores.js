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
        // when a discount becomes active - recalculate totalincdiscount after
        case "ADDBASKETDISCOUNTS" :
            return Object.assign({}, state, {
                activeDiscounts : state.activeDiscounts.concat(action.state)
            });
        // when a discount becomes inactive - recalculate totalincdiscount after
        case "REMOVEBASKETDISCOUNT" :
            return Object.assign({}, state, {
                activeDiscounts : state.activeDiscounts.filter((discount, i) => state.activeDiscounts.indexOf(action.state.name) !== i)
            });
        // updates after basket products are updated AND when a discount is added / removed - no new state needed
        case "BASKETTOTALINCDISCOUNTSUPDATE" :
            return Object.assign({}, state, {
                totalIncDiscounts : format(state.total - state.activeDiscounts.map(d => d.total || 0).reduce((a,b) => a+b, 0))
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