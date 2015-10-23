import React from "react";
import CSSModule from "react-css-modules";
import styles from "./picker-styles";
import DatePickerStore from "../../stores/PickerStore";
import { updateTableIndex } from "../../actions/picker-actions";

import DateRange from "../DateRange/DateRange";
import Table from "../Table/TableContainer";
import Summary from "../Summary/Summary";

class Picker extends React.Component {

    constructor() {
        super();
        let tableDisplayIndex = DatePickerStore.getState().tableDisplayIndex;
        let ranges = DatePickerStore.getState().dateRanges;
        if(tableDisplayIndex >= ranges.length) {
            tableDisplayIndex = ranges.length -1;
        }
        DatePickerStore.dispatch(updateTableIndex(tableDisplayIndex));
        this.state = {
            dateRanges : ranges,
            tableDisplayIndex : tableDisplayIndex,
            discountTotal : DatePickerStore.getState().chosenTimeslot.charge || 0,
            basketTotal : DatePickerStore.getState().basketTotal
        };
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
                    discountTotal={ this.state.discountTotal }
                />
            </section>
        );
    }

}

export default CSSModule(Picker, styles);