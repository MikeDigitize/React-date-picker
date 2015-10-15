import React from "react";
import CSSModule from "react-css-modules";
import TableHead from "../Table/TableHead";
import styles from "./table-styles";
import DatePickerStore from "../../stores/PickerStore";

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHeadData : DatePickerStore.getState().tableHeadData,
            tableIndex : DatePickerStore.getState().tableDisplayIndex
        };
        console.log(props);
    }

    render() {
        let body = React.createElement(this.props.body);
        return (
            <table styleName="date-picker-table">
                <TableHead
                    tableHeadData={ this.state.tableHeadData }
                    tableIndex={ this.state.tableIndex }
                />
                { body }
             </table>
        );
    }

}

export default CSSModule(Table, styles);