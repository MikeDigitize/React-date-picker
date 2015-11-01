import React from "react";
import Picker from "./Picker";
import Closed from "./PickerClosed";
import ThirdParty from "./PickerThirdParty";
import Loading from "./PickerLoading";
import NoDates from "./PickerNoDates";
import DatePickerStore from "../../stores/PickerStore";
import { loadPickerData, checkTimeslotExists, checkTableIndexExists } from "../../actions/picker-actions";

import DateRange from "../DateRange/DateRange";
import TableContainer from "../Table/TableContainer";
import Summary from "../Summary/Summary";

export default class PickerContainer extends React.Component {

    constructor() {
        super();
        DatePickerStore.dispatch(checkTableIndexExists(DatePickerStore.getState().tableData));
        this.state = {
            pickerState : {
                "closed" : true,
                "third-party" : false,
                "no-dates-available" : false,
                "loading" : false,
                "ready" : false
            },
            dateRanges : DatePickerStore.getState().tableData.dateRanges,
            tableDisplayIndex : DatePickerStore.getState().tableData.tableDisplayIndex,
            deliveryTotal : DatePickerStore.getState().tableData.selectedTimeslotData.charge || 0,
            basketTotal : DatePickerStore.getState().basketTotals.overallTotal,
            showHideText : DatePickerStore.getState().tableData.showHideText,
            unsubscribe : DatePickerStore.subscribe(this.onStoreUpdate.bind(this))
        };
    }

    componentWillUnmount() {
        if(typeof this.state.unsubscribe === "function") {
            this.state.unsubscribe();
        }
    }

    componentWillReceiveProps(nextProps) {
        if(Object.keys(nextProps.config).length) {
            if(nextProps.config.state === "ThirdParty") {
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
            else if(!nextProps.config.hasDeliveryDates){
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
                this.setState({
                    pickerState : {
                        closed : false,
                        thirdparty : false,
                        noDatesAvailable : false,
                        loading : true,
                        ready : false
                    }
                });

                // simulate ajax call to keep loading screen visible
                setTimeout(()=> {
                    this.preparePickerData(nextProps.config);
                }, 250);
            }
        }
    }

    preparePickerData(config) {

        DatePickerStore.dispatch(loadPickerData(config));
        DatePickerStore.dispatch(checkTimeslotExists(DatePickerStore.getState().tableData));

        this.setState({
            pickerState : {
                closed : false,
                thirdparty : false,
                noDatesAvailable : false,
                loading : false,
                ready : true
            }
        });

    }

    onStoreUpdate() {
        this.setState({
            dateRanges : DatePickerStore.getState().tableData.dateRanges,
            tableDisplayIndex : DatePickerStore.getState().tableData.tableDisplayIndex,
            deliveryTotal : DatePickerStore.getState().tableData.selectedTimeslotData.charge || 0,
            basketTotal : DatePickerStore.getState().basketTotals.overallTotal,
            showHideText : DatePickerStore.getState().tableData.showHideText
        });
    }

    render() {
        if(this.state.pickerState.closed) {
            return (<Closed />);
        }
        else if(this.state.pickerState.thirdparty) {
            return (<ThirdParty />);
        }
        else if(this.state.pickerState.noDatesAvailable) {
            return (<NoDates />);
        }
        else if(this.state.pickerState.loading){
            return (<Loading />);
        }
        else if(this.state.pickerState.ready){
            return (
                <section className="date-picker">
                    <DateRange
                        dateRanges={ this.state.dateRanges }
                        tableDisplayIndex={ this.state.tableDisplayIndex }
                        />
                    <TableContainer />
                    <Summary
                        basketTotal={ this.state.basketTotal }
                        deliveryTotal={ this.state.deliveryTotal }
                        showHideText={ this.state.showHideText }
                        />
                </section>
            );
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
    config : React.PropTypes.object.isRequired
};