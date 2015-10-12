import { createStore } from "redux";

function DatePicker(state = {}, action = {}) {
    return {
        availableDates : availableDates(state.availableDates, action),
        basketTotal : basketTotal(state.basketTotal, action),
        chargesConfig : chargesConfig(state.dateChargesConfig, action)
    }
}

function availableDates(state = {}, action = {}) {
    switch(action.type) {
        case "NEWAVAILABLEDATESANDCHARGES" :
            return action.state;
        default :
            return state;
    }
}

function basketTotal(state = 0, action = {}) {
    switch(action.type) {
        case "BASKETTOTALUPDATE" :
            return action.state;
        default :
            return state;
    }
}

function chargesConfig(state = {}, action = {}) {
    switch(action.type) {
        case "NEWCHARGESCONFIG" :
            return action.state;
        default :
            return state;
    }
}

let DatePickerStore = createStore(DatePicker);
export default DatePickerStore;