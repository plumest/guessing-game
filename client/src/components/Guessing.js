import React, { Component } from "react";
import axios from 'axios';
import Button from "./Button";
import Guessed from "./Guessed";

class Guessing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guess: [],
            answer: [],
            nWrong: 0,
            isPlaying: false,
            isWinner: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // axios.post("./api/guessing/new", {
        //     guess: ['A', 'B', 'C'],
        //     answer: [],
        //     nWrong: 0
        // })
        //     .then(res => console.log(res))
        //     .catch(e => console.log(e));
    }

    async componentDidMount() {
        let response = await axios.get("./api/guessing");
        let data = response.data[0];
        console.log(data);
        this.setState({
            guess: data.guess,
            answer: data.answer,
            nWrong: data.nWrong,
            isPlaying: true
        })
    }

    handleClick(char) {
        if (this.state.isPlaying) {
            let index = this.state.answer.length;
            if (this.state.guess[index] === char) {
                if (this.state.guess.length === this.state.answer.length + 1) {
                    this.setState({
                        answer: [...this.state.answer, char],
                        isWinner: !this.state.isWinner
                    });
                } else {
                    this.setState({answer: [...this.state.answer, char]});
                }
            } else {
                this.setState({nWrong: this.state.nWrong + 1})
            }
        } else {
            this.setState({guess: [...this.state.guess, char]})
        }
    }

    handleSubmit() {
        if (this.state.isPlaying) {
            this.setState({
                guess: [],
                answer: [],
                nWrong: 0,
                isPlaying: !this.state.isPlaying,
                isWinner: false
            });
        } else {
            this.setState({isPlaying: !this.state.isPlaying})
        }
    }

    render() {
        return (
            <div className="guessing">
                <h1 className="guessing-title">Guessing Game</h1>
                <h2>{(this.state.isWinner) ? "You Win!!" : ""}</h2>
                <div className="guessing-guessed">
                    {this.state.guess.map((char, index) => (
                        (index < this.state.answer.length) ?
                            <Guessed key={index} value={char} isVisible={char === this.state.answer[index]} /> :
                            <Guessed key={index} value={char} isVisible={false} />
                        ))
                    }
                </div>

                <p className="guessing-score">{this.state.nWrong}</p>

                <div className="guessing-buttons">
                    {"ABCD".split("").map(char => (
                        <Button key={char} value={char} onClick={() => this.handleClick(char)} />
                    ))}
                </div>

                <button onClick={this.handleSubmit}>{this.state.isPlaying ? "Reset" : "Done"}</button>

            </div>
        )
    }
}

export default Guessing;