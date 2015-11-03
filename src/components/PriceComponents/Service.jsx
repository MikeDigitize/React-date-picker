import React from "react";
import CSSModule from "react-css-modules";
import styles from "./price-component-styles";

class Service extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let className = !this.props.isActive ? "service-hide" : "";
        return (
            <div className="checkbox" styleName="basket-total-holder">
                <label styleName="service-text">
                    <input type="checkbox" onChange={ this.props.toggle } />
                    { this.props.desc } <span styleName="service-text service-value" className={className}>&pound;{ this.props.value }</span>
                </label>
            </div>
        );
    }
}

Service.defaultProps = {
    desc : "",
    value : 0,
    toggle : function(){},
    isActive : false
};

Service.propTypes = {
    desc : React.PropTypes.string.isRequired,
    value : React.PropTypes.number.isRequired,
    toggle : React.PropTypes.func.isRequired,
    isActive : React.PropTypes.bool.isRequired
};

export default CSSModule(Service, styles, { allowMultiple : true });