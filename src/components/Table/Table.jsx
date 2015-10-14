import React from "react";
import CSSModule from "react-css-modules";
import TableHead from "../Table/TableHead";
import styles from "./table-styles";
import DatePickerStore from "../../stores/PickerStore";

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHeadData : this.props.tableHeadData,
            tableIndex : this.props.tableIndex
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