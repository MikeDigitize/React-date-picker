import { createStore } from "redux";
import { basketTotal, availableDates, selectedTimeslotData, basketProducts } from "./external-stores";
import { totalWeeks, tableDisplayIndex, dateRanges, tableHeadData, tableBodyData, timeDescriptions, selectedTimeslot, displayAllRows } from "./picker-data-stores";

function DatePicker(state = {}, action = {}) {
    return {
        availableDates : availableDates(state.availableDates, action),
        basketTotal : basketTotal(state.basketTotal, action),
        totalWeeks : totalWeeks(state.totalWeeks, action),
        tableDisplayIndex : tableDisplayIndex(state.tableDisplayIndex, action),
        dateRanges : dateRanges(state.dateRanges, action),
        tableHeadData : tableHeadData(state.tableHeadData, action),
        tableBodyData : tableBodyData(state.tableBodyData, action),
        timeDescriptions : timeDescriptions(state.timeDescriptions, action),
        selectedTimeslotData : selectedTimeslotData(state.selectedTimeslotData, action),
        selectedTimeslot : selectedTimeslot(state.selectedTimeslot, action),
        displayAllRows : displayAllRows(state.displayAllRows, action),
        basketProducts : basketProducts(state.basketProducts, action)
    }
}

let DatePickerStore = createStore(DatePicker);
export default DatePickerStore;