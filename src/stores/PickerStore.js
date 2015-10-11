import { createStore } from "redux";

function DatePicker(state = {}, action = {}) {
    return {
        calendarConfig : newCalendarConfig(state.calendarConfig, action),
        availableDates : availableDates(state.availableDates, action),
        basketTotal : basketTotal(state.basketTotal, action),
        dateChargesConfig : dateChargeConfig(state.dateChargesConfig, action)
    }
}

function newCalendarConfig(state = {}, action = {}) {
    switch(action.type) {
        case "CALENDARCONFIG" :
            return action.state;
        default :
            return state;
    }
}

function availableDates(state = [], action = {}) {
    switch(action.type) {
        case "AVAILABLEDATES" :
            return Object.keys(action.state).map(key => key);
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

function dateChargeConfig(state = {}, action = {}) {
    switch(action.type) {
        case "DATECHARGECONFIG" :
            return action.state;
        default :
            return state;
    }
}

let DatePickerStore = createStore(DatePicker);
export default DatePickerStore;