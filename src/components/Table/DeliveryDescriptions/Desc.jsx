import React from "react";
import CSSModule from "react-css-modules";
import styles from "./description-styles";

class SameDayDesc extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <span>
                <p styleName="time-desc">{ this.props.desc }</p>
                <p styleName="time">{ this.props.time }</p>
                <p styleName="extra-info"></p>
            </span>
        );
    }
}

export default CSSModule(SameDayDesc, styles);