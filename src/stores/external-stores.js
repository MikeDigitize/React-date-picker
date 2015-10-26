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
            return action.state;
        case "ADDTOTOTAL" :
            return state + action.state;
        case "SUBTRACTFROMTOTAL" :
            console.log("Subtract")
            return state - action.state;
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
        case "BASKETPRODUCTS" :
            return action.state;
        default :
            return state;
    }
}