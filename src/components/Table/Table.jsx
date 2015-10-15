import React from "react";
import CSSModule from "react-css-modules";
import TableHead from "../Table/TableHead";
import styles from "./table-styles";
import DatePickerStore from "../../stores/PickerStore";

class Table extends React.Component {
    constructor() {
        super();
        this.state = {
            tableHeadData : DatePickerStore.getState().tableHeadData,
            tableIndex : DatePickerStore.getState().tableDisplayIndex
        };
    }

    render() {
        return (
            <table styleName="date-picker-table">
                <TableHead
                    tableHeadData={ this.state.tableHeadData }
                    tableIndex={ this.state.tableIndex }
                />
                <tbody>
                </tbody>
             </table>
        );
    }

}

export default CSSModule(Table, styles);