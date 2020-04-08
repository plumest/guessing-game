import React, { Component } from "react";
import axios from 'axios';
import Button from "./Button";
import Guessed from "./Guessed";
import qs from 'querystring';
import './Guessing.css'

class Guessing extends Component {

    CONFIG = {headers: {'Content-Type': 'application/x-www-form-urlencoded'}};

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
        this.updateData = this.updateData.bind(this);
    }

    async componentDidMount() {
        let response = await axios.get("./api/guessing");
        let data = response.data;

        if (!data.length) {
            const request = await axios.post('./api/guessing/new');
            response = await axios.get("./api/guessing");
        }

        data = response.data[0];
        this.setState({
            id: data._id,
            guess: data.guess,
            answer: data.answer,
            nWrong: data.nWrong,
            isPlaying: (data.guess.length !== data.answer.length),
            isWinner: (data.guess.length === data.answer.length && data.guess.length)
        })
    }

    handleClick(char) {
        if (!this.state.isWinner) {
            if (this.state.isPlaying) {
                let index = this.state.answer.length;
                if (this.state.guess[index] === char) {
                    if (this.state.guess.length === this.state.answer.length + 1) {
                        this.setState({
                            answer: [...this.state.answer, char],
                            isWinner: true
                        }, () => this.updateData());
                    } else {
                        this.setState({answer: [...this.state.answer, char]}, () => this.updateData());
                    }
                } else {
                    this.setState({nWrong: this.state.nWrong + 1}, () => this.updateData())
                }
            } else {
                this.setState({guess: [...this.state.guess, char]}, () => this.updateData())
            }
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
            }, () => this.updateData()
            );
        } else {
            this.setState({isPlaying: !this.state.isPlaying})
        }
    }

    updateData() {
        let myData = {
            _id: this.state.id,
            guess: this.state.guess,
            answer: this.state.answer,
            nWrong: this.state.nWrong
        };
        axios.put(`./api/guessing/${this.state.id}`, qs.stringify(myData), this.CONFIG)
            .then(res => console.log(res.data)).catch(e => console.log(e))
    }

    render() {
        return (
            <div className="guessing">
                <div className="guessing-board">
                    <h1 className="guessing-title">Guessing Game</h1>
                    <h2 className="guessing-wins">{(this.state.isPlaying) ? "You Win!!" : ""}</h2>
                    <p className="guessing-score">
                        You wrong <span>{this.state.nWrong}</span> time{(this.state.nWrong) ? "s" : ""}
                    </p>
                </div>

                <div className="guessing-game">
                    <div className="guessing-upper-half">
                        <div>
                            <p>{(!this.state.isPlaying) ? "Hit some Characters" : ""}</p>
                        </div>
                        <div className="guessing-guesses">
                            {this.state.guess.map((char, index) => (
                                (index < this.state.answer.length) ?
                                    <Guessed key={index} value={char} isVisible={char === this.state.answer[index]} /> :
                                    <Guessed key={index} value={char} isVisible={false} />
                            ))
                            }
                        </div>
                    </div>

                    <div className="guessing-buttons">
                        {"ABCD".split("").map(char => (
                            <Button key={char} value={char} onClick={() => this.handleClick(char)} />
                        ))}
                    </div>

                    <button className="guessing-done btn" onClick={this.handleSubmit}>{(this.state.isPlaying) ? "Reset" : "Done"}</button>

                </div>
            </div>
        )
    }
}

export default Guessing;