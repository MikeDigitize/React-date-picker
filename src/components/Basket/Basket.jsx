import React from "react";
import CSSModule from "react-css-modules";
import styles from "./basket-styles";
import DatePickerStore from "../../stores/PickerStore";

class Basket extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            basketProducts : this.props.basketProducts
        };
    }

    componentWillReceiveProps(nextProps) {
    }

    increaseProductCount(){
        console.log("increases", arguments);
    }

    decreaseProductCount(){
        console.log("decreases", arguments);
    }

    render() {
        let basketProducts = this.state.basketProducts.map(product => {
            let name = product.name;
            return (
                <div styleName="basket-product">
                    <div styleName="basket-details">
                        <h3>{ product.name }</h3>
                        <h4>{ product.brand }</h4>
                        <p>Quanity: { product.quantity }</p>
                        <span styleName="increase" onClick={ this.increaseProductCount.bind(this, name)}>+</span>
                        <span styleName="decrease" onClick={ this.decreaseProductCount.bind(this, name)}>-</span>
                    </div>
                    <div styleName="basket-details">
                        <img src={ product.imageUrl } className="img-responsive" alt=""/>
                    </div>
                </div>
            );
        });
        return(
            <div styleName="basket">
                <h2 styleName="basket-title">Your basket</h2>
                <hr />
                { basketProducts }
            </div>
        );
    }

}

export default CSSModule(Basket, styles);