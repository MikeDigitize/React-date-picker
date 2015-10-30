import React from "react";
import CSSModule from "react-css-modules";
import styles from "./price-styles";
import DatePickerStore from "../../stores/PickerStore";
import { format } from "../../utils/cost-formatter";

class Total extends React.Component {
    constructor(){
        super();
        this.state = {
            basketTotal : DatePickerStore.getState().basketTotals.overallTotal,
            totalExcDiscount : DatePickerStore.getState().basketTotals.total,
            discountTotal : format(DatePickerStore.getState().basketTotals.total - DatePickerStore.getState().basketTotals.overallTotal),
            deliveryTotal : DatePickerStore.getState().deliveryTotal,
            unsubscribe : DatePickerStore.subscribe(this.onStoreUpdate.bind(this))
        };
    }
    onStoreUpdate(){
        this.setState({
            basketTotal : DatePickerStore.getState().basketTotals.overallTotal,
            totalExcDiscount : DatePickerStore.getState().basketTotals.total,
            deliveryTotal : DatePickerStore.getState().deliveryTotal,
            discountTotal : format(DatePickerStore.getState().basketTotals.total - DatePickerStore.getState().basketTotals.overallTotal)
        });
    }
    render(){
        return(
            <div styleName="basket-total-holder">
                <h3 styleName="basket-total-title">Basket Total</h3>
                <p styleName="basket-total">&pound;{ this.state.basketTotal }</p>
                <p styleName="basket-discount">Discount: &pound;{ this.state.discountTotal }</p>
                <p styleName="basket-discount">Total exc discount: &pound;{ this.state.totalExcDiscount }</p>
            </div>
        );
    }
}

export default CSSModule(Total, styles);