import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { basketTotals } from "./external-stores";
import { tableData } from "./picker-data-stores";

function DatePicker(state = {}, action = {}) {
    return {
        //availableDates : availableDates(state.availableDates, action),
        basketTotals : basketTotals(state.basketTotals, action),
        //totalWeeks : totalWeeks(state.totalWeeks, action),
        //tableDisplayIndex : tableDisplayIndex(state.tableDisplayIndex, action),
        //dateRanges : dateRanges(state.dateRanges, action),
        //tableHeadData : tableHeadData(state.tableHeadData, action),
        //tableBodyData : tableBodyData(state.tableBodyData, action),
        //timeDescriptions : timeDescriptions(state.timeDescriptions, action),
        //selectedTimeslotData : selectedTimeslotData(state.selectedTimeslotData, action),
        //selectedTimeslot : selectedTimeslot(state.selectedTimeslot, action),
        //displayAllRows : displayAllRows(state.displayAllRows, action),
        tableData : tableData(state.tableData, action)
    }
}

let store = applyMiddleware(thunk)(createStore);
let DatePickerStore = store(DatePicker);
export default DatePickerStore;