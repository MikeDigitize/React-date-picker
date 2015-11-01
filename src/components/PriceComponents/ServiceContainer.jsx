import React from "react";
import Service from "./Service";
import DatePickerStore from "../../stores/PickerStore";
import { addCharge, removeCharge } from "../../actions/external-actions";

export default class ServiceContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            desc : this.props.description,
            value : this.props.value,
            toggleService : this.toggleService.bind(this),
            isActive : false
        };
    }

    toggleService() {
        if(this.state.isActive) {
            DatePickerStore.dispatch(removeCharge(this.createChargeStoreObject()));
        }
        else {
            DatePickerStore.dispatch(addCharge(this.createChargeStoreObject()));
        }
        this.setState({
            isActive : !this.state.isActive
        });
    }

    createChargeStoreObject() {
        return {
            name : this.state.name,
            value : this.state.value
        }
    }

    render() {
        return (
            <div className="form-group">
                <Service
                    value={ this.state.value }
                    desc={ this.state.desc }
                    toggle={ this.state.toggleService }
                    isActive={ this.state.isActive }
                />
            </div>
        );
    }
}

ServiceContainer.defaultProps = {
    desc : "",
    value : 0,
    toggleService : function(){},
};

ServiceContainer.propTypes = {
    desc : React.PropTypes.string.isRequired,
    value : React.PropTypes.number.isRequired,
    toggleService : React.PropTypes.func.isRequired
};