import { createStore } from "redux";
import { basketTotal, availableDates, selectedTimeslotData } from "./external-stores";
import { totalWeeks, tableDisplayIndex, dateRanges, tableHeadData, tableBodyData, timeDescriptions, selectedTimeslot, rowsToDisplay } from "./picker-data-stores";

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
        rowsToDisplay : rowsToDisplay(state.rowsToDisplay, action)
    }
}

let DatePickerStore = createStore(DatePicker);
export default DatePickerStore;