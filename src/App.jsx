import React, { Component } from 'react';
import Login from './Component/Login';
import Register from './Component/Register';
import CharSelect from './Component/CharSelect';
import Game from './Component/GameLogic';
import Menu from './Component/Menu';
import {BrowserRouter , Route} from 'react-router-dom';
import Intro from './Component/Scubaduba';

class App extends Component {



  render() {
    return (
        <BrowserRouter>
            <div>
              <Route exact path='/' component={Login}/>
              <Route path ='/register' component={Register} />
              <Route path='/charselect' component={CharSelect}/>
              <Route path='/menu' component={Menu}/>
              <Route path='/intro' component={Intro}/>
              <Route path='/game' component={Game}/>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
