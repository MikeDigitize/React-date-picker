import React from "react";
import CSSModule from "react-css-modules";
import styles from "./summary-styles";
import DatePickerStore from "../../stores/PickerStore";
import { displayAllRows } from "../../actions/picker-actions";

class Summary extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            basketTotal : this.props.basketTotal,
            deliveryTotal : this.props.deliveryTotal
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            basketTotal : nextProps.basketTotal,
            deliveryTotal : nextProps.deliveryTotal
        });
    }

    static toggleDisplay(e){
        e.preventDefault();
        let hidden = Array.from(document.querySelectorAll(".row-hide"));
        if(hidden.length) {
            DatePickerStore.dispatch(displayAllRows(true));
            hidden.forEach(row => {
                row.classList.toggle("row-hide");
            });
        }
        else {
            let rowsToHide = Array.from(document.querySelectorAll("[data-should-be-hidden='true']"));
            DatePickerStore.dispatch(displayAllRows(false));
            rowsToHide.forEach(row => {
                row.classList.toggle("row-hide");
            });
        }
    }

    render(){
        return(
            <div styleName="picker-summary-container">
                <a href="#" styleName="show-more-dates-link" onClick={ Summary.toggleDisplay }>Show more timeslots</a>
                <div styleName="picker-summary">
                    <div>
                        <span styleName="summary-title">Delivery</span><span styleName="summary-price">&pound;{ this.state.deliveryTotal }</span>
                    </div>
                    <div>
                        <span styleName="summary-title">Total inc. delivery</span><span styleName="summary-price">&pound;{ this.state.basketTotal }</span>
                    </div>
                </div>
            </div>
        );
    }
}

Summary.defaultProps = {
    basketTotal : 0,
    deliveryTotal : 0
};

Summary.propTypes = {
    basketTotal : React.PropTypes.number.isRequired,
    deliveryTotal : React.PropTypes.number.isRequired
};

export default CSSModule(Summary, styles);