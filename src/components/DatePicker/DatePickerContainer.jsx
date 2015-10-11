import React from "react";
import DatePicker from "./DatePicker";
import DatePickerStore from "../../stores/DatePickerStore";
import { newDatePickerData, chargeConfig, basketTotals } from "../../actions/datepicker-data-actions";
import { availableDays } from "../../data/available-dates";
import { objectToArray } from "../../utils/object-to-array";

export default class DatePickerContainer extends React.Component {

    constructor() {
        super();
        this.state = {
          availableDays : []  
        };
        DatePickerStore.subscribe(this.onNewData.bind(this));
    }

    componentWillMount() {
        DatePickerStore.dispatch(newDatePickerData(availableDays.calendarConfiguration.availableDays));
        DatePickerStore.dispatch(chargeConfig(availableDays.calendarConfiguration.chargeConfigurationCollection));
        DatePickerStore.dispatch(basketTotals(availableDays.orderTotals));
    }

    onNewData() {
        this.setState({
            availableDays : objectToArray(DatePickerStore.getState().availableDays)
        });
    }

    render() {

        return (
            <div>
                <DatePicker availableDays={this.state.availableDays}/>
            </div>
        )
    }
}