import React from "react";
import Picker from "./Picker";
import DatePickerStore from "../../stores/PickerStore";
import { basketTotal, availableDates, chargesConfig, daysConfig, totalWeeks } from "../../actions/picker-data-actions";
import { dateCharges } from "../../data/date-charges";
import { fillInGaps, formatDates, includeDayTypeCharges,createDateRanges } from "../../utils/date-utils";
import "../../utils/Object-is-polyfill";

export default class PickerContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dateChargesConfig : {},
            unsubscribeFromStore : null,
            pickerState : {
                "closed" : true,
                "third-party" : false,
                "no-dates-available" : false,
                "loading" : false,
                "ready" : false
            }
        };
    }

    componentWillReceiveProps(nextProps) {

        /*
            When props contain an object with a key we know we have some data to work with.
            The first config arrives with some data we need to send to the store -
                - the available dates and date types
                - the charge configuration
                - the order totals
            We then need to create a comma separated list of shortdates to send off to a second handler
            which returns the detailed date info.
         */

        if(Object.keys(nextProps).length) {

            if(nextProps.config.calendarConfiguration.dataState === "ThirdParty") {
                this.setState({
                    pickerState : {
                        closed : false,
                        thirdparty : true,
                        noDatesAvailable : false,
                        loading : false,
                        ready : false
                    }
                });
            }

            else if(!Object.keys(nextProps.config.calendarConfiguration.availableDays).length){
                this.setState({
                    pickerState : {
                        closed : false,
                        thirdparty : false,
                        noDatesAvailable : true,
                        loading : false,
                        ready : false
                    }
                });

            }

            else {

                if(this.state.unsubscribeFromStore){
                    this.state.unsubscribeFromStore();
                }

                this.setState({
                    unsubscribeFromStore : DatePickerStore.subscribe(this.onNewData.bind(this)),
                    pickerState : {
                        closed : false,
                        thirdparty : false,
                        noDatesAvailable : false,
                        loading : true,
                        ready : false
                    }
                });

                DatePickerStore.dispatch(basketTotal(nextProps.config.orderTotals.OverallTotalNumber));
                DatePickerStore.dispatch(availableDates(nextProps.config.calendarConfiguration.availableDays));
                DatePickerStore.dispatch(chargesConfig(nextProps.config.calendarConfiguration.chargeConfigurationCollection));

                setTimeout(()=> {
                    this.preparePickerData();
                }, 1000);

            }

        }

    }

    preparePickerData() {
        let dates = fillInGaps(DatePickerStore.getState().availableDates);
        let formattedDates = formatDates(dates);
        let weeks = formattedDates.length % 7 === 0 ? formattedDates.length / 7 : Math.floor(formattedDates.length / 7) + 1;
        formattedDates = includeDayTypeCharges(formattedDates, DatePickerStore.getState().chargesConfig);
        DatePickerStore.dispatch(availableDates(dates));
        DatePickerStore.dispatch(daysConfig(formattedDates));
        DatePickerStore.dispatch(totalWeeks(weeks));

        this.setState({
            dateRanges : createDateRanges(formattedDates, weeks),
            pickerState : {
                closed : false,
                thirdparty : false,
                noDatesAvailable : false,
                loading : false,
                ready : true
            }
        });

    }

    onNewData(){
        console.log("on new data!!", DatePickerStore.getState());
    }

    render() {
        if(this.state.pickerState.closed) {
            return (
                <div>
                    <p>Closed</p>
                </div>
            );
        }
        else if(this.state.pickerState.thirdparty) {
            return (
                <div>
                    <p>thirdparty</p>
                </div>
            );
        }
        else if(this.state.pickerState.noDatesAvailable) {
            return (
                <div>
                    <p>noDatesAvailable</p>
                </div>
            );
        }
        else if(this.state.pickerState.loading){
            return (
                <div>
                    <p>loading</p>
                </div>
            );
        }
        else if(this.state.pickerState.ready){
            return (<Picker dateRanges={this.state.dateRanges}/>);
        }
        else {
            return false;
        }
    }

}

PickerContainer.defaultProps = {
    config : {}
};

PickerContainer.propTypes = {
    config : React.PropTypes.object
};