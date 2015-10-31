import React from "react";
import Picker from "./Picker";
import PickerClosed from "./PickerClosed";
import ThirdParty from "./ThirdParty";
import DatePickerStore from "../../stores/PickerStore";
import { loadPickerData, checkTimeslotExists, checkTableIndexExists } from "../../actions/picker-actions";

import DateRange from "../DateRange/DateRange";
import Table from "../Table/TableContainer";
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
            unsubscribe : DatePickerStore.subscribe(this.onStoreUpdate.bind(this))
        };
    }

    static componentWillMount() {
        DatePickerStore.dispatch(checkTimeslotExists(DatePickerStore.getState().tableData));
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
            basketTotal : DatePickerStore.getState().basketTotals.overallTotal
        });
    }

    render() {
        if(this.state.pickerState.closed) {
            return (<PickerClosed />);
        }
        else if(this.state.pickerState.thirdparty) {
            return (<ThirdParty />);
        }
        else if(this.state.pickerState.noDatesAvailable) {
            return (<div><p>noDatesAvailable</p></div>);
        }
        else if(this.state.pickerState.loading){
            return (<div><p>loading</p></div>);
        }
        else if(this.state.pickerState.ready){
            return (
                <section className="date-picker">
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