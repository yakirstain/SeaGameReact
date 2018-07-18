import React, { Component } from "react";
import Player from "./Player";
import io from "socket.io-client";
import "./Styles/Styles.css";
import PopUP from "./PopUp";
import ajax from './AJAX';

const ip = "192.168.43.72";
const AJAX = new ajax();

let gameboard = null;
let player = {};
let score_tick = null;
export default class GameLogic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 100 + Math.random() * 100,
      y: 20 + Math.random() * 100,
      Players: {},
      showPop: false,
      score: 0
    };

    this.email = this.props.location.state.email;
    this.userName = this.props.location.state.playerName;
    this.avatar = this.props.location.state.characterID;
    this.HighScore = this.props.location.state.score;
    this.newScore = this.HighScore;

    this.socket = io(`${ip}:3001`);
    this.Players = {};

    player = {
      x: this.state.x,
      y: this.state.y,
      userName: this.userName,
      Eating: false,
      avatar: this.avatar
    };
    this.socket.emit("p.pos", JSON.stringify(player));
  }

  componentDidMount() {
    gameboard = document.getElementById("game");

    

    this.socket.on("p.pos", msg => {
      this.Players = {};
      let data = JSON.parse(msg);

      for (let ply of data) {
        if (ply.id === this.socket.id) {
          this.setState({
            x: ply.x,
            y: ply.y,
            angle: ply.angle
          });
        }
      }

      data = data.filter(ply => ply.id !== this.socket.id);

      data.forEach(ply => {
      
        this.Players[ply.id] = (
          <Player
            key={ply.id}
            angle={ply.angle}
            x={ply.x}
            y={ply.y}
            userName={ply.name}
            avatar={ply.avatar}
            eating = {ply.Eating}
          />
        );
      });
      this.setState({ Players: this.Players });
    });
    this.socket.on("p.dead", (dead_player) => {

      if (this.socket.id === dead_player) {
        AJAX.UpdateScore(this.email, this.state.score)    
        .then(res => {

          if(res> 0 )
          this.newScore = this.state.score;
        })    
        this.socket.emit("p.leave", "true");
        clearInterval(score_tick);
        this.setState({ showPop: true });
      }
    });

    this.socket.on("p.score", dead_player => {

      this.setState(pervState => {
        return {
          score: pervState.score + 50
        }
      });
    });

    score_tick = setInterval(() => {
      this.setState(pervState => {
        return {
          score: pervState.score + 1
        }
      });
    }, 1000);
  }

  closePop = () => {
    
    this.setState({ showPop: false }, () => {
      this.props.history.replace({
        pathname: "/menu",
        state: {
          characterID: this.avatar,
          playerName: this.userName,
          email: this.email,
          score: this.newScore
        }
      });
    });
  };

  exit = () =>{
    this.socket.emit("p.leave", "true");
    this.props.history.replace({
      pathname: "/menu",
      state: {
        characterID: this.avatar,
        playerName: this.userName,
        email: this.email,
        score: this.newScore
      }
    });
  }
  getPosition = e => {
    e.preventDefault();

    let x = e.type === "touchmove" ? e.targetTouches[0].pageX : e.pageX;
    let y = e.type === "touchmove" ? e.targetTouches[0].pageY : e.pageY;

    player.x = x;
    player.y = y;

    if (
      !(
        this.x > gameboard.clientWidth ||
        this.y > gameboard.clientHeight - 120 ||
        this.x < 50 ||
        this.y < 50
      ) &&
      !(
        this.state.x > gameboard.clientWidth ||
        this.state.y > gameboard.clientHeight - 120 ||
        this.state.x < 0 ||
        this.state.y < 0
      )
    ) {
      if (!this.state.showPop) {
        this.socket.emit("p.pos", JSON.stringify(player));
      }
    }
  };
  eat = () => {
    let interval;
    if(!player.Eating){

      interval = setInterval(()=>{

        this.setState((pervState)=>{
          return {opacity: pervState.opacity+0.007}
         })
        }, 32);
      this.setState({opacity: 0.2});
      player.Eating = true;
      this.socket.emit("p.eat", JSON.stringify({Eating: player.Eating}));
      setTimeout(()=>{
        clearInterval(interval);
      this.setState({opacity: 0.9})
        player.Eating = false;
        this.socket.emit("p.eat", JSON.stringify({Eating: player.Eating}));
      } , 2500)
    }
    
  };


  keyPress = (e) =>{
    if(e.charCode === 32){
      this.eat();
    }
  }

  render() {
    return (
      <section
        id="game"
        onTouchMove={this.getPosition}
        onMouseMove={this.getPosition}
        tabIndex={0} onKeyPress={this.keyPress}
      >
        <div className="btn_eat" onClick={this.eat} style={{opacity: this.state.opacity}} />
        {Object.values(this.state.Players)}

        <Player
          x={this.state.x}
          angle={this.state.angle}
          y={this.state.y}
          userName={this.userName}
          avatar={this.avatar}
          eating={player.Eating}
        />

        <a className="sound">
          <img src="images/soundexit.png" onClick={this.exit} alt='exit'/>
        </a>
        <h2>{this.state.score}</h2>

        {this.state.showPop ? (
          <PopUP
            closePopup={this.closePop}
            score={this.state.score}
            highScore={this.HighScore}
          />
        ) : null}
      </section>

    );
  }
}
