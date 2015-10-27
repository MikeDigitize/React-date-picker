import React from "react";
import PickerContainer from "./Picker/PickerContainer";
import Total from "./PriceComponents/Total";
import Discount from "./PriceComponents/Discount";
import BasketContainer from "./Basket/BasketContainer";
import DatePickerStore from "../stores/PickerStore";
import styles from "../styles/global";
import { basketProducts } from "../actions/external-actions";
import { getData1, getData2, getData3, getData4, getBasketProducts } from "../utils/getConfig";

let config;

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            config : {},
            basketProducts : []
        };
        Promise.all([getData1()]).then(data => {
            config = data;
        });
        getBasketProducts().then(this.storeProductsInBasket.bind(this));
    }

    passNewConfig() {
        let random = 0;/*Math.floor(Math.random() * 3);*/
        this.setState({
            config : config[random]
        });
    }

    storeProductsInBasket(data){
        this.setState({
            basketProducts : data.basketProducts
        });
    }

    render() {
        return(
            <div>
                <BasketContainer basketProducts={ this.state.basketProducts }/>
                <button
                    className="btn btn-primary get-new-config-btn"
                    onClick={ this.passNewConfig.bind(this) }>
                        New config!
                </button>
                <PickerContainer config={this.state.config} />
            </div>
        );

    }

}

React.render(<App />, document.querySelector(".app-holder"));