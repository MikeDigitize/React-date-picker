import React from "react";
import CSSModule from "react-css-modules";
import styles from "./picker-styles";
import DatePickerStore from "../../stores/PickerStore";
import { updateTableIndex } from "../../actions/picker-data-actions";

import DateRange from "../DateRange/DateRange";
import Table from "../Table/Table";

class Picker extends React.Component {

    constructor() {
        super();
        let tableIndex = DatePickerStore.getState().tableDisplayIndex;
        let ranges = DatePickerStore.getState().dateRanges;
        if(tableIndex >= ranges.length) {
            tableIndex = ranges.length -1;
        }
        DatePickerStore.dispatch(updateTableIndex(tableIndex));
        this.state = {
            dateRanges : ranges,
            tableHeadData : DatePickerStore.getState().tableHeadData,
            tableIndex : tableIndex
        };
    }

    render() {
        return (
            <section styleName="date-picker">
                <DateRange
                    dateRanges={ this.state.dateRanges }
                    tableIndex={ this.state.tableIndex }
                />
                <Table />
            </section>
        );
    }

}

export default CSSModule(Picker, styles);