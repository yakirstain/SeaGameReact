import React, { Component } from "react";
import "./Styles/Styles.css";
import ajax from "./AJAX";
const AJAX = new ajax();

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: "/images/sound-on.png",
      nick: "",
      email: "",
      pass: ""
    };
  }

  Cancel = () => {
    this.props.history.replace({
      pathname: "/"
    });
  };

  onSubmit = e => {
    e.preventDefault();
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(String(this.state.email).toLowerCase())) {
      AJAX.register(this.state.email, this.state.pass, this.state.nick)
        .then(json => {
          this.props.history.replace({
            pathname: "/"
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      alert("invalid email");
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <section id="login">
        <div className="form">
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              placeholder="Nickname"
              name="nick"
              onChange={this.handleChange}
              value={this.state.nick}
            />
            <input
              type="password"
              placeholder="Password"
              name="pass"
              onChange={this.handleChange}
              value={this.state.pass}
            />
            <input
              type="text"
              placeholder="E-mail"
              name="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
            <div className="kaftor">
              <input type="submit" value="Register" className="register" />

              <input
                type="button"
                value="Cancel"
                className="cancel"
                onClick={this.Cancel}
              />
            </div>
          </form>
        </div>
        <img
          className="sound"
          onClick={this.imgChange}
          src={this.state.img}
          alt="sound"
        />
      </section>
    );
  }
}
