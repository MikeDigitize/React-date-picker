import React from "react";
import PickerContainer from "./Picker/PickerContainer";
import Total from "./PriceComponents/Total";
import DiscountContainer from "./PriceComponents/DiscountContainer";
import BasketContainer from "./Basket/BasketContainer";
import DatePickerStore from "../stores/PickerStore";
import styles from "../styles/global";
import { getData1, getData2, getData3, getData4, getBasketProducts } from "../utils/getConfig";

let config;

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            config : {},
            basketProducts : []
        };
        Promise.all([getData1(), getData2(), getData3(), getData4()]).then(data => {
            config = data;
        });
        getBasketProducts().then(this.storeProductsInBasket.bind(this));
    }

    loadNewDates() {
        let random = Math.floor(Math.random() * 4);
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
                <BasketContainer
                    basketProducts={ this.state.basketProducts }
                    loadNewDates={ this.loadNewDates.bind(this) }
                />
                <Total />
                <DiscountContainer
                    threshold={100}
                    percentage={10}
                    name="10percentoff"
                />
            </div>
        );

    }

}

React.render(<App />, document.querySelector(".app-holder"));

/*
 <PickerContainer
 config={this.state.config}
 />
 <Total />

 />
 */