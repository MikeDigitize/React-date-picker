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
            tableIndex : this.props.tableDisplayIndex,
            timeDescriptions : this.props.timeDescriptions,
            unsubscribe : DatePickerStore.subscribe(this.onTableDisplayIndexUpdate.bind(this))
        };
    }

    componentWillUnmount() {
        this.state.unsubscribe();
    }

    onTableDisplayIndexUpdate() {
        console.log("update table index", DatePickerStore.getState().tableDisplayIndex)
        this.setState({
            tableIndex : DatePickerStore.getState().tableDisplayIndex
        });
    }

    createRows() {
        let rows = [];
        let data = this.state.tableBodyData[this.state.tableIndex];
        data[0].forEach((_, i) => {
            let tds = this.createTds(i);
            tds.unshift(this.createRowDescription(_.description, i));
            rows.push(<tr key={i}>{ tds }</tr>)
        });
        return rows;
    }

    createRowDescription(desc, i){
        let random = Math.floor(Math.random() * 1000) + Math.floor(Math.random() * i+1);
        if(desc === "Anytime"){
            return <td key={random} styleName="timeslot-desc"><Anytime /></td>;
        }
        else {
            let info = this.state.timeDescriptions[desc].desc;
            let time = this.state.timeDescriptions[desc].times;
            return <td key={random} styleName="timeslot-desc"><Desc desc={ info } time={ time }/></td>
        }
    }

    createTds(i) {
        let data = this.state.tableBodyData[this.state.tableIndex];
        return data.map((details, j) => {
            let tdContent;
            if(details[i].charge === 0){
                tdContent = <p styleName="delivery-selectable" onClick={TableBody.toggleSelected.bind(this)}>Free</p>;
            }
            else if(!details[i].charge){
                tdContent = <p styleName="delivery-non-selectable">N/A</p>;
            }
            else {
                tdContent = <p styleName="delivery-selectable" onClick={TableBody.toggleSelected.bind(this)}>&pound;{ details[i].charge }</p>;
            }
            return (<td key={j} styleName="timeslot">{ tdContent }</td>)
        });
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
    tableBodyData : []
};

TableBody.propTypes = {
    tableDisplayIndex : React.PropTypes.number.isRequired,
    tableBodyData : React.PropTypes.arrayOf(React.PropTypes.array).isRequired,
    timeDescriptions : React.PropTypes.object
};

TableBody.toggleSelected = function(e) {
    let target = e.target || e.srcElement;
    target.classList.toggle("timeslot-selected");
};

export default CSSModule(TableBody, styles);