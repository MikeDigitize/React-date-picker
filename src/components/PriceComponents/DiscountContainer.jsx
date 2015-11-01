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

    componentWillMount(){
        DatePickerStore.dispatch(addDiscount(this.createDiscountStoreObject()));
    }

    componentWillUnmount() {
        if(typeof this.state.unsubscribe === "function") {
            this.state.unsubscribe();
        }
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

DiscountContainer.defaultProps = {
    name : "",
    threshold : 0,
    percentage : 0,
    value : 0
};

DiscountContainer.propTypes = {
    name : React.PropTypes.string.isRequired,
    threshold : React.PropTypes.number.isRequired,
    percentage : React.PropTypes.number,
    value : React.PropTypes.number,
};
