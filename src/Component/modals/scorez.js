import React from 'react';

const backdropStyle = {
    position: 'absolute',
    backgroundClose: 'rgba(0,0,0,1)',
    padding: 10,
    opacity: 0.3,
};
const modalStyle = {
    backgroundColor: '#fff',
    borderRadius: 9,
    maxWidth: 950,
    minHeight: 500,
    margin: '0 auto',
    padding: 30,
    position: 'static'
};


export default class scorez extends React.Component {

    render() {
        if (!this.props.showScore) {
            return null;
        }
        return (
            <div style={backdropStyle}>
                <div style={modalStyle}>
                    {this.props.children}
                </div>
            </div>
        )
    }
};
