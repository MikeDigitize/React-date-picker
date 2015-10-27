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
        case "BASKETPRODUCTTOTAL" :
            let result = action.state.map(function(product){
                return product.quantity * product.cost || 0;
            });
            if(result.length) {
                return result.reduce((a,b)=> Number((a + b).toFixed(2)));
            }
            else {
                return 0.00;
            }
        default :
            return state;
    }
}