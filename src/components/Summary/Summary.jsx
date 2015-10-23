import React from "react";
import CSSModule from "react-css-modules";
import styles from "./summary-styles";

class Summary extends React.Component {
    render(){
        return(
            <div styleName="picker-summary-container">
                <div styleName="picker-summary">
                    <div>
                        <span styleName="summary-title">Delivery</span><span styleName="summary-price">-</span>
                    </div>
                    <div>
                        <span styleName="summary-title">Total inc. delivery</span><span styleName="summary-price">-</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default CSSModule(Summary, styles);