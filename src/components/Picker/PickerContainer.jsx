import React from "react";
import Picker from "./Picker";
import DatePickerStore from "../../stores/PickerStore";
import { calendarConfig, basketTotalUpdate, availableDates, dateChargeConfig } from "../../actions/picker-data-actions";
import { dateCharges } from "../../data/date-charges";
import "../../utils/Object-is-polyfill";

export default class PickerContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            config : this.props.config,
            availableDates : [],
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

                console.log("loading!");

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

                // simulate ajax call
                setTimeout(()=> {

                    this.setState({
                        dateChargesConfig : dateCharges,
                        pickerState : {
                            closed : false,
                            thirdparty : false,
                            noDatesAvailable : false,
                            loading : false,
                            ready : true
                        }
                    });

                }, 1500);

                DatePickerStore.dispatch(basketTotalUpdate(nextProps.config.orderTotals.OverallTotalNumber));

            }
        }
    }

    onNewData(){
        console.log("on new data!!");
    }

    render() {
        console.log("render picker", this.state);
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
            return (<Picker dateChargesConfig={this.state.dateChargesConfig}/>);
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