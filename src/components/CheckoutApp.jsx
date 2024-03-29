import React from "react";
import PickerContainer from "./Picker/PickerContainer";
import TotalContainer from "./PriceComponents/TotalContainer";
import DiscountContainer from "./PriceComponents/DiscountContainer";
import BasketContainer from "./Basket/BasketContainer";
import ServiceContainer from "./PriceComponents/ServiceContainer";
import CheckoutStore from "../stores/CheckoutStore";
import styles from "../styles/global";
import { getData1, getData2, getData3, getBasketProducts } from "../utils/getConfig";

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            config : {},
            basketProducts : [],
            data : []
        };
        Promise.all([getData1(), getData2(), getData3()]).then(data => {
            this.setState({
                data : data
            }, ()=> {
                this.loadNewDates();
            });
        });
        getBasketProducts().then(this.storeProductsInBasket.bind(this));

    }

    loadNewDates() {
        let random = Math.floor(Math.random() * this.state.data.length);
        this.setState({
            config : this.state.data[random]
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
                    threshold={10000}
                    percentage={50}
                    name="50percentoff"
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