import React from "react";
import CSSModule from "react-css-modules";
import styles from "./picker-styles";

class NoDates extends React.Component {
    render() {
        return(
            <p styleName="no-dates-message">Sorry, no dates are available for your address.</p>
        );
    }
}

export default CSSModule(NoDates, styles);