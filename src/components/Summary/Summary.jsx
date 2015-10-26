import React from "react";
import CSSModule from "react-css-modules";
import styles from "./summary-styles";
import DatePickerStore from "../../stores/PickerStore";

class Summary extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            basketTotal : this.props.basketTotal,
            deliveryTotal : this.props.deliveryTotal,
            unsubscribe : DatePickerStore.subscribe(this.onStoreUpdate.bind(this))
        };
    }

    componentWillUnmount() {
        if(typeof this.state.unsubscribe === "function") {
            this.state.unsubscribe();
        }
    }

    onStoreUpdate() {
        this.setState({
            basketTotal : DatePickerStore.getState().basketTotal,
            deliveryTotal : DatePickerStore.getState().selectedTimeslotData.charge || 0
        });
    }

    render(){
        return(
            <div styleName="picker-summary-container">
                <div styleName="picker-summary">
                    <div>
                        <span styleName="summary-title">Delivery</span><span styleName="summary-price">&pound;{ this.state.deliveryTotal }</span>
                    </div>
                    <div>
                        <span styleName="summary-title">Total inc. delivery</span><span styleName="summary-price">&pound;{ this.state.basketTotal }</span>
                    </div>
                </div>
            </div>
        );
    }
}

Summary.defaultProps = {
    basketTotal : 0,
    deliveryTotal : 0
};

Summary.propTypes = {
    basketTotal : React.PropTypes.number.isRequired,
    deliveryTotal : React.PropTypes.number.isRequired
};

export default CSSModule(Summary, styles);