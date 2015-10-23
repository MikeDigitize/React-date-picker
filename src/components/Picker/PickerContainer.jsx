import React from "react";
import Picker from "./Picker";
import PickerClosed from "./PickerClosed";
import DatePickerStore from "../../stores/PickerStore";
import { totalWeeks, dateRanges, tableHeadData, tableBodyData, timeDescriptions } from "../../actions/picker-actions";
import { basketTotal, availableDates } from "../../actions/external-actions";

export default class PickerContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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

        if(Object.keys(nextProps).length) {

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

                // simulate ajax call to keep loading screen visible
                setTimeout(()=> {
                    this.preparePickerData(nextProps.config);
                }, 1000);

            }

        }

    }

    preparePickerData(config) {

        DatePickerStore.dispatch(basketTotal(config.basketTotal));
        DatePickerStore.dispatch(totalWeeks(config.weeksInConfig));
        DatePickerStore.dispatch(dateRanges(config.dateRanges));
        DatePickerStore.dispatch(tableHeadData(config.tableHeadData));
        DatePickerStore.dispatch(tableBodyData(config.tableBodyData));
        DatePickerStore.dispatch(timeDescriptions(config.timeDescriptions));

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

    onNewData(){
        console.log("store updated", DatePickerStore.getState());
    }

    render() {
        if(this.state.pickerState.closed) {
            return (<PickerClosed />);
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
            return (<Picker />);
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