import React from "react";
import PickerContainer from "./Picker/PickerContainer";
import TotalContainer from "./PriceComponents/TotalContainer";
import DiscountContainer from "./PriceComponents/DiscountContainer";
import BasketContainer from "./Basket/BasketContainer";
import ServiceContainer from "./PriceComponents/ServiceContainer";
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
        setTimeout(()=>{
            this.loadNewDates();
        }, 250)
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
                <ServiceContainer
                    description="Buy a care pack for your item(s)"
                    value={25}
                />
                <ServiceContainer
                    description="Remove your old appliances"
                    value={112}
                    />
                <DiscountContainer
                    threshold={100}
                    percentage={10}
                    name="10percentoff"
                />
                <DiscountContainer
                    threshold={5000}
                    value={50}
                    name="50quidoff"
                />
                <TotalContainer />
                <PickerContainer
                    config={this.state.config}
                />
            </div>
        );

    }

}

React.render(<App />, document.querySelector(".app-holder"));