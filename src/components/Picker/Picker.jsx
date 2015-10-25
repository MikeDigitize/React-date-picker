import React from "react";
import CSSModule from "react-css-modules";
import styles from "./picker-styles";
import DatePickerStore from "../../stores/PickerStore";
import { updateTableIndex, selectedTimeslotData } from "../../actions/picker-actions";

import DateRange from "../DateRange/DateRange";
import Table from "../Table/TableContainer";
import Summary from "../Summary/Summary";

class Picker extends React.Component {

    constructor() {
        super();
        let tableDisplayIndex = DatePickerStore.getState().tableDisplayIndex;
        let ranges = DatePickerStore.getState().dateRanges;
        if(tableDisplayIndex >= ranges.length) {
            tableDisplayIndex = ranges.length -1;
        }
        DatePickerStore.dispatch(updateTableIndex(tableDisplayIndex));

        this.state = {
            dateRanges : ranges,
            tableDisplayIndex : tableDisplayIndex,
            deliveryTotal : DatePickerStore.getState().selectedTimeslotData.charge || 0,
            basketTotal : DatePickerStore.getState().basketTotal,
            unsubscribe : DatePickerStore.subscribe(this.onStoreUpdate.bind(this))
        };
    }

    componentWillMount() {
        if(!this.isTimeslotStillAvailable()) {
            DatePickerStore.dispatch(selectedTimeslotData({}));
        }
        if(typeof this.state.unsubscribe === "function") {
            this.state.unsubscribe();
        }
    }

    onStoreUpdate() {
        this.setState({
            dateRanges : DatePickerStore.getState().dateRanges,
            tableDisplayIndex : DatePickerStore.getState().tableDisplayIndex,
            deliveryTotal : DatePickerStore.getState().selectedTimeslotData.charge || 0,
            basketTotal : DatePickerStore.getState().basketTotal
        });
    }

    isTimeslotStillAvailable() {
        if(!Object.keys(DatePickerStore.getState().selectedTimeslotData).length){
            return false;
        }
        let matchingTimeslots = [];
        let current = {
            description : DatePickerStore.getState().selectedTimeslotData.description,
            hasTimeslot : DatePickerStore.getState().selectedTimeslotData.hasTimeslot,
            shortdate : DatePickerStore.getState().selectedTimeslotData.shortdate
        };
        DatePickerStore.getState().tableBodyData.forEach(data => {
            data.forEach(slots => {
                if(!matchingTimeslots.length) {
                    matchingTimeslots = slots.filter(slot => {
                        return slot.description === current.description && slot.hasTimeslot === current.hasTimeslot && slot.shortdate === current.shortdate;
                    });
                }
            });
        });
        return matchingTimeslots.length;
    }

    render() {
        return (
            <section styleName="date-picker">
                <DateRange
                    dateRanges={ this.state.dateRanges }
                    tableDisplayIndex={ this.state.tableDisplayIndex }
                />
                <Table />
                <Summary
                    basketTotal={ this.state.basketTotal }
                    deliveryTotal={ this.state.deliveryTotal }
                />
            </section>
        );
    }

}

export default CSSModule(Picker, styles);