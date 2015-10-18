import React from "react";
import PickerContainer from "./Picker/PickerContainer";
import styles from "../styles/global";
import { getProducts } from "../utils/getConfig";

let config = {};

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            config : {}
        };
        getProducts().then(data => {
           config = data;
        });
    }

    passNewConfig() {
        this.setState({
           config : config
        });
    }

    render() {
        return(
            <div>
                <button
                    className="btn btn-primary"
                    onClick={ this.passNewConfig.bind(this) }>New config!
                </button>
                <PickerContainer config={this.state.config} />
            </div>
        );

    }

}

React.render(<App />, document.querySelector(".app-holder"));