import React from "react";
import CSSModule from "react-css-modules";
import styles from "./price-component-styles";

class Total extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div styleName="basket-total-holder">
                <h3 styleName="basket-total-title">Basket Total</h3>
                <p styleName="basket-total">&pound;{ this.props.basketTotal }</p>
                <p styleName="basket-discount">Discount: &pound;{ this.props.discountTotal }</p>
                <p styleName="basket-discount">Delivery: &pound;{ this.props.deliveryTotal }</p>
                <p styleName="basket-discount">Total exc discount: &pound;{ this.props.totalExcDiscount }</p>
            </div>
        );
    }
}

Total.defaultProps = {
    basketTotal : 0,
    totalExcDiscount : 0,
    discountTotal : 0,
    deliveryTotal : 0
};

Total.propTypes = {
    basketTotal : React.PropTypes.number.isRequired,
    totalExcDiscount : React.PropTypes.number.isRequired,
    discountTotal : React.PropTypes.number.isRequired,
    deliveryTotal : React.PropTypes.number.isRequired
};

export default CSSModule(Total, styles);