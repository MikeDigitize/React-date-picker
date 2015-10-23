import React from "react";
import CSSModule from "react-css-modules";
import TableHead from "../Table/TableHead";
import TableBody from "../Table/TableBody";
import styles from "./table-styles";
import DatePickerStore from "../../stores/PickerStore";

class Table extends React.Component {
    constructor() {
        super();
        this.state = {
            tableHeadData : DatePickerStore.getState().tableHeadData,
            tableBodyData : DatePickerStore.getState().tableBodyData,
            tableIndex : DatePickerStore.getState().tableDisplayIndex,
            timeDescriptions : DatePickerStore.getState().timeDescriptions
        };
    }

    render() {
        return (
            <table styleName="date-picker-table">
                <TableHead
                    tableHeadData={ this.state.tableHeadData }
                    tableIndex={ this.state.tableIndex }
                />
                <TableBody
                    tableBodyData={ this.state.tableBodyData }
                    tableIndex={ this.state.tableIndex }
                    timeDescriptions={ this.state.timeDescriptions }
                />
             </table>
        );
    }

}

export default CSSModule(Table, styles);