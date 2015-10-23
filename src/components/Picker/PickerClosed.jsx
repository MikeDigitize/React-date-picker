import React from "react";
import CSSModule from "react-css-modules";
import styles from "./picker-styles";

class PickerClosed extends React.Component {
    render() {
        return(<div styleName="date-picker-closed">
            <p styleName="date-picker-closed-text">Enter your delivery address and we'll show you when we can deliver</p>
        </div>)
    }
}

export default CSSModule(PickerClosed, styles);