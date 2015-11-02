import React from "react";
import CSSModule from "react-css-modules";
import styles from "./picker-styles";

class Loading extends React.Component {
    render() {
        return(
            <p styleName="loading-message">LOADING...</p>
        );
    }
}

export default CSSModule(Loading, styles);