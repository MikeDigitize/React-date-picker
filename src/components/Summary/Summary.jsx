import React from "react";
import CSSModule from "react-css-modules";
import styles from "./summary-styles";
import DatePickerStore from "../../stores/PickerStore";

class Summary extends React.Component {

    constructor(){
        super();
        this.state = {
            basketTotal : 0,
            unsubscribe : DatePickerStore.subscribe(this.onTotalUpdate.bind(this))
        };

    }

    componentWillUnmount() {
        this.state.unsubscribe();
    }

    onTotalUpdate() {
        console.log("update summary!");
        this.setState({
            basketTotal : DatePickerStore.getState().basketTotal
        });
    }

    render(){
        return(
            <div styleName="picker-summary-container">
                <div styleName="picker-summary">
                    <div>
                        <span styleName="summary-title">Delivery</span><span styleName="summary-price">-</span>
                    </div>
                    <div>
                        <span styleName="summary-title">Total inc. delivery</span><span styleName="summary-price">{ this.state.basketTotal }</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default CSSModule(Summary, styles);