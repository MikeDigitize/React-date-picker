import React from "react";
import CSSModule from "react-css-modules";
import styles from "./date-range-styles";
import DatePickerStore from "../../stores/PickerStore";

class DateRange extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div styleName="date-range-select">
                <span styleName="date-range-left date-range-ctrl" className="icon-left"></span>
                    <p styleName="date-range">Oct 11 - Oct 17</p>
                <span styleName="date-range-right date-range-ctrl" className="icon-right"></span>
            </div>
        );
    }

}

export default CSSModule(DateRange, styles, { allowMultiple : true });