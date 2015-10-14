import React from "react";
import CSSModule from "react-css-modules";
import styles from "./table-styles";
import DatePickerStore from "../../stores/PickerStore";

class TableHead extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableDisplayIndex : DatePickerStore.getState().tableDisplayIndex,
            tableHeadData : this.props.tableHeadData
        }
    }

    createTableHeadRow() {
        console.log("state!", this.state.tableHeadData);
    }

    render() {
        this.createTableHeadRow();
        return (
            <thead>
                <tr>
                    <th></th>
                    <th>
                        <p styleName="table-head-extra-info">Same Day</p>
                        <p styleName="table-head-day">SUN</p>
                        <p styleName="table-head-date">11</p>
                    </th>
                    <th>
                        <p styleName="table-head-extra-info">Next Day</p>
                        <p styleName="table-head-day">MON</p>
                        <p styleName="table-head-date">12</p>
                    </th>
                    <th>
                        <p styleName="table-head-extra-info"></p>
                        <p styleName="table-head-day">TUE</p>
                        <p styleName="table-head-date">13</p>
                    </th>
                    <th>
                        <p styleName="table-head-extra-info"></p>
                        <p styleName="table-head-day">WED</p>
                        <p styleName="table-head-date">14</p>
                    </th>
                    <th>
                        <p styleName="table-head-extra-info"></p>
                        <p styleName="table-head-day">THU</p>
                        <p styleName="table-head-date">15</p>
                    </th>
                    <th>
                        <p styleName="table-head-extra-info"></p>
                        <p styleName="table-head-day">FRI</p>
                        <p styleName="table-head-date">16</p>
                    </th>
                    <th>
                        <p styleName="table-head-extra-info"></p>
                        <p styleName="table-head-day">SAT</p>
                        <p styleName="table-head-date">17</p>
                    </th>
                </tr>
            </thead>
        );
    }

}

export default CSSModule(TableHead, styles);