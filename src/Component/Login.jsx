import React, { Component } from 'react';
import './Styles/Styles.css';
import ajax from './AJAX';
const AJAX = new ajax();

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            pass: "",
            img: "images/sound-on.png"
        }
    }

    emailChange = (e) => {
        let mail = e.target.value;
        this.setState(() => {
            return { email: mail }
        })

    }

    passChange = (e) => {
        let pass = e.target.value;
        this.setState(() => {
            return { pass: pass }
        })

    }



    sub = (e) => {
        e.preventDefault();

        AJAX.Login(this.state.email, this.state.pass)
            .then((json) => {

                this.props.history.replace({
                    pathname: '/charselect',
                    state: {
                        email: this.state.email,
                        score: json.Score,
                        userName: json.Name
                    }
                })
            })
            .catch((err) => {
                alert(err);
            })


    }

    Register = () => {
        this.props.history.replace({
            pathname: '/register'
        })
    }
    imgChange = () => {
        if (this.state.img === "images/sound-on.png") {
            this.setState({ img: "images/sound-off.png" })
        }
        else
            this.setState({ img: "images/sound-on.png" })
    }

    render() {
        return (

            <section id="login">
                <div className="form">
                    <form onSubmit={this.sub} >
                        <input type="text" placeholder="E-mail" className="white" value={this.state.email} onChange={this.emailChange} />
                        <input type="password" placeholder="Password" value={this.state.pass} onChange={this.passChange} />
                        <input type="submit" value="Log-In" className="button" />
                        <input type="button" value="Register" className="button2" onClick={this.Register} />
                    </form>
                </div>
                <img src="images/sound-on.png" className="sound" alt="sound button" />
            </section>



        );
    }
}

