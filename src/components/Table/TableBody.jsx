import React from "react";
import CSSModule from "react-css-modules";
import styles from "./table-body-styles";
import Desc from "./DeliveryDescriptions/Desc";
import Anytime from "./DeliveryDescriptions/Anytime";
import DatePickerStore from "../../stores/PickerStore";
import { rowsToDisplay } from "../../actions/picker-actions";
import { addToBasketTotal, subtractFromBasketTotal, selectedTimeslotData } from "../../actions/external-actions";
import "../../utils/classList-polyfill";

class TableBody extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableBodyData : this.props.tableBodyData,
            tableDisplayIndex : this.props.tableDisplayIndex,
            timeDescriptions : this.props.timeDescriptions,
            selectedTimeslotData : this.props.selectedTimeslotData,
            alwaysDisplay : TableBody.rowsToDisplay()
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log("next props!");
        this.setState({
            tableBodyData : nextProps.tableBodyData,
            tableDisplayIndex : nextProps.tableDisplayIndex,
            timeDescriptions : nextProps.timeDescriptions,
            selectedTimeslotData : nextProps.selectedTimeslotData
        });
    }

    componentWillMount() {
        console.log("will update")
        //DatePickerStore.dispatch(rowsToDisplay(this.state.alwaysDisplay.these));
    }

    static rowsToDisplay() {
        let these = ["SameDay", "Anytime"];
        return {
            these,
            add(row) {
                if(these.indexOf(row) === -1) {
                    these.push(row);
                }
            },
            remove(){
                these = ["SameDay", "Anytime"];
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
        this.findTimeslot(target);
    };

    createRows() {
        let rows = [];
        let data = this.state.tableBodyData[this.state.tableDisplayIndex];
        data[0].forEach((details, i) => {
            let tds = this.createTds(i);
            tds.unshift(this.createRowDescription(details.description, i));
            let className = this.state.alwaysDisplay.these.indexOf(details.description) === -1 ? "row-hide" : "";
            rows.push(<tr key={i} className={className}>{ tds }</tr>)
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
                this.state.alwaysDisplay.add(this.state.tableBodyData[this.state.tableDisplayIndex][0][i].description);
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

    findTimeslot(target) {
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
            this.state.alwaysDisplay.remove();
        }
        else {
            DatePickerStore.dispatch(addToBasketTotal(selected.charge));
        }
        DatePickerStore.dispatch(selectedTimeslotData(selected));
    };

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