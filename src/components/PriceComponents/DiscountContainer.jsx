import React from "react";
import Discount from "./Discount";
import DatePickerStore from "../../stores/PickerStore";
import { addDiscount } from "../../actions/external-actions";
import { format } from "../../utils/cost-formatter";

export default class DiscountContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name : this.props.name,
            threshold : this.props.threshold,
            percentage : this.props.percentage,
            value : this.props.value,
            isActive : false,
            unsubscribe : DatePickerStore.subscribe(this.onStoreUpdate.bind(this))
        };
    }

    componentWillUnmount() {
        if(typeof this.state.unsubscribe === "function") {
            this.state.unsubscribe();
        }
    }

    componentWillMount(){
        DatePickerStore.dispatch(addDiscount(this.createDiscountStoreObject()));
    }

    onStoreUpdate() {
        let isActive = DatePickerStore.getState().basketTotals.activeDiscounts.filter(discount => this.state.name === discount.name).reduce((d,e) => e.isActive, false);
        this.setState({
            isActive : isActive
        });
    }

    createDiscountStoreObject() {
        return {
            name : this.state.name,
            threshold : this.state.threshold,
            percentage : this.state.percentage,
            value : this.state.value,
            isActive : false
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