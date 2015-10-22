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

    createRows() {
        let rows = [];
        let data = this.state.tableBodyData[this.state.tableIndex];
        data[0].forEach((_, i) => {
            rows.push(<tr>{ this.createTds(i) }</tr>)
        });
        return rows;
    }

    createTds(i) {
        var tds = [];
        let data = this.state.tableBodyData[this.state.tableIndex];
        for(let j = 0; j < data.length; j++) {
            tds.push(<td styleName="timeslot"><p>&pound;{data[j][i].charge}</p></td>)
        }
        return tds;
    }

    render() {
        return(
            <tbody styleName="date-picker-tbody">
                { this.createRows() }
                <tr>
                    <td styleName="timeslot-desc">
                        <Desc desc="Same day time slot" time="4:30PM - 10PM"/>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" ref="testes" onClick={TableBody.toggleSelected.bind(this)}>&pound;29.99</p>
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
                        <p styleName="delivery-selectable" onClick={TableBody.toggleSelected.bind(this)}>&pound;9.99</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={TableBody.toggleSelected.bind(this)}>&pound;4.99</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={TableBody.toggleSelected.bind(this)}>&pound; Free</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={TableBody.toggleSelected.bind(this)}>&pound; Free</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={TableBody.toggleSelected.bind(this)}>&pound; Free</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={TableBody.toggleSelected.bind(this)}>&pound;4.99</p>
                    </td>
                </tr>
                <tr>
                    <td styleName="timeslot-desc">
                        <Desc desc="Morning" time="07:00 - 12:00"/>
                    </td>
                    <td styleName="timeslot">
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={TableBody.toggleSelected.bind(this)}>&pound;29.98</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={TableBody.toggleSelected.bind(this)}>&pound;24.98</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={TableBody.toggleSelected.bind(this)}>&pound;19.99</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={TableBody.toggleSelected.bind(this)}>&pound;19.99</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={TableBody.toggleSelected.bind(this)}>&pound;19.99</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={TableBody.toggleSelected.bind(this)}>&pound;24.98</p>
                    </td>
                </tr>
                <tr>
                    <td styleName="timeslot-desc">
                        <Desc desc="Lunch" time="10:00 - 14:00"/>
                    </td>
                    <td styleName="timeslot">
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={TableBody.toggleSelected.bind(this)}>&pound;29.98</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={TableBody.toggleSelected.bind(this)}>&pound;24.98</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={TableBody.toggleSelected.bind(this)}>&pound;19.99</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={TableBody.toggleSelected.bind(this)}>&pound;19.99</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={TableBody.toggleSelected.bind(this)}>&pound;19.99</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={TableBody.toggleSelected.bind(this)}>&pound;24.98</p>
                    </td>
                </tr>
                <tr>
                    <td styleName="timeslot-desc">
                        <Desc desc="Afternoon" time="12:00 - 17:00"/>
                    </td>
                    <td styleName="timeslot">
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={TableBody.toggleSelected.bind(this)}>&pound;29.98</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={TableBody.toggleSelected.bind(this)}>&pound;24.98</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={TableBody.toggleSelected.bind(this)}>&pound;19.99</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={TableBody.toggleSelected.bind(this)}>&pound;19.99</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={TableBody.toggleSelected.bind(this)}>&pound;19.99</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={TableBody.toggleSelected.bind(this)}>&pound;24.98</p>
                    </td>
                </tr>
                <tr>
                    <td styleName="timeslot-desc">
                        <Desc desc="Evening" time="18:00 - 22:00"/>
                    </td>
                    <td styleName="timeslot">
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={TableBody.toggleSelected.bind(this)}>&pound;29.98</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={TableBody.toggleSelected.bind(this)}>&pound;24.98</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={TableBody.toggleSelected.bind(this)}>&pound;19.99</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={TableBody.toggleSelected.bind(this)}>&pound;19.99</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={TableBody.toggleSelected.bind(this)}>&pound;19.99</p>
                    </td>
                    <td styleName="timeslot">
                        <p styleName="delivery-selectable" onClick={TableBody.toggleSelected.bind(this)}>&pound;24.98</p>
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

TableBody.toggleSelected = function(e) {
    let target = e.target || e.srcElement;
    target.classList.toggle("timeslot-selected");
};

export default CSSModule(TableBody, styles);