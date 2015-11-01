import React from "react";
import CSSModule from "react-css-modules";
import styles from "./picker-styles";
import CheckoutStore from "../../stores/CheckoutStore";
import { checkTimeslotExists, checkTableIndexExists } from "../../actions/table-data-actions";

import DateRange from "../DateRange/DateRange";
import Table from "../Table/TableContainer";
import Summary from "../Summary/Summary";

class Picker extends React.Component {

    constructor() {
        super();
        CheckoutStore.dispatch(checkTableIndexExists(CheckoutStore.getState().tableData));
        this.state = {
            dateRanges : CheckoutStore.getState().tableData.dateRanges,
            tableDisplayIndex : CheckoutStore.getState().tableData.tableDisplayIndex,
            deliveryTotal : CheckoutStore.getState().tableData.selectedTimeslotData.charge || 0,
            basketTotal : CheckoutStore.getState().basketTotals.overallTotal,
            unsubscribe : CheckoutStore.subscribe(this.onStoreUpdate.bind(this))
        };
    }

    static componentWillMount() {
        CheckoutStore.dispatch(checkTimeslotExists(CheckoutStore.getState().tableData));
    }

    componentWillUnmount() {
        if(typeof this.state.unsubscribe === "function") {
            this.state.unsubscribe();
        }
    }

    onStoreUpdate() {
        this.setState({
            dateRanges : CheckoutStore.getState().tableData.dateRanges,
            tableDisplayIndex : CheckoutStore.getState().tableData.tableDisplayIndex,
            deliveryTotal : CheckoutStore.getState().tableData.selectedTimeslotData.charge || 0,
            basketTotal : CheckoutStore.getState().basketTotals.overallTotal
        });
    }

    render() {
        return (
            <section styleName="date-picker">
                <DateRange
                    dateRanges={ this.state.dateRanges }
                    tableDisplayIndex={ this.state.tableDisplayIndex }
                />
                <Table />
                <Summary
                    basketTotal={ this.state.basketTotal }
                    deliveryTotal={ this.state.deliveryTotal }
                />
            </section>
        );
    }

}

export default CSSModule(Picker, styles);