import React from "react";
import CSSModule from "react-css-modules";
import TableHead from "../Table/TableHead";
import TableBody from "../Table/TableBody";
import styles from "./table-styles";
import DatePickerStore from "../../stores/PickerStore";

class Table extends React.Component {
    constructor() {
        super();
        this.state = {
            tableHeadData : DatePickerStore.getState().tableHeadData,
            tableBodyData : DatePickerStore.getState().tableBodyData,
            tableDisplayIndex : DatePickerStore.getState().tableDisplayIndex,
            timeDescriptions : DatePickerStore.getState().timeDescriptions,
            selectedTimeslotData : DatePickerStore.getState().selectedTimeslotData,
            displayAllRows : DatePickerStore.getState().displayAllRows,
            unsubscribe : DatePickerStore.subscribe(this.onStoreUpdate.bind(this))
        };
    }

    componentWillUnmount() {
        if(typeof this.state.unsubscribe === "function") {
            this.state.unsubscribe();
        }
    }

    onStoreUpdate() {
        this.setState({
            tableHeadData : DatePickerStore.getState().tableHeadData,
            tableBodyData : DatePickerStore.getState().tableBodyData,
            tableDisplayIndex : DatePickerStore.getState().tableDisplayIndex,
            timeDescriptions : DatePickerStore.getState().timeDescriptions,
            displayAllRows : DatePickerStore.getState().displayAllRows,
            selectedTimeslotData : DatePickerStore.getState().selectedTimeslotData
        });
    }

    render() {
        return (
            <table styleName="date-picker-table">
                <TableHead
                    tableHeadData={ this.state.tableHeadData }
                    tableDisplayIndex={ this.state.tableDisplayIndex }
                />
                <TableBody
                    tableBodyData={ this.state.tableBodyData }
                    tableDisplayIndex={ this.state.tableDisplayIndex }
                    timeDescriptions={ this.state.timeDescriptions }
                    selectedTimeslotData={ this.state.selectedTimeslotData }
                    displayAllRows={ this.state.displayAllRows }
                />
             </table>
        );
    }

}

export default CSSModule(Table, styles);