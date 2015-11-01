import React from "react";
import TableHead from "../Table/TableHead";
import TableBody from "../Table/TableBody";
import CheckoutStore from "../../stores/CheckoutStore";

export default class Table extends React.Component {
    constructor() {
        super();
        this.state = {
            tableHeadData : CheckoutStore.getState().tableData.tableHeadData,
            tableBodyData : CheckoutStore.getState().tableData.tableBodyData,
            tableDisplayIndex : CheckoutStore.getState().tableData.tableDisplayIndex,
            timeDescriptions : CheckoutStore.getState().tableData.timeDescriptions,
            selectedTimeslotData : CheckoutStore.getState().tableData.selectedTimeslotData,
            displayAllRows : CheckoutStore.getState().tableData.displayAllRows,
            unsubscribe : CheckoutStore.subscribe(this.onStoreUpdate.bind(this))
        };
    }

    componentWillUnmount() {
        if(typeof this.state.unsubscribe === "function") {
            this.state.unsubscribe();
        }
    }

    onStoreUpdate() {
        this.setState({
            tableHeadData : CheckoutStore.getState().tableData.tableHeadData,
            tableBodyData : CheckoutStore.getState().tableData.tableBodyData,
            tableDisplayIndex : CheckoutStore.getState().tableData.tableDisplayIndex,
            timeDescriptions : CheckoutStore.getState().tableData.timeDescriptions,
            selectedTimeslotData : CheckoutStore.getState().tableData.selectedTimeslotData,
            displayAllRows : CheckoutStore.getState().tableData.displayAllRows,
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