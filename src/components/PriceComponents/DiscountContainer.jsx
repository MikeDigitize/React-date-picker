import React from "react";
import Discount from "./Discount";
import DatePickerStore from "../../stores/PickerStore";
import { subtractFromBasketTotal, addToBasketDiscounts, basketTotalIncDiscountsUpdate } from "../../actions/external-actions";
import { format } from "../../utils/cost-formatter";

export default class DiscountContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name : this.props.name,
            threshold : this.props.threshold,
            percentage : this.props.percentage,
            value : this.props.value,
            basketTotal : DatePickerStore.getState().basketTotals.totalIncDiscounts,
            isActive : false
        };
        DatePickerStore.subscribe(this.onStoreUpdate.bind(this));
    }

    componentWillMount(){
        this.checkTotalForDiscountEligibility();
    }

    onStoreUpdate() {
        console.log("store update!", DatePickerStore.getState());
        this.setState({
            basketTotal : DatePickerStore.getState().basketTotals.total
        }, ()=> {
            this.checkTotalForDiscountEligibility();
        });
    }

    checkTotalForDiscountEligibility() {
        if(this.state.percentage) {
            this.percentageDiscount();
        }
        else {
            this.valueDiscount();
        }
    }

    percentageDiscount() {
        let total = this.state.basketTotal;
        let threshold = this.state.threshold;
        let prevState = this.state;
        let active = false;
        if(total >= threshold) {
            active = true;
        }
        this.setState({
            isActive : active
        }, ()=> {
            if(active && !prevState.isActive) {
                DatePickerStore.dispatch(addToBasketDiscounts(this.createDiscountStoreObject()));
                DatePickerStore.dispatch(basketTotalIncDiscountsUpdate(null));
            }
        });

    }

    valueDiscount() {
        let total = this.state.basketTotal;
        let threshold = this.state.threshold;
        let prevState = this.state;
        let active = false;
        if(total >= threshold) {
            active = true;
        }
        this.setState({
            isActive : active
        }, ()=> {
            if(active && !prevState.isActive) {
                DatePickerStore.dispatch(addToBasketDiscounts(this.createDiscountStoreObject()));
                DatePickerStore.dispatch(basketTotalIncDiscountsUpdate(null));
            }
        });
    }

    createDiscountStoreObject(){
        return {
            name : this.state.name,
            threshold : this.state.threshold,
            percentage : this.state.percentage,
            value : this.state.value
        }
    }

    render() {
        return (
            <Discount
                threshold={ this.state.threshold }
                percentage={ this.state.percentage }
                value={ this.state.value }
                isActive={this.state.isActive}
            />
        );
    }
}

/*

 */