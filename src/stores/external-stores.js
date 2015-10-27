import { format } from "../utils/cost-formatter";

export function availableDates(state = {}, action = {}) {
    switch(action.type) {
        case "NEWAVAILABLEDATESANDCHARGES" :
            return action.state;
        default :
            return state;
    }
}

export function basketTotal(state = 0, action = {}) {
    switch(action.type) {
        case "BASKETTOTALUPDATE" :
            return action.state.map(p => p.quantity * p.cost || 0).reduce((a,b) => format(a+b));
        case "ADDTOTOTAL" :
            return format(state + action.state);
        case "SUBTRACTFROMTOTAL" :
            return format(state - action.state);
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

export function basketProducts(state = [], action = {}) {
    switch(action.type) {
        case "NEWBASKETPRODUCTS" :
            return action.state;
        default :
            return state;
    }
}