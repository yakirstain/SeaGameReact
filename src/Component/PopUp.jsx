import React, { Component } from "react";
import './Styles/Styles.css';

export default class PopUp extends Component {
  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
            <h1>YOU DIED!</h1>
            <p>current score: {this.props.score}</p>
            <p>highest score: {this.props.highScore}</p>
            {this.props.score > this.props.highScore ? 
                <h6>NEW HIGH SCORE!</h6>
                :
                null
            }
            <span id = "button" onClick={this.props.closePopup}>Ok</span>
        </div>
      </div>
    );
  }
}
