import React from "react";
import Picker from "./Picker";
import PickerClosed from "./PickerClosed";
import ThirdParty from "./ThirdParty";
import DatePickerStore from "../../stores/PickerStore";
import { loadPickerData } from "../../actions/picker-actions";

export default class PickerContainer extends React.Component {

    constructor() {
        super();
        this.state = {
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

    render() {
        if(this.state.pickerState.closed) {
            return (<PickerClosed />);
        }
        else if(this.state.pickerState.thirdparty) {
            return (<ThirdParty />);
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