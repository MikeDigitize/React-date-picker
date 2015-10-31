import React from "react";
import DatePickerStore from "../../stores/PickerStore";
import Total from "./Total";
import { format } from "../../utils/cost-formatter";

export default class TotalContainer extends React.Component {
    constructor(){
        super();
        this.state = {
            basketTotal : DatePickerStore.getState().basketTotals.overallTotal,
            totalExcDiscount : DatePickerStore.getState().basketTotals.total,
            discountTotal : format(DatePickerStore.getState().basketTotals.total - DatePickerStore.getState().basketTotals.overallTotal),
            deliveryTotal : format(DatePickerStore.getState().tableData.selectedTimeslotData.charge || 0),
            unsubscribe : DatePickerStore.subscribe(this.onStoreUpdate.bind(this))
        };
    }

    componentWillUnmount() {
        if(typeof this.state.unsubscribe === "function") {
            this.state.unsubscribe();
        }
    }

    onStoreUpdate() {
        this.setState({
            basketTotal : DatePickerStore.getState().basketTotals.overallTotal,
            totalExcDiscount : DatePickerStore.getState().basketTotals.total,
            deliveryTotal : format(DatePickerStore.getState().tableData.selectedTimeslotData.charge || 0),
            discountTotal : format(DatePickerStore.getState().basketTotals.total - DatePickerStore.getState().basketTotals.overallTotal)
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