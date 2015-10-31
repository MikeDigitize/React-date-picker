import React from "react";
import CSSModule from "react-css-modules";
import styles from "./picker-styles";
import DatePickerStore from "../../stores/PickerStore";
import { checkTimeslotExists, checkTableIndexExists } from "../../actions/picker-actions";

import DateRange from "../DateRange/DateRange";
import Table from "../Table/TableContainer";
import Summary from "../Summary/Summary";

class Picker extends React.Component {

    constructor() {
        super();
        DatePickerStore.dispatch(checkTableIndexExists(DatePickerStore.getState().tableData));
        this.state = {
            dateRanges : DatePickerStore.getState().tableData.dateRanges,
            tableDisplayIndex : DatePickerStore.getState().tableData.tableDisplayIndex,
            deliveryTotal : DatePickerStore.getState().tableData.selectedTimeslotData.charge || 0,
            basketTotal : DatePickerStore.getState().basketTotals.overallTotal,
            unsubscribe : DatePickerStore.subscribe(this.onStoreUpdate.bind(this))
        };
    }

    static componentWillMount() {
        DatePickerStore.dispatch(checkTimeslotExists(DatePickerStore.getState().tableData));
    }

    componentWillUnmount() {
        if(typeof this.state.unsubscribe === "function") {
            this.state.unsubscribe();
        }
    }

    onStoreUpdate() {
        this.setState({
            dateRanges : DatePickerStore.getState().tableData.dateRanges,
            tableDisplayIndex : DatePickerStore.getState().tableData.tableDisplayIndex,
            deliveryTotal : DatePickerStore.getState().tableData.selectedTimeslotData.charge || 0,
            basketTotal : DatePickerStore.getState().basketTotals.overallTotal
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