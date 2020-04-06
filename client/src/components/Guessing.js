import React, { Component } from "react";

class Guessing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            char: [],
            ans: [],
            n: 0
        }
    }

    async componentDidMount() {
        const response = await fetch('./api/guessing');
        const json = await response.json();
        // this.setState({
        //     name: json.name,
        //     char: json.char,
        //     ans: json.ans,
        //     n: json.n
        // })
        console.log(json);
    }


    render() {
        return (
            <div>
                {/*<p>name: {this.state.name}</p>*/}
                {/*<p>n: {this.state.n}</p>*/}
            </div>
        )
    }
}

export default Guessing;