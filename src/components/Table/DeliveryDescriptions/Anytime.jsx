import React from "react";
import CSSModule from "react-css-modules";
import styles from "./description-styles";

class AnytimeDesc extends React.Component {
    render() {
        return (
            <span>
                <p styleName="time-desc">Standard Delivery</p>
                <p styleName="extra-info"><span className="icon-tick2"></span> We'll text a 4-hour time slot on the day</p>
                <p styleName="extra-info"><span className="icon-tick2"></span> Online order tracking - no need to wait in</p>
                <p styleName="extra-info"><span className="icon-tick2"></span> Delivery from 7AM - 7PM</p>
            </span>
        );
    }
}
export default CSSModule(AnytimeDesc, styles);