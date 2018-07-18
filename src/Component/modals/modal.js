import React from 'react';


const modalStyle={
  backgroundColor:'#fff',
  borderRadius: 9,
  maxWidth: '80%',
  maxHeight: '70%',
  margin: '0 auto',
  alignSelf: 'center',
  padding: 30,
  position: 'absolute',
  top:'20%',
  left:0,
  bottom:0,
  right:0,
  opacity: 0.85
};


export default class modal extends React.Component {

  render() {
    if (!this.props.show)
    {
      return null;
    }
    return (
      <div style={modalStyle}>
         {this.props.children}
           </div>

    )
  }
};
