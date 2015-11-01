import React from "react";
import CSSModule from "react-css-modules";
import styles from "./picker-styles";

class ThirdParty extends React.Component {
    render() {
        return(
            <p styleName="third-party-message">Sorry we can't give you a delivery date just yet, but a member of staff will call you shortly and organise one with you</p>
        );
    }
}

export default CSSModule(ThirdParty, styles);