import React from "react";
import CSSModule from "react-css-modules";
import styles from "./basket-styles";
import CheckoutStore from "../../stores/CheckoutStore";
import { addToBasket, updateProductCount } from "../../actions/basket-totals-actions";
import { format } from "../../utils/cost-formatter";

class Basket extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            basketProducts : this.props.basketProducts,
            onProductIncrease : this.props.onProductIncrease,
            onProductDecrease : this.props.onProductDecrease,
            loadNewDates : this.props.loadNewDates
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ basketProducts : nextProps.basketProducts });
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
                        <p>Total: &pound;{ format(product.cost * product.quantity) }</p>
                        <span styleName="increase" onClick={ this.state.onProductIncrease.bind(this, name)}>+</span>
                        <span styleName="decrease" onClick={ this.state.onProductDecrease.bind(this, name)}>-</span>
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
                { this.createBasketMarkup() }
            </div>
        );
    }

}

Basket.defaultProps = {
    basketProducts : [],
    onProductIncrease : function(){},
    onProductDecrease : function(){},
    loadNewDates : function(){}
};

Basket.propTypes = {
    basketProducts : React.PropTypes.array.isRequired,
    onProductIncrease : React.PropTypes.func.isRequired,
    onProductDecrease : React.PropTypes.func.isRequired,
    loadNewDates : React.PropTypes.func.isRequired
};

export default CSSModule(Basket, styles);