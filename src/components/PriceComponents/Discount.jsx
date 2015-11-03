import React from "react";
import CSSModule from "react-css-modules";
import styles from "./price-component-styles";

class Discount extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        let offer = this.props.percentage ? <span>{this.props.percentage}%</span> : <span>&pound;{this.props.value}</span>;
        let className = this.props.isActive ? "active" : "inactive";
        return(
            <div styleName="basket-total-holder" className="form-group">
                <h4 styleName="basket-discount-title">Spend more than &pound;{ this.props.threshold } to get a discount of { offer }</h4>
                <p styleName="status">Currently <span styleName={className}>{className}</span></p>
            </div>
        );
    }
}

Discount.defaultProps = {
    threshold : 0,
    percentage : 0,
    value : 0,
    isActive : false
};

Discount.propTypes = {
    threshold : React.PropTypes.number.isRequired,
    percentage : React.PropTypes.number,
    value : React.PropTypes.number,
    isActive : React.PropTypes.bool.isRequired,
};

export default CSSModule(Discount, styles);