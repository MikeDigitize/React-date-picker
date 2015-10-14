import React from "react";
import CSSModule from "react-css-modules";
import styles from "./picker-styles";
import DatePickerStore from "../../stores/PickerStore";

import DateRange from "../DateRange/DateRange";
import Table from "../Table/Table";

class Picker extends React.Component {

    constructor(props) {
        super(props);
        console.log("this.props", this.props);
    }

    render() {
        return (
            <section styleName="date-picker">
                <DateRange dateRanges={this.props.dateRanges}/>
                <Table dateRanges={this.props.tableHeadData} />
            </section>
        );
    }

}

Picker.defaultProps = {
    dateRanges : []
};

Picker.propTypes = {
    dateRanges : React.PropTypes.array
};

export default CSSModule(Picker, styles);