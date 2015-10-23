import React from "react";
import CSSModule from "react-css-modules";
import styles from "./description-styles";

class SameDayDesc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            desc : this.props.desc,
            time : this.props.time
        };
    }
    render() {
        return (
            <span>
                <p styleName="time-desc">{ this.state.desc }</p>
                <p styleName="time">{ this.state.time }</p>
                <p styleName="extra-info"></p>
            </span>
        );
    }
}

SameDayDesc.defaultProps = {
    desc : "",
    time : ""
};

SameDayDesc.propTypes = {
    desc : React.PropTypes.string.isRequired,
    time : React.PropTypes.string.isRequired
};

export default CSSModule(SameDayDesc, styles);