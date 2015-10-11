import { createStore } from "redux";

function DatePicker(state = {}, action = {}) {
    return {
        availableDays : newDatePickerData(state.availableDays, action),
        chargeConfig : chargeConfig(state.chargeConfig, action),
        basketTotals : basketTotals(state.basketTotals, action)
    }
}

function newDatePickerData(state = {}, action = {}) {
    switch(action.type) {
        case "NEWDATEPICKERDATA" :
            return action.state;
        default :
            return state;
    }
}

function chargeConfig(state = {}, action = {}) {
    switch(action.type) {
        case "NEWCHARGECONFIG" :
            return action.state;
        default :
            return state;
    }
}

function basketTotals(state = {}, action = {}) {
    switch(action.type) {
        case "NEWBASKETTOTALS" :
            return action.state;
        default :
            return state;
    }
}

let DatePickerStore = createStore(DatePicker);
export default DatePickerStore;


/*

    store for the dates - available dates & details & extra charges & ranges




 */


