import React from "react";
import CSSModule from "react-css-modules";
import styles from "./picker-styles";
import DatePickerStore from "../../stores/PickerStore";

import DateRange from "../DateRange/DateRange";

class Picker extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section styleName="date-picker">
                <DateRange />

            </section>
        );
    }

}

Picker.defaultProps = {
    availableDates : {}
};

Picker.propTypes = {
    availableDates : React.PropTypes.object
};

export default CSSModule(Picker, styles);