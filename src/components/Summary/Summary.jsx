import React from "react";
import CSSModule from "react-css-modules";
import styles from "./summary-styles";
import DatePickerStore from "../../stores/PickerStore";

class Summary extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            basketTotal : this.props.basketTotal,
            discountTotal : this.props.discountTotal,
            unsubscribe : DatePickerStore.subscribe(this.onUpdate.bind(this))
        };
    }

    componentWillUnmount() {
        if(typeof this.state.unsubscribe === "function") {
            this.state.unsubscribe();
        }
    }

    onUpdate() {
        this.setState({
            basketTotal : DatePickerStore.getState().basketTotal,
            discountTotal : DatePickerStore.getState().chosenTimeslotData.charge || 0
        });
    }

    render(){
        return(
            <div styleName="picker-summary-container">
                <div styleName="picker-summary">
                    <div>
                        <span styleName="summary-title">Delivery</span><span styleName="summary-price">&pound;{ this.state.discountTotal }</span>
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
    basketTotal : 0
};

Summary.propTypes = {
    basketTotal : React.PropTypes.number.isRequired
};

export default CSSModule(Summary, styles);