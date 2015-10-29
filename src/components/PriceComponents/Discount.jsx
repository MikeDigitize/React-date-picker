import React from "react";
import CSSModule from "react-css-modules";
import styles from "./price-styles";

class Discount extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            discountThreshold : this.props.threshold,
            discountPercentage : this.props.percentage,
            discountValue : this.props.value,
            isActive : this.props.isActive
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            discountThreshold : nextProps.threshold,
            discountPercentage : nextProps.percentage,
            discountValue : nextProps.value,
            isActive : nextProps.isActive
        });
    }

    render(){
        let offer = this.state.discountPercentage ? <span>{this.state.discountPercentage}%</span> : <span>&pound;{this.state.discountValue}</span>;
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