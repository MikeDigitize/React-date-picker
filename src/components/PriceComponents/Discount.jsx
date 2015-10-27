import React from "react";
import CSSModule from "react-css-modules";
import styles from "./price-styles";

class Discount extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            discountThreshold : this.props.threshold,
            discountPercentage : this.props.percentage,
            discountValue : this.props.threshold,
            isActive : this.props.isActive
        };
    }

    render(){
        let offer = this.state.discountPercentage ? this.state.discountPercentage + "%" : this.state.discountValue;
        let className = this.state.isActive ? "active" : "inactive";
        return(
            <div styleName="basket-total-holder" className="form-group">
                <h4 styleName="basket-discount-title">Spend more than &pound;{ this.state.discountThreshold } to get a discount of { offer }</h4>
                <p styleName="status">Currently <span styleName={className}>{className}</span></p>
            </div>
        );
    }
}

export default CSSModule(Discount, styles);