import React from "react";
import CSSModule from "react-css-modules";
import styles from "./table-body-styles";
import Desc from "./DeliveryDescriptions/Desc";
import Anytime from "./DeliveryDescriptions/Anytime";
import "../../../utils/classList-polyfill";

class TableBody extends React.Component {

    constructor(props) {
        super(props);
        this.alwaysDisplay = TableBody.rowsToDisplay();
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
            reset() {
                this.these = ["SameDay", "Anytime"];
            }
        }
    }

    createRows() {
        this.alwaysDisplay.reset();
        let data = this.props.tableBodyData[this.props.tableDisplayIndex];
        if(this.props.displayAllRows) {
            data[0].forEach(details => {
                this.alwaysDisplay.add(details.description);
            });
        }
        let rows = [];
        data[0].forEach((details, i) => {
            let tds = this.createTds(i);
            tds.unshift(this.createRowDescription(details.description, i));
            let shouldRowBeHidden= this.alwaysDisplay.these.indexOf(details.description) === -1;
            let className = shouldRowBeHidden && !this.props.displayAllRows ? "row-hide" : "";
            rows.push(<tr
                key={i}
                data-should-be-hidden={shouldRowBeHidden}
                className={className}>{ tds }</tr>)
        });
        return rows;
    }

    createTds(i) {
        let data = this.props.tableBodyData[this.props.tableDisplayIndex];
        let selectedRef = this.props.selectedTimeslotData.ref;
        let shortdate = this.props.selectedTimeslotData.shortdate;
        return data.map((details, j) => {
            let ref = i + "" + j;
            let className = selectedRef === ref && details[j] && details[j].shortdate === shortdate ? "timeslot-selected" : "";
            if(className && details[j].shortdate === shortdate) {
                this.alwaysDisplay.add(this.props.tableBodyData[this.props.tableDisplayIndex][0][i].description);
            }
            let tdContent;
            if(details[i].charge === 0) {
                details[i].ref = ref;
                tdContent = <p
                    styleName="delivery-selectable"
                    className={ className }
                    data-ref={ ref }
                    onClick={ this.props.toggleSelected }>
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
                    className={ className }
                    data-ref={ ref }
                    onClick={ this.props.toggleSelected }>
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
            let info = this.props.timeDescriptions[desc].desc;
            let time = this.props.timeDescriptions[desc].times;
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
    selectedTimeslotData : {},
    toggleSelected : function(){}
};

TableBody.propTypes = {
    tableDisplayIndex : React.PropTypes.number.isRequired,
    tableBodyData : React.PropTypes.arrayOf(React.PropTypes.array).isRequired,
    timeDescriptions : React.PropTypes.object.isRequired,
    selectedTimeslotData :  React.PropTypes.object.isRequired,
    toggleSelected : React.PropTypes.func.isRequired
};

export default CSSModule(TableBody, styles);