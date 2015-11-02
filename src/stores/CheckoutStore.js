import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { basketTotals } from "./basket-totals-stores";
import { tableData } from "./table-data-stores";

function Checkout(state = {}, action = {}) {
    return {
        basketTotals : basketTotals(state.basketTotals, action),
        tableData : tableData(state.tableData, action)
    }
}

let store = applyMiddleware(thunk)(createStore);
let CheckoutStore = store(Checkout);
export default CheckoutStore;