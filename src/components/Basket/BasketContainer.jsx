import React from "react";
import Basket from "./Basket";
import DatePickerStore from "../../stores/PickerStore";

export default class BasketContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            basketProducts : this.props.basketProducts,
            loadNewDates : this.props.loadNewDates
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ basketProducts : nextProps.basketProducts, loadNewDates : nextProps.loadNewDates });
    }

    render() {
        return(<Basket basketProducts={this.state.basketProducts} loadNewDates={ this.state.loadNewDates }/>);
    }

}

BasketContainer.faultProps = {
    basketProducts : [],
    loadNewDates : function(){}
};

BasketContainer.propTypes = {
    basketProducts : React.PropTypes.array.isRequired,
    loadNewDates : React.PropTypes.func.isRequired
};