import React from "react";
import CSSModule from "react-css-modules";
import styles from "./table-styles";
import DatePickerStore from "../../stores/PickerStore";

class TableHead extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableDisplayIndex : this.props.tableIndex,
            tableHeadData : this.props.tableHeadData
        };
    }

    createTableHeadRow() {
        return this.state.tableHeadData[this.state.tableDisplayIndex].map((txt, i) => {
            return (<th key={i}>{this.createTableHeadText(txt)}</th>);
        });
    }

    createTableHeadText(th) {
        return Object.keys(th).map((text, i) =>{
            return (<p key={i}>{ th[text] }</p>);
        });
    }

    render() {
        return (
            <thead>
                <tr>
                    <th></th>
                    { this.createTableHeadRow() }
                </tr>
            </thead>
        );
    }

}

export default CSSModule(TableHead, styles);