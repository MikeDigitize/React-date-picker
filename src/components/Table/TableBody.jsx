import React from "react";
import CSSModule from "react-css-modules";
import styles from "./table-body-styles";
import Desc from "./DeliveryDescriptions/Desc";
import Anytime from "./DeliveryDescriptions/Anytime";
import DatePickerStore from "../../stores/PickerStore";
import { addToBasketTotal, subtractFromBasketTotal } from "../../actions/external-actions";
import { selectedTimeslotData } from "../../actions/picker-actions";
import "../../utils/classList-polyfill";

class TableBody extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableBodyData : this.props.tableBodyData,
            tableDisplayIndex : this.props.tableDisplayIndex,
            timeDescriptions : this.props.timeDescriptions,
            selectedTimeslotData : this.props.selectedTimeslotData,
            displayAllRows : this.props.displayAllRows
        };
        this.alwaysDisplay = TableBody.rowsToDisplay()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            tableBodyData : nextProps.tableBodyData,
            tableDisplayIndex : nextProps.tableDisplayIndex,
            timeDescriptions : nextProps.timeDescriptions,
            selectedTimeslotData : nextProps.selectedTimeslotData,
            displayAllRows : nextProps.displayAllRows
        });
    }

    static rowsToDisplay() {
        let these = ["SameDay", "Anytime"];
        return {
            these,
            add(row) {
                if(this.these.indexOf(row) === -1) {
                    this.these.push(row);
                }
            },
            reset(){
                this.these = ["SameDay", "Anytime"];
            }
        }
    }

    static toggleSelected(e) {
        let target = e.target || e.srcElement;
        if(target.tagName === "SPAN") {
            target = target.parentNode;
        }
        let currentTarget = document.querySelector(".timeslot-selected");
        if(currentTarget && currentTarget !== target) {
            currentTarget.classList.toggle("timeslot-selected");
            target.classList.toggle("timeslot-selected");
        }
        else {
            target.classList.toggle("timeslot-selected");
        }
        this.updateStoreWithSelectedTimeslot(target);
    };

    updateStoreWithSelectedTimeslot(target) {
        let ref = target.getAttribute("data-ref");
        let selected = [];
        this.state.tableBodyData[this.state.tableDisplayIndex].forEach(data => {
            if(!selected.length) {
                selected = data.filter(days => {
                    return days.ref === ref;
                });
            }
        });
        selected = selected.shift();
        DatePickerStore.dispatch(subtractFromBasketTotal(this.state.selectedTimeslotData.charge || 0));
        if(!target.classList.contains("timeslot-selected")){
            selected = {};
        }
        else {
            DatePickerStore.dispatch(addToBasketTotal(selected.charge));
        }
        DatePickerStore.dispatch(selectedTimeslotData(selected));
    };

    createRows() {
        this.alwaysDisplay.reset();
        let data = this.state.tableBodyData[this.state.tableDisplayIndex];
        if(this.state.displayAllRows) {
            data[0].forEach(details => {
                this.alwaysDisplay.add(details.description);
            });
        }
        let rows = [];
        data[0].forEach((details, i) => {
            let tds = this.createTds(i);
            tds.unshift(this.createRowDescription(details.description, i));
            let shouldRowBeHidden= this.alwaysDisplay.these.indexOf(details.description) === -1;
            let className = shouldRowBeHidden && !this.state.displayAllRows ? "row-hide" : "";
            rows.push(<tr
                key={i}
                data-should-be-hidden={shouldRowBeHidden}
                className={className}>{ tds }</tr>)
        });
        return rows;
    }

    createTds(i) {
        let data = this.state.tableBodyData[this.state.tableDisplayIndex];
        let selectedRef = this.state.selectedTimeslotData.ref;
        let shortdate = this.state.selectedTimeslotData.shortdate;
        return data.map((details, j) => {
            let ref = i + "" + j;
            let className = selectedRef === ref && details[j] && details[j].shortdate === shortdate ? "timeslot-selected" : "";
            if(className && details[j].shortdate === shortdate) {
                this.alwaysDisplay.add(this.state.tableBodyData[this.state.tableDisplayIndex][0][i].description);
            }
            let tdContent;
            if(details[i].charge === 0) {
                details[i].ref = ref;
                tdContent = <p
                    styleName="delivery-selectable"
                    className={className}
                    data-ref={ref}
                    onClick={TableBody.toggleSelected.bind(this)}>
                        Free
                </p>;
            }
            else if(!details[i].charge) {
                tdContent = <p styleName="delivery-non-selectable">N/A</p>;
            }
            else {
                details[i].ref = ref;
                tdContent = <p
                    styleName="delivery-selectable"
                    className={className}
                    data-ref={ref}
                    onClick={TableBody.toggleSelected.bind(this)}>
                        &pound;{ details[i].charge }
                </p>;
            }
            return (<td key={j} styleName="timeslot">{ tdContent }</td>)
        });
    }

    createRowDescription(desc, i){
        let random = Math.floor(Math.random() * 1000) + Math.floor(Math.random() * 5000) + (i+1);
        if(desc === "Anytime"){
            return <td key={random} styleName="timeslot-desc"><Anytime /></td>;
        }
        else {
            let info = this.state.timeDescriptions[desc].desc;
            let time = this.state.timeDescriptions[desc].times;
            return <td key={random} styleName="timeslot-desc"><Desc desc={ info } time={ time }/></td>
        }
    }

    render() {
        return(
            <tbody styleName="date-picker-tbody">
                { this.createRows() }
            </tbody>
        );
    }
}

TableBody.defaultProps = {
    tableDisplayIndex : 0,
    timeDescriptions : {},
    tableBodyData : [],
    selectedTimeslotData : {}
};

TableBody.propTypes = {
    tableDisplayIndex : React.PropTypes.number.isRequired,
    tableBodyData : React.PropTypes.arrayOf(React.PropTypes.array).isRequired,
    timeDescriptions : React.PropTypes.object.isRequired,
    selectedTimeslotData :  React.PropTypes.object.isRequired
};

export default CSSModule(TableBody, styles);