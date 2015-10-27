import React from "react";
import Discount from "./Discount";
import DatePickerStore from "../../stores/PickerStore";
import { subtractFromBasketTotal } from "../../actions/external-actions";
import { format } from "../../utils/cost-formatter";

export default class DiscountContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            threshold : this.props.threshold,
            percentage : this.props.percentage,
            value : this.props.value,
            basketProductsTotal : this.props.basketProducts.map(p => p.quantity * p.cost || 0).reduce((a,b) => format(a+b), 0),
            isActive : false
        };

        DatePickerStore.subscribe(this.onStoreUpdate.bind(this));
    }

    componentWillMount(){
        this.checkTotalForDiscountEligibility();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            basketProductsTotal : nextProps.basketProducts.map(p => p.quantity * p.cost || 0).reduce((a,b) => format(a+b), 0)
        });
    }

    onStoreUpdate() {
        this.setState({
            basketProductsTotal : DatePickerStore.getState().basketProducts.map(p => p.quantity * p.cost || 0).reduce((a,b) => format(a+b), 0)
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
        let total = this.state.basketProductsTotal;
        let threshold = this.state.threshold;
        console.log(total, threshold)
        let active = false;
        if(total >= threshold) {
            let discount = format(total / 100 * this.state.percentage);
            DatePickerStore.dispatch(subtractFromBasketTotal(discount));
            active = true;
        }
        this.setState({
            isActive : active
        });
    }

    valueDiscount() {
        let total = this.state.basketProductsTotal;
        let threshold = this.state.threshold;
        let active = false;
        if(total >= threshold) {
            let discount = format(total - this.state.value);
            DatePickerStore.dispatch(subtractFromBasketTotal(discount));
            active = true;
        }
        this.setState({
            isActive : active
        });
    }

    render(){
        return (
            <Discount
                threshold={ this.state.threshold }
                percentage={ this.state.percentage }
                value={ this.state.value }
                isActive={false}
            />
        );
    }
}