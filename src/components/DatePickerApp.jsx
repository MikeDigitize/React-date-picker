import React from "react";
import PickerContainer from "./Picker/PickerContainer";
import Total from "./PriceComponents/Total";
import Discount from "./PriceComponents/Discount";
import styles from "../styles/global";
import { getData1, getData2, getData3, getData4 } from "../utils/getConfig";

let config;

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            config : {}
        };
        Promise.all([getData1(), getData2(), getData3()]).then(data => {
            config = data;
        });
    }

    passNewConfig() {
        let random = Math.floor(Math.random() * 3);
        this.setState({
            config : config[random]
        });
    }

    render() {
        return(
            <div>
                <button
                    className="btn btn-primary get-new-config-btn"
                    onClick={ this.passNewConfig.bind(this) }>
                        New config!
                </button>
                <PickerContainer config={this.state.config} />
                <Total />
                <Discount />
            </div>
        );

    }

}

React.render(<App />, document.querySelector(".app-holder"));