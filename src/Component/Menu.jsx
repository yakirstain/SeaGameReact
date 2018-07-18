import React, { Component } from 'react';
import Modal from './modals/modal';
import ajax from './AJAX';
import './Styles/Styles.css';
const AJAX = new ajax();

export default class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            Score:[]
        }
    }
Start = () =>{
    this.props.history.replace({
        pathname: '/intro',
        state: {
            characterID: this.props.location.state.characterID,
            playerName: this.props.location.state.playerName,
            email: this.props.location.state.email,
            score: this.props.location.state.score
        }
    });
}
Back = () => {
    this.props.history.replace({
        pathname: '/charselect',
        state: {
            userName: this.props.location.state.playerName,
            email: this.props.location.state.email,
            score: this.props.location.state.score
        }
    })
}
    showModal = () => {
        this.setState({show: !this.state.show}, ()=>{
            if(this.state.show)
            {

                AJAX.GetHighScore()
                    .then((json) => {
                        let Score = json.map((user) => {
                            return <div> 
                                <div>
                                    
                                    <table style={{borderCollapse: 'collapse'}}>
                                        <tr>
                                            <th >ID</th>
                                            <th>Name</th>
                                            <th>Highest Score</th>
                                        </tr>
                                        <tr>
                                            <td>{user.User_Id}</td>
                                             <td>{user.User_Name}</td>
                                             <td>{user.High_Score}</td>
                                        </tr>
                                    </table>
                                </div>

                                </div>
                                 })
                  this.setState({Score})
                    
                    })
                    .catch((err) => {
                        alert(err);
                    })
            }
        });
    }
    render() {
        return (
            <div>


            <section id="start">
              
                <a className="back" onClick={this.Back}><img src="images/back.png" alt='back' /></a>
                <div className="container">
                    <a className="startgame" onClick={this.Start}>START GAME</a>
                    <a className="chart" onClick={this.showModal}><img src="images/chart.png" alt='scoreboard'/></a>
                    <a className="exit" onClick={ ()=> {this.props.history.replace("/")}}><img src="images/exit.png" alt='exit'/></a>
          
                </div>

            </section>
                <Modal show={this.state.show}  >
                    {this.state.Score}
                    </Modal> 
            </div>
        )
    }
};
