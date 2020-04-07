import React, { Component } from "react";

class Button extends Component {
    render() {
        return (
            <button
                className="guessing-button"
                value={this.props.value}
                onClick={this.props.onClick}
                children={this.props.value}
            />
        );
    }
}

export default Button;