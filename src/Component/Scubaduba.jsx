import React, { Component } from 'react';

export default class Scubaduba extends Component {

    componentDidMount() {
        setTimeout(() => {

            this.props.history.replace({
                pathname: '/game',
                state: {
                    characterID: this.props.location.state.characterID,
                    playerName: this.props.location.state.playerName,
                    email: this.props.location.state.email,
                    score:this.props.location.state.score
                }
            });
        }, 6000);
    }
    render() {
        return (

            <section id="scubaduba">
                <div className="container">
                    <a className="title scobaduba">ScubaDuba</a>
                </div>

            </section>

        )
    }
};
