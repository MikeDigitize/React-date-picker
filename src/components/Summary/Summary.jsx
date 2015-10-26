import React from "react";
import CSSModule from "react-css-modules";
import styles from "./summary-styles";
import DatePickerStore from "../../stores/PickerStore";

class Summary extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            basketTotal : this.props.basketTotal,
            deliveryTotal : this.props.deliveryTotal
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            basketTotal : nextProps.basketTotal,
            deliveryTotal : nextProps.deliveryTotal
        });
    }

    render(){
        return(
            <div styleName="picker-summary-container">
                <a href="#" styleName="show-more-dates-link">Show more timeslots</a>
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