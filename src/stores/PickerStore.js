import { createStore } from "redux";
import { basketTotal, availableDates } from "./external-stores";
import { totalWeeks, tableDisplayIndex, dateRanges, tableHeadData, tableBodyData } from "./picker-data-stores";

function DatePicker(state = {}, action = {}) {
    return {
        availableDates : availableDates(state.availableDates, action),
        basketTotal : basketTotal(state.basketTotal, action),
        totalWeeks : totalWeeks(state.totalWeeks, action),
        tableDisplayIndex : tableDisplayIndex(state.tableDisplayIndex, action),
        dateRanges : dateRanges(state.dateRanges, action),
        tableHeadData : tableHeadData(state.tableHeadData, action),
        tableBodyData : tableBodyData(state.tableBodyData, action)
    }
}

let DatePickerStore = createStore(DatePicker);
export default DatePickerStore;