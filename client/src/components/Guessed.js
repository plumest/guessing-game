import React, { Component } from "react";

class Guessed extends Component {
    static defaultProps = {
        value: "",
        isVisible: false
    };

    render() {
        return (
            <p className="guessing-char">
                {(this.props.isVisible) ? this.props.value : "_"}
            </p>
        );
    }
}

export default Guessed;