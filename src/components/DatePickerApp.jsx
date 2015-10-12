import React from "react";
import PickerContainer from "./Picker/PickerContainer";
import { config } from "../data/available-dates";

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            config : {}
        }
    }

    passNewConfig() {
        this.setState({
           config : config
        });
    }

    render() {
        console.log("render container!!");
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