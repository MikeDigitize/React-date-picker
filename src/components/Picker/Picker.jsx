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
            discountTotal : DatePickerStore.getState().selectedTimeslotData.charge || 0,
            basketTotal : DatePickerStore.getState().basketTotal
        };
    }

    componentWillMount() {
        if(this.isTimeslotStillAvailable()) {
            console.log("still available!");
        }
        else {
            console.log("remove timeslot data!", this.isTimeslotStillAvailable());
            DatePickerStore.dispatch(selectedTimeslotData({}));
        }
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
        if(matchingTimeslots.length) {
            return true;
        }
        else {
            return false;
        }
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
                    discountTotal={ this.state.discountTotal }
                />
            </section>
        );
    }

}

export default CSSModule(Picker, styles);