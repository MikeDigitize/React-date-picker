import React from "react";
import Discount from "./Discount";
import DatePickerStore from "../../stores/PickerStore";
import { subtractFromBasketTotal, addToBasketDiscounts, basketTotalIncDiscountsUpdate } from "../../actions/external-actions";
import { format } from "../../utils/cost-formatter";

export default class DiscountContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            threshold : this.props.threshold,
            percentage : this.props.percentage,
            value : this.props.value,
            basketTotal : DatePickerStore.getState().basketTotals.totalIncDiscounts,
            isActive : false,
            discount : {
                name : this.props.name,
                total : 0
            }
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
        let discount = 0;
        console.log("total", total);
        if(total >= threshold) {
            discount = total / 100 * this.state.percentage;
            active = true;
        }

        this.setState({
            isActive : active,
            discount : Object.assign({}, this.state.discount, { total : discount })
        }, ()=> {
            if(active && !prevState.isActive) {
                DatePickerStore.dispatch(addToBasketDiscounts(this.state.discount));
                DatePickerStore.dispatch(basketTotalIncDiscountsUpdate(null));
            }
        });

    }

    valueDiscount() {
        let total = this.state.basketTotal;
        let threshold = this.state.threshold;
        let active = false;
        if(total >= threshold) {
            let discount = format(total - this.state.value);
            active = true;
        }
        this.setState({
            isActive : active
        });
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