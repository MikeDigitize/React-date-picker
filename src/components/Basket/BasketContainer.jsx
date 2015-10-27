import React from "react";
import Basket from "./Basket";
import DatePickerStore from "../../stores/PickerStore";

export default class BasketContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            basketProducts : this.props.basketProducts
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ basketProducts : nextProps.basketProducts })
    }

    render() {
        return(<Basket basketProducts={this.state.basketProducts}/>);
    }

}