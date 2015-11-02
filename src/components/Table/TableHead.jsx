import React from "react";
import CSSModule from "react-css-modules";
import styles from "./table-head-styles";


class TableHead extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableDisplayIndex : this.props.tableDisplayIndex,
            tableHeadData : this.props.tableHeadData
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            tableDisplayIndex : nextProps.tableDisplayIndex,
            tableHeadData : nextProps.tableHeadData
        });
    }

    createTableHeadRow() {
        return this.state.tableHeadData[this.state.tableDisplayIndex].map((txt, i) => {
            return (<th key={i}>{this.createTableHeadText(txt)}</th>);
        });
    }

    createTableHeadText(th) {
        return Object.keys(th).map((text, i) =>{
            return (<p key={i}>{ th[text] }</p>);
        });
    }

    render() {
        return (
            <thead styleName="date-picker-thead">
                <tr>
                    <th></th>
                    { this.createTableHeadRow() }
                </tr>
            </thead>
        );
    }

}

TableHead.defaultProps = {
    tableDisplayIndex : 0,
    tableHeadData : []
};

TableHead.propTypes = {
    tableDisplayIndex : React.PropTypes.number.isRequired,
    tableHeadData : React.PropTypes.arrayOf(React.PropTypes.array).isRequired
};

export default CSSModule(TableHead, styles);