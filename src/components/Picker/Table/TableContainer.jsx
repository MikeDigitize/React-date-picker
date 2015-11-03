import React from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import CheckoutStore from "../../../stores/CheckoutStore";
import { deliveryCharge } from "../../../actions/basket-totals-actions";
import { selectedTimeslotData } from "../../../actions/table-data-actions";

export default class TableContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            tableHeadData : CheckoutStore.getState().tableData.tableHeadData,
            tableBodyData : CheckoutStore.getState().tableData.tableBodyData,
            tableDisplayIndex : CheckoutStore.getState().tableData.tableDisplayIndex,
            timeDescriptions : CheckoutStore.getState().tableData.timeDescriptions,
            selectedTimeslotData : CheckoutStore.getState().tableData.selectedTimeslotData,
            displayAllRows : CheckoutStore.getState().tableData.displayAllRows,
            toggleSelected : TableContainer.toggleSelected,
            unsubscribe : CheckoutStore.subscribe(this.onStoreUpdate.bind(this))
        };
    }

    componentWillUnmount() {
        if(typeof this.state.unsubscribe === "function") {
            this.state.unsubscribe();
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
        }
        target.classList.toggle("timeslot-selected");
        let isActive = !!document.querySelector(".timeslot-selected");
        CheckoutStore.dispatch(selectedTimeslotData({ target }));
        CheckoutStore.dispatch(deliveryCharge({ isActive, charge : CheckoutStore.getState().tableData.selectedTimeslotData.charge }))
    };

    onStoreUpdate() {
        this.setState({
            tableHeadData : CheckoutStore.getState().tableData.tableHeadData,
            tableBodyData : CheckoutStore.getState().tableData.tableBodyData,
            tableDisplayIndex : CheckoutStore.getState().tableData.tableDisplayIndex,
            timeDescriptions : CheckoutStore.getState().tableData.timeDescriptions,
            selectedTimeslotData : CheckoutStore.getState().tableData.selectedTimeslotData,
            displayAllRows : CheckoutStore.getState().tableData.displayAllRows
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
                    toggleSelected={ this.state.toggleSelected }
                />
             </table>
        );
    }

}