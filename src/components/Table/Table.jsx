import React from "react";
import CSSModule from "react-css-modules";
import TableHead from "../Table/TableHead";
import styles from "./table-styles";

class Table extends React.Component {
    constructor(props) {
        super(props);
        console.log("table props", this.props)
    }

    render() {
        return (
            <table styleName="date-picker-table">
                <TableHead tableHeadData={this.props.tableHeadData}/>
                <tbody>
                </tbody>
             </table>
        );
    }

}

export default CSSModule(Table, styles);