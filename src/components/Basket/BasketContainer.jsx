import React from "react";
import Basket from "./Basket";
import DatePickerStore from "../../stores/PickerStore";
import { addProductsToBasket, updateProductCount } from "../../actions/external-actions";

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
        DatePickerStore.dispatch(addProductsToBasket(nextProps.basketProducts));
    }

    componentWillUnmount() {
        if(typeof this.state.unsubscribe === "function") {
            this.state.unsubscribe();
        }
    }

    onStoreUpdate() {
        this.setState({
            basketProducts : DatePickerStore.getState().basketTotals.basketProducts
        });
    }

    static onProductIncrease(name) {
        DatePickerStore.dispatch(updateProductCount({ name : name, add : true }));
        this.state.loadNewDates();
    }

    static onProductDecrease(name){
        DatePickerStore.dispatch(updateProductCount({ name : name, add : false }));
        this.state.loadNewDates();
    }


    render() {
        return(
            <Basket
                basketProducts={ this.state.basketProducts }
                loadNewDates={ this.state.loadNewDates }
                onProductIncrease = { BasketContainer.onProductIncrease }
                onProductDecrease = { BasketContainer.onProductDecrease }
            />
        );
    }

}

BasketContainer.defaultProps = {
    basketProducts : [],
    loadNewDates : function(){}
};

BasketContainer.propTypes = {
    basketProducts : React.PropTypes.array.isRequired,
    loadNewDates : React.PropTypes.func.isRequired
};