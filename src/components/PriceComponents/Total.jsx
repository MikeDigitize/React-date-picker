import React from "react";
import CSSModule from "react-css-modules";
import styles from "./price-styles";
import DatePickerStore from "../../stores/PickerStore";

class Total extends React.Component {
    constructor(){
        super();
        this.state = {
            basketTotal : DatePickerStore.getState().basketTotals.totalIncDiscounts,
            deliveryTotal : DatePickerStore.getState().deliveryTotal,
            unsubscribe : DatePickerStore.subscribe(this.onStoreUpdate.bind(this))
        }
    }
    onStoreUpdate(){
        this.setState({
            basketTotal : DatePickerStore.getState().basketTotals.totalIncDiscounts,
            deliveryTotal : DatePickerStore.getState().deliveryTotal
        });
    }
    render(){
        return(
            <div styleName="basket-total-holder">
                <h3 styleName="basket-total-title">Basket Total</h3>
                <p styleName="basket-total">&pound;{ this.state.basketTotal }</p>
            </div>
        );
    }
}

export default CSSModule(Total, styles);