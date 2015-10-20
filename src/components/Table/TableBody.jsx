import React from "react";
import CSSModule from "react-css-modules";
import styles from "./table-body-styles";
import Desc from "./DeliveryDescriptions/Desc";
import Anytime from "./DeliveryDescriptions/Anytime";
import DatePickerStore from "../../stores/PickerStore";
import "../../utils/classList-polyfill";

class TableBody extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableBodyData : this.props.tableBodyData,
            tableIndex : this.props.tableDisplayIndex
        };
    }

    toggleSelected(e) {
        let target = e.target || e.srcElement;
        target.classList.toggle("timeslot-selected");
    }

    createRows() {
        let isSameDayWeek = this.state.tableBodyData[this.state.tableIndex][0][0].WebDescription === "SameDay";
        let columns = [];
        for(let i = 0; i < this.state.tableBodyData[this.state.tableIndex].length; i++) {
            columns.push(this.createColumn(this.state.tableBodyData[this.state.tableIndex][i], isSameDayWeek))
        }
        console.log(columns, this.state.tableBodyData[this.state.tableIndex]);
    }

    createColumn(data, isSameDayWeek) {
        let count = isSameDayWeek ? 6 : 5, column = [];
        for(let i = 0; i < count; i++) {
            if(!data[i]){
                data[i] = {
                    WebDescription : null
                };
            }
            let slot = {
                desc : data[i].WebDescription
            };
            slot.hasTimeslot = !!data[i].WebDescription;
            if(slot.hasTimeslot) {
                slot.cost = data[i].ChargeIncVat;
            }
            column.push(slot);
        }
        return column;
    }

    render() {
        this.createRows();
        return(
            <tbody styleName="date-picker-tbody">
                <tr>
                    <td styleName="timeslot-desc">
                        <Desc desc="Same day time slot" time="4:30PM - 10PM"/>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={this.toggleSelected.bind(this)}>&pound;29.99</p>
                    </td>
                    <td styleName="timeslot">

                    </td>
                    <td styleName="timeslot">

                    </td>
                    <td styleName="timeslot">

                    </td>
                    <td styleName="timeslot">

                    </td>
                    <td styleName="timeslot">

                    </td>
                    <td styleName="timeslot">

                    </td>
                </tr>
                <tr>
                    <td styleName="timeslot-desc">
                        <Anytime />
                    </td>
                    <td styleName="timeslot">
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={this.toggleSelected.bind(this)}>&pound;9.99</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={this.toggleSelected.bind(this)}>&pound;4.99</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={this.toggleSelected.bind(this)}>&pound; Free</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={this.toggleSelected.bind(this)}>&pound; Free</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={this.toggleSelected.bind(this)}>&pound; Free</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={this.toggleSelected.bind(this)}>&pound;4.99</p>
                    </td>
                </tr>
                <tr>
                    <td styleName="timeslot-desc">
                        <Desc desc="Morning" time="07:00 - 12:00"/>
                    </td>
                    <td styleName="timeslot">
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={this.toggleSelected.bind(this)}>&pound;29.98</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={this.toggleSelected.bind(this)}>&pound;24.98</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={this.toggleSelected.bind(this)}>&pound;19.99</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={this.toggleSelected.bind(this)}>&pound;19.99</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={this.toggleSelected.bind(this)}>&pound;19.99</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={this.toggleSelected.bind(this)}>&pound;24.98</p>
                    </td>
                </tr>
                <tr>
                    <td styleName="timeslot-desc">
                        <Desc desc="Lunch" time="10:00 - 14:00"/>
                    </td>
                    <td styleName="timeslot">
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={this.toggleSelected.bind(this)}>&pound;29.98</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={this.toggleSelected.bind(this)}>&pound;24.98</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={this.toggleSelected.bind(this)}>&pound;19.99</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={this.toggleSelected.bind(this)}>&pound;19.99</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={this.toggleSelected.bind(this)}>&pound;19.99</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={this.toggleSelected.bind(this)}>&pound;24.98</p>
                    </td>
                </tr>
                <tr>
                    <td styleName="timeslot-desc">
                        <Desc desc="Afternoon" time="12:00 - 17:00"/>
                    </td>
                    <td styleName="timeslot">
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={this.toggleSelected.bind(this)}>&pound;29.98</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={this.toggleSelected.bind(this)}>&pound;24.98</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={this.toggleSelected.bind(this)}>&pound;19.99</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={this.toggleSelected.bind(this)}>&pound;19.99</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={this.toggleSelected.bind(this)}>&pound;19.99</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={this.toggleSelected.bind(this)}>&pound;24.98</p>
                    </td>
                </tr>
                <tr>
                    <td styleName="timeslot-desc">
                        <Desc desc="Evening" time="18:00 - 22:00"/>
                    </td>
                    <td styleName="timeslot">
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={this.toggleSelected.bind(this)}>&pound;29.98</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={this.toggleSelected.bind(this)}>&pound;24.98</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={this.toggleSelected.bind(this)}>&pound;19.99</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={this.toggleSelected.bind(this)}>&pound;19.99</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={this.toggleSelected.bind(this)}>&pound;19.99</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={this.toggleSelected.bind(this)}>&pound;24.98</p>
                    </td>
                </tr>
            </tbody>
        );
    }
}


TableBody.defaultProps = {
    tableDisplayIndex : 0,
    tableBodyData : []
};

TableBody.propTypes = {
    tableDisplayIndex : React.PropTypes.number.isRequired,
    tableBodyData : React.PropTypes.arrayOf(React.PropTypes.array).isRequired
};

export default CSSModule(TableBody, styles);