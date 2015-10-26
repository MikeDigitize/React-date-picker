import React from "react";
import CSSModule from "react-css-modules";
import styles from "./price-styles";
import DatePickerStore from "../../stores/PickerStore";
import { subtractFromBasketTotal } from "../../actions/external-actions";

class Discount extends React.Component {
    constructor(){
        super();
        this.state = {
            hasBeenApplied : false
        };
        DatePickerStore.subscribe(this.onStoreUpdate.bind(this));
    }
    checkTotalForDiscountEligibility(){
        let total = DatePickerStore.getState().basketTotal;
        if(total >= 260) {
            if(!this.state.hasBeenApplied) {
                let discount = Math.round(total / 100 * 10);
                console.log(total, discount);
                this.setState({
                    hasBeenApplied : true
                });
                DatePickerStore.dispatch(subtractFromBasketTotal(discount))
            }
        }
        else {
            this.setState({
                hasBeenApplied : false
            });
        }
    }
    onStoreUpdate() {
        this.checkTotalForDiscountEligibility();
    }
    render(){
        return(
            <div styleName="basket-total-holder" className="form-group">
                <h3 styleName="basket-total-title">Spend more than &pound;100 to get a discount of 10%</h3>
            </div>
        );
    }
}

export default CSSModule(Discount, styles);