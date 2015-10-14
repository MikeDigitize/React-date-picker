import React from "react";
import CSSModule from "react-css-modules";
import styles from "./picker-styles";
import DatePickerStore from "../../stores/PickerStore";

import DateRange from "../DateRange/DateRange";
import Table from "../Table/Table";

class Picker extends React.Component {

    constructor() {
        super();
        this.state = {
            dateRanges : DatePickerStore.getState().dateRanges,
            tableHeadData : DatePickerStore.getState().tableHeadData,
            tableIndex : DatePickerStore.getState().tableDisplayIndex
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