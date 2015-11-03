import React from "react";
import CSSModule from "react-css-modules";
import styles from "./summary-styles";

class Summary extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div styleName="picker-summary-container">
                <a href="#" styleName="show-more-dates-link" onClick={ this.props.toggleShowMoreDates }>{ this.props.showHideText }</a>
                <div styleName="picker-summary">
                    <div>
                        <span styleName="summary-title">Delivery</span><span styleName="summary-price">&pound;{ this.props.deliveryTotal }</span>
                    </div>
                    <div>
                        <span styleName="summary-title">Total inc. delivery</span><span styleName="summary-price">&pound;{ this.props.basketTotal }</span>
                    </div>
                </div>
            </div>
        );
    }
}

Summary.defaultProps = {
    basketTotal : 0,
    deliveryTotal : 0,
    showHideText : "Show more timeslots",
    toggleShowMoreDates : function(){}
};

Summary.propTypes = {
    basketTotal : React.PropTypes.number.isRequired,
    deliveryTotal : React.PropTypes.number.isRequired,
    showHideText : React.PropTypes.string.isRequired,
    toggleShowMoreDates : React.PropTypes.func.isRequired
};

export default CSSModule(Summary, styles);