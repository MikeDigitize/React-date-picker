import React from "react";
import PickerContainer from "./Picker/PickerContainer";
import styles from "../styles/global";
import { getData1, getData2 } from "../utils/getConfig";

let config;

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            config : {}
        };
        //Promise.all([getData1(), getData2()]).then(data => {
        //    config = data;
        //});
        getData1().then(data => {
            config = data;
        });
    }

    passNewConfig() {
        //var random = Math.floor(Math.random() * 2);
        //console.log("new", config[random], random);
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