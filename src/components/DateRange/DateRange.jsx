import React from "react";
import CSSModule from "react-css-modules";
import styles from "./date-range-styles";
import DatePickerStore from "../../stores/PickerStore";
import { updateTableIndex } from "../../actions/picker-actions";

class DateRange extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dates : this.props.dateRanges,
            tableDisplayIndex : this.props.tableDisplayIndex,
            unsubscribe : DatePickerStore.subscribe(this.onTableDisplayIndexUpdate.bind(this))
        };
    }

    componentWillUnmount() {
        this.state.unsubscribe();
    }

    onTableDisplayIndexUpdate() {
        this.setState({
            tableDisplayIndex : DatePickerStore.getState().tableDisplayIndex
        });
    }

    prevweek() {
        this.setState({
           tableDisplayIndex : this.state.tableDisplayIndex === 0 ? this.state.dates.length - 1 : --this.state.tableDisplayIndex
        }, () => {
            DatePickerStore.dispatch(updateTableIndex(this.state.tableDisplayIndex));
        });
    }

    nextweek() {
        this.setState({
            tableDisplayIndex : this.state.tableDisplayIndex === this.state.dates.length - 1 ? 0 : ++this.state.tableDisplayIndex
        }, () => {
            DatePickerStore.dispatch(updateTableIndex(this.state.tableDisplayIndex));
        });
    }

    render() {
        return(
            <div styleName="date-range-select">
                <span styleName="date-range-left date-range-ctrl" className="icon-left" onClick={ this.prevweek.bind(this)}></span>
                    <p styleName="date-range">{ this.state.dates[this.state.tableDisplayIndex] }</p>
                <span styleName="date-range-right date-range-ctrl" className="icon-right" onClick={ this.nextweek.bind(this)}></span>
            </div>
        );
    }

}

DateRange.defaultProps = {
    dateRanges : [],
    tableDisplayIndex : 0
};

DateRange.propTypes = {
    dateRanges : React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    tableDisplayIndex : React.PropTypes.number.isRequired
};

export default CSSModule(DateRange, styles, { allowMultiple : true });