import React from "react";
import CSSModule from "react-css-modules";
import styles from "./date-range-styles";
import CheckoutStore from "../../stores/CheckoutStore";
import { updateTableIndex } from "../../actions/table-data-actions";

class DateRange extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dates : this.props.dateRanges,
            tableDisplayIndex : this.props.tableDisplayIndex
        };
    }

    componentWillUnmount() {
        if(typeof this.state.unsubscribe === "function") {
            this.state.unsubscribe();
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dates : nextProps.dateRanges,
            tableDisplayIndex : nextProps.tableDisplayIndex
        });
    }

    prevweek() {
        let prev = this.state.tableDisplayIndex === 0 ? this.state.dates.length - 1 : --this.state.tableDisplayIndex;
        CheckoutStore.dispatch(updateTableIndex(prev));
    }

    nextweek() {
        let next = this.state.tableDisplayIndex === this.state.dates.length - 1 ? 0 : ++this.state.tableDisplayIndex;
        CheckoutStore.dispatch(updateTableIndex(next));
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