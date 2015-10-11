import React from "react";
import Picker from "./Picker";
import DatePickerStore from "../../stores/PickerStore";
import { calendarConfig, basketTotalUpdate, availableDates, dateChargeConfig } from "../../actions/picker-data-actions";
import { dateCharges } from "../../data/date-charges";
import "../../utils/Object-is-polyfill";

export default class PickerContainer extends React.Component {

    constructor() {
        super();
        this.state = {
            availableDates : [],
            dateChargesConfig : {}
        };
        DatePickerStore.subscribe(this.onNewData.bind(this));
    }

    componentWillMount() {
        DatePickerStore.dispatch(calendarConfig(this.props.config));
        DatePickerStore.dispatch(availableDates(this.props.config.calendarConfiguration.availableDays));
        DatePickerStore.dispatch(basketTotalUpdate(this.props.config.orderTotals.OverallTotalNumber));
    }

    onNewData() {

        let newavailableDates = DatePickerStore.getState().availableDates;
        this.setState((previousState) => {
            let same = (previousState.availableDates.length === newavailableDates.length) && previousState.availableDates.length;
            if(same) {
                same = previousState.availableDates.map((date, i) => {
                    return Object.is(date, newavailableDates[i])
                }).reduce((a,b) => a && b);
            }
            if(!same) {
                DatePickerStore.dispatch(dateChargeConfig(dateCharges));
            }
            return { availableDates: newavailableDates, dateChargesConfig : DatePickerStore.getState().dateChargesConfig };
        });
    }

    render() {
        return (<Picker dateChargesConfig={this.state.dateChargesConfig}/>);
    }

}

PickerContainer.defaultProps = {
    config : {}
};

PickerContainer.propTypes = {
    config : React.PropTypes.object
};