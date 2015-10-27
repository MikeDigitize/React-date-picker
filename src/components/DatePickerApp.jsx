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

    loadNewDates() {
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
                <BasketContainer basketProducts={ this.state.basketProducts } loadNewDates={ this.loadNewDates.bind(this) }/>
                <PickerContainer config={this.state.config} />
                <Total />
            </div>
        );

    }

}

React.render(<App />, document.querySelector(".app-holder"));