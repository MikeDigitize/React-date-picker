import React from "react";
import CheckoutStore from "../../stores/CheckoutStore";
import Total from "./Total";
import { format } from "../../utils/cost-formatter";

export default class TotalContainer extends React.Component {
    constructor(){
        super();
        this.state = {
            basketTotal : CheckoutStore.getState().basketTotals.overallTotal,
            totalExcDiscount : CheckoutStore.getState().basketTotals.total,
            discountTotal : format(CheckoutStore.getState().basketTotals.total - CheckoutStore.getState().basketTotals.overallTotal),
            deliveryTotal : format(CheckoutStore.getState().tableData.selectedTimeslotData.charge || 0),
            unsubscribe : CheckoutStore.subscribe(this.onStoreUpdate.bind(this))
        };
    }

    componentWillUnmount() {
        if(typeof this.state.unsubscribe === "function") {
            this.state.unsubscribe();
        }
    }

    onStoreUpdate() {
        this.setState({
            basketTotal : CheckoutStore.getState().basketTotals.overallTotal,
            totalExcDiscount : CheckoutStore.getState().basketTotals.total,
            deliveryTotal : format(CheckoutStore.getState().tableData.selectedTimeslotData.charge || 0),
            discountTotal : format(CheckoutStore.getState().basketTotals.total - CheckoutStore.getState().basketTotals.overallTotal)
        });
    }

    render() {
        return(
            <Total
                basketTotal={ this.state.basketTotal }
                totalExcDiscount={ this.state.totalExcDiscount }
                discountTotal={ this.state.discountTotal }
                deliveryTotal={ this.state.deliveryTotal }
            />
        );
    }
}