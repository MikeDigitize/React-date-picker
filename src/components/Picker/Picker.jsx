import React from "react";
import CSSModule from "react-css-modules";
import styles from "./picker-styles";
import DatePickerStore from "../../stores/PickerStore";

class Picker extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section styleName="date-picker">
                <h1>AO.com</h1>
                <ul>
                    { Object.keys(this.props.dateChargesConfig).map((date, i) => <li key={i}>{date}</li>)}
                </ul>
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