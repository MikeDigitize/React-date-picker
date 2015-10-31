import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { basketTotals } from "./external-stores";
import { tableData } from "./picker-data-stores";

function Checkout(state = {}, action = {}) {
    return {
        basketTotals : basketTotals(state.basketTotals, action),
        tableData : tableData(state.tableData, action)
    }
}

let store = applyMiddleware(thunk)(createStore);
let DatePickerStore = store(Checkout);
export default DatePickerStore;