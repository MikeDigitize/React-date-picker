import { createStore } from "redux";

function DatePicker(state = {}, action = {}) {
    return {
        availableDates : availableDates(state.availableDates, action),
        basketTotal : basketTotal(state.basketTotal, action),
        chargesConfig : chargesConfig(state.dateChargesConfig, action),
        daysConfig : daysConfig(state.daysConfig, action),
        totalWeeks : totalWeeks(state.totalWeeks, action),
        tableDisplayIndex : tableDisplayIndex(state.tableDisplayIndex, action),
        daysAndChargesConfig : daysAndChargesConfig(state.daysAndChargesConfig, action)
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

function daysConfig(state = {}, action = {}) {
    switch(action.type) {
        case "NEWDAYSCONFIG" :
            return action.state;
        default :
            return state;
    }
}

function totalWeeks(state = 0, action = {}) {
    switch(action.type) {
        case "TOTALWEEKSUPDATE" :
            return action.state;
        default :
            return state;
    }
}

function tableDisplayIndex(state = 0, action = {}) {
    switch(action.type) {
        case "TABLEDISPLAYINDEX" :
            return action.state;
        default :
            return state;
    }
}

function daysAndChargesConfig(state = {}, action = {}) {
    switch(action.type) {
        case "NEWDAYSANDCHARGESCONFIG" :
            return action.state;
        default :
            return state;
    }
}

let DatePickerStore = createStore(DatePicker);
export default DatePickerStore;