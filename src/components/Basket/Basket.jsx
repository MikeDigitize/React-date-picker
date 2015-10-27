import React from "react";
import CSSModule from "react-css-modules";
import styles from "./basket-styles";
import DatePickerStore from "../../stores/PickerStore";
import { basketProducts } from "../../actions/external-actions";

class Basket extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            basketProducts : this.props.basketProducts
        };
        DatePickerStore.dispatch(basketProducts(this.props.basketProducts));
        DatePickerStore.subscribe(this.onStoreUpdate.bind(this));
    }

    onStoreUpdate() {
        console.log(DatePickerStore.getState().basketProducts);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ basketProducts : nextProps.basketProducts });
        DatePickerStore.dispatch(basketProducts(nextProps.basketProducts));
    }

    increaseProductCount(name){
        let index;
        this.state.basketProducts.forEach((product,i) => {
           if(product.name === name) {
               index = i;
           }
        });
        let product = this.state.basketProducts[index];
        product.quantity++;
        let products = [...this.state.basketProducts];
        this.setState({
            basketProducts : products
        });
        DatePickerStore.dispatch(basketProducts(products));
    }

    decreaseProductCount(name){
        let index;
        this.state.basketProducts.forEach((product,i) => {
            if(product.name === name) {
                index = i;
            }
        });
        let product = this.state.basketProducts[index];
        if(product.quantity > 0) {
            product.quantity--;
        }
        let products = [...this.state.basketProducts];
        this.setState({
            basketProducts : products
        });
        DatePickerStore.dispatch(basketProducts(products));
    }

    createBasketMarkup(){
        return this.state.basketProducts.map((product, i) => {
            let name = product.name;
            return (
                <div styleName="basket-product" key={i}>
                    <div styleName="basket-details">
                        <h3>{ product.name }</h3>
                        <h4>{ product.brand }</h4>
                        <p>Quanity: { product.quantity }</p>
                        <p>Price: &pound;{ product.cost }</p>
                        <p>Total: &pound;{ Number((product.cost * product.quantity).toFixed(2)) }</p>
                        <span styleName="increase" onClick={ this.increaseProductCount.bind(this, name)}>+</span>
                        <span styleName="decrease" onClick={ this.decreaseProductCount.bind(this, name)}>-</span>
                    </div>
                    <div styleName="basket-details">
                        <img src={ product.imageUrl } className="img-responsive" alt=""/>
                    </div>
                </div>
            );
        });
    }

    render() {
        return(
            <div styleName="basket">
                <h2 styleName="basket-title">Your basket</h2>
                <hr />
                { this.createBasketMarkup() }
            </div>
        );
    }

}

export default CSSModule(Basket, styles);