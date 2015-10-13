import React from "react";
import CSSModule from "react-css-modules";
import styles from "./date-range-styles";
import DatePickerStore from "../../stores/PickerStore";
import { updateTableIndex } from "../../actions/picker-data-actions";

class DateRange extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dates : this.props.dateRanges,
            index : DatePickerStore.getState().tableDisplayIndex
        };
        DatePickerStore.subscribe(this.onTableDisplayIndexUpdate.bind(this));
    }

    onTableDisplayIndexUpdate() {
        this.setState({
            index : DatePickerStore.getState().tableDisplayIndex
        });
    }

    prevweek() {
        this.setState({
           index : this.state.index === 0 ? this.state.dates.length - 1 : --this.state.index
        }, () => {
            DatePickerStore.dispatch(updateTableIndex(this.state.index));
        });
    }

    nextweek() {
        this.setState({
            index : this.state.index === this.state.dates.length - 1 ? 0 : ++this.state.index
        }, () => {
            DatePickerStore.dispatch(updateTableIndex(this.state.index));
        });
    }

    render() {
        return(
            <div styleName="date-range-select">
                <span styleName="date-range-left date-range-ctrl" className="icon-left" onClick={ this.prevweek.bind(this)}></span>
                    <p styleName="date-range">{ this.state.dates[this.state.index] }</p>
                <span styleName="date-range-right date-range-ctrl" className="icon-right" onClick={ this.nextweek.bind(this)}></span>
            </div>
        );
    }

}

export default CSSModule(DateRange, styles, { allowMultiple : true });