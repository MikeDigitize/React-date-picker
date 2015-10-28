import React from "react";
import Basket from "./Basket";
import DatePickerStore from "../../stores/PickerStore";
import { basketProducts, basketTotal, basketTotalIncDiscountsUpdate } from "../../actions/external-actions";

export default class BasketContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            basketProducts : this.props.basketProducts,
            loadNewDates : this.props.loadNewDates,
            unsubscribe : DatePickerStore.subscribe(this.onStoreUpdate.bind(this))
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            loadNewDates : nextProps.loadNewDates
        });
        DatePickerStore.dispatch(basketProducts(nextProps.basketProducts));
        DatePickerStore.dispatch(basketTotal(null));
        DatePickerStore.dispatch(basketTotalIncDiscountsUpdate(null));
    }

    onStoreUpdate() {
        this.setState({
            basketProducts : DatePickerStore.getState().basketTotals.basketProducts
        });
    }

    render() {
        return(
            <Basket basketProducts={this.state.basketProducts} loadNewDates={ this.state.loadNewDates }/>
        );
    }

}

BasketContainer.faultProps = {
    basketProducts : [],
    loadNewDates : function(){}
};

BasketContainer.propTypes = {
    basketProducts : React.PropTypes.array.isRequired,
    loadNewDates : React.PropTypes.func.isRequired
};

/*

 */