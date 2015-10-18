import React from "react";
import CSSModule from "react-css-modules";
import styles from "./table-body-styles";
import DatePickerStore from "../../stores/PickerStore";
import "../../utils/classList-polyfill";

class TableBody extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableHeadData : this.props.tableBodyData,
            tableIndex : this.props.tableDisplayIndex
        };
    }

    toggleSelected(e) {
        let target = e.target || e.srcElement;
        target.classList.toggle("timeslot-selected");
    }

    render() {
        return(
            <tbody styleName="date-picker-tbody">
                <tr>
                    <td styleName="timeslot-desc">
                        <p styleName="time-desc">Same day time slot</p>
                        <p styleName="time">4:30PM - 10PM</p>
                        <p styleName="extra-info"></p>

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
                        <p styleName="time-desc">Standard Delivery</p>
                        <p styleName="extra-info"><span className="icon-tick2"></span> We'll text a 4-hour time slot on the day</p>
                        <p styleName="extra-info"><span className="icon-tick2"></span> Online order tracking - no need to wait in</p>
                        <p styleName="extra-info"><span className="icon-tick2"></span> Delivery from 7AM - 7PM</p>
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
                        <p styleName="time-desc">Morning</p>
                        <p styleName="time">07:00 - 12:00</p>
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
                        <p styleName="time-desc">Lunch</p>
                        <p styleName="time">10:00 - 14:00</p>
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
                        <p styleName="time-desc">Afternoon</p>
                        <p styleName="time">12:00 - 17:00</p>
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
                        <p styleName="time-desc">Evening</p>
                        <p styleName="time">18:00 - 22:00</p>
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


TableHead.defaultProps = {
    tableDisplayIndex : 0,
    tableBodyData : []
};

TableHead.propTypes = {
    tableDisplayIndex : React.PropTypes.number,
    tableBodyData : React.PropTypes.array
};

export default CSSModule(TableBody, styles);