import React from "react";
import Basket from "./Basket";
import CheckoutStore from "../../stores/CheckoutStore";
import { addProductsToBasket, updateProductCount } from "../../actions/basket-totals-actions";

export default class BasketContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            basketProducts : this.props.basketProducts,
            loadNewDates : this.props.loadNewDates,
            onProductIncrease : this.onProductIncrease,
            onProductDecrease : this.onProductDecrease,
            unsubscribe : CheckoutStore.subscribe(this.onStoreUpdate.bind(this))
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            loadNewDates : nextProps.loadNewDates
        });
        CheckoutStore.dispatch(addProductsToBasket(nextProps.basketProducts));
    }

    componentWillUnmount() {
        if(typeof this.state.unsubscribe === "function") {
            this.state.unsubscribe();
        }
    }

    onStoreUpdate() {
        this.setState({
            basketProducts : CheckoutStore.getState().basketTotals.basketProducts
        });
    }

    onProductIncrease(name) {
        CheckoutStore.dispatch(updateProductCount({ name : name, add : true }));
        this.state.loadNewDates();
    }

    onProductDecrease(name){
        CheckoutStore.dispatch(updateProductCount({ name : name, add : false }));
        this.state.loadNewDates();
    }


    render() {
        return(
            <Basket
                basketProducts={ this.state.basketProducts }
                loadNewDates={ this.state.loadNewDates }
                onProductIncrease = { this.state.onProductIncrease }
                onProductDecrease = { this.state.onProductDecrease }
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