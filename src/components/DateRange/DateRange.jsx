import React from "react";
import CSSModule from "react-css-modules";
import styles from "./date-range-styles";

class DateRange extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dates : this.props.dateRanges,
            tableDisplayIndex : this.props.tableDisplayIndex,
            showPrevWeek : this.props.showPrevWeek,
            showNextWeek : this.props.showNextWeek
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dates : nextProps.dateRanges,
            tableDisplayIndex : nextProps.tableDisplayIndex
        });
    }

    render() {
        return(
            <div styleName="date-range-select">
                <span styleName="date-range-left date-range-ctrl" className="icon-left" onClick={ this.state.showPrevWeek }></span>
                    <p styleName="date-range">{ this.state.dates[this.state.tableDisplayIndex] }</p>
                <span styleName="date-range-right date-range-ctrl" className="icon-right" onClick={ this.state.showNextWeek }></span>
            </div>
        );
    }

}

DateRange.defaultProps = {
    dateRanges : [],
    tableDisplayIndex : 0,
    showPrevWeek : function(){},
    showNextWeek : function(){}
};

DateRange.propTypes = {
    dateRanges : React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    tableDisplayIndex : React.PropTypes.number.isRequired,
    showPrevWeek : React.PropTypes.func.isRequired,
    showNextWeek : React.PropTypes.func.isRequired
};

export default CSSModule(DateRange, styles, { allowMultiple : true });