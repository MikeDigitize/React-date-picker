import React from "react";
import CSSModule from "react-css-modules";
import styles from "./date-picker.scss";

class DatePicker extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className="col-xs-12" styleName="header-styles">
                <h1 styleName="header-sass">AO.com</h1>
                <ul>
                    {
                        this.props.availableDays.map((day, i) => {
                            let shortdate = Object.keys(day)[0]
                            return <li key={i}>{shortdate}</li>
                        })
                    }
                </ul>
            </header>
        );
    }

}

DatePicker.defaultProps = {
    availableDays : []
};

DatePicker.propTypes = {
    availableDays : React.PropTypes.array
};

export default CSSModule(DatePicker, styles);