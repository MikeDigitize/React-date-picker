import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { basketTotal, basketTotals } from "./external-stores";
import { totalWeeks, tableDisplayIndex, dateRanges, tableHeadData, tableBodyData, timeDescriptions, selectedTimeslot, displayAllRows, availableDates, selectedTimeslotData } from "./picker-data-stores";

function DatePicker(state = {}, action = {}) {
    return {
        availableDates : availableDates(state.availableDates, action),
        basketTotals : basketTotal(state.basketTotals, action),
        totalWeeks : totalWeeks(state.totalWeeks, action),
        tableDisplayIndex : tableDisplayIndex(state.tableDisplayIndex, action),
        dateRanges : dateRanges(state.dateRanges, action),
        tableHeadData : tableHeadData(state.tableHeadData, action),
        tableBodyData : tableBodyData(state.tableBodyData, action),
        timeDescriptions : timeDescriptions(state.timeDescriptions, action),
        selectedTimeslotData : selectedTimeslotData(state.selectedTimeslotData, action),
        selectedTimeslot : selectedTimeslot(state.selectedTimeslot, action),
        displayAllRows : displayAllRows(state.displayAllRows, action)
    }
}

let store = applyMiddleware(thunk)(createStore);
let DatePickerStore = store(DatePicker);
export default DatePickerStore;