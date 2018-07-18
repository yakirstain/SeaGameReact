import React, { Component } from 'react';

const radius = 30;


export default class Player extends Component {



    
    constructor(props){
        super(props);
        this.state = {
            x: this.props.x,
            y: this.props.x
        }

        this.avatar = `/images/SVG/${this.props.avatar}.svg`;
        this.update =null;
    }



componentWillUnmount(){
    clearInterval(this.update);
}


  render() {
    return (
            // moving the player using css left and top
            <div className='players' style={ {left: this.props.x - radius, top: this.props.y + radius, position:'absolute', transform: 'translate(0px, -50px) '} }>
                <img alt='' id = 'player' srcSet={this.avatar} style={ {width: 50,transform: `rotate(${( (this.props.angle * 180) / Math.PI) + 90}deg)` } }/>
               {this.props.eating ? 
                    <div className='shield'/>
                    :
                    null
                }
            </div>
        
    )
  }
};
