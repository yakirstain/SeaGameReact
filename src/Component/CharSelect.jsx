import React, { Component } from 'react';
import './Styles/Styles.css';

export default class CharSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleClick = (e) => {

        let target = e.target;

        this.setState((pervState) => {

            if (pervState.element !== target) {
                if (!target.classList.contains('imgPop')) {
                    target.classList.toggle('imgPop');
                }


                if (pervState.element !== undefined && pervState.element.classList.contains('imgPop')) {
                    pervState.element.classList.toggle('imgPop');
                    pervState.element.classList.toggle('imgPush');
                    setTimeout(() => {
                        pervState.element.classList.toggle('imgPush');
                    }, 1000);

                }
                return { element: target };
            }
          
        })
    }


Start = () =>{
    if(this.state.element !== undefined){
    this.props.history.replace({
        pathname: '/menu',
        state: {
            characterID: this.state.element.id,
            playerName: this.props.location.state.userName,
            email: this.props.location.state.email,
            score: this.props.location.state.score
        }
    });
}
}

    render() {

        return (

            <section id="player">
                <h1>SELECT YOUR PLAYER</h1>
                <div className="container">
                    <div className="select" onClick={this.handleClick}><img id="Yellow" src="images/fish1.png" alt='1'/></div>
                    <div className="select" onClick={this.handleClick}><img id="Orange"  src="images/fish2.png"  alt='2'/></div>
                    <div className="select" onClick={this.handleClick}><img id="Blue" src="images/fish3.png"  alt='3'/></div>
                    <div className="select" onClick={this.handleClick}><img id="Purple" src="images/fish4.png"  alt='4'/></div>
                </div>
                <a className="approve" onClick={this.Start}><img src="images/select.png" alt='confirm'/></a>
                
                <a className="back"  onClick={()=> {this.props.history.replace("/")}}><img src="images/back.png" alt='back'/></a>
            </section>
        )
    }
};
