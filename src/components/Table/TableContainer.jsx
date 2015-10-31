import React from "react";
import TableHead from "../Table/TableHead";
import TableBody from "../Table/TableBody";
import DatePickerStore from "../../stores/PickerStore";

export default class Table extends React.Component {
    constructor() {
        super();
        this.state = {
            tableHeadData : DatePickerStore.getState().tableData.tableHeadData,
            tableBodyData : DatePickerStore.getState().tableData.tableBodyData,
            tableDisplayIndex : DatePickerStore.getState().tableData.tableDisplayIndex,
            timeDescriptions : DatePickerStore.getState().tableData.timeDescriptions,
            selectedTimeslotData : DatePickerStore.getState().tableData.selectedTimeslotData,
            displayAllRows : DatePickerStore.getState().tableData.displayAllRows,
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
            tableHeadData : DatePickerStore.getState().tableData.tableHeadData,
            tableBodyData : DatePickerStore.getState().tableData.tableBodyData,
            tableDisplayIndex : DatePickerStore.getState().tableData.tableDisplayIndex,
            timeDescriptions : DatePickerStore.getState().tableData.timeDescriptions,
            selectedTimeslotData : DatePickerStore.getState().tableData.selectedTimeslotData,
            displayAllRows : DatePickerStore.getState().tableData.displayAllRows,
        });
    }

    render() {
        return (
            <table className="date-picker-table">
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