import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Home from './Home';
import Fib from './Fib';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <p>
                            Edit <code>src/App.js</code> and save to reload.
                        </p>
                        <a className="App-link"
                           href="https://reactjs.org"
                           target="_blank"
                           rel="noopener noreferrer">
                            Learn React
                        </a>
                        <Link to='/'>Home</Link>
                        <Link to='/fibonacci'>Fibonacci calculator</Link>
                    </header>
                    <div>
                        <Route exact path='/fibonacci' component={Fib}/>
                        <Route exact path='/' component={Home}/>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
