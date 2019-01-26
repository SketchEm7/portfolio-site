import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Link, NavLink} from 'react-router-dom'
import SteamGamesBarChart from './games.js';
import ToDrawApp from './toDrawApp.js';
import Home from './home.js';

class App extends Component {

    render() {
        const Header = (props) => <ul>
            <li>
                <NavLink exact={"/"} to="/" activeClassName="selected-navlink">Home</NavLink>
            </li>
            <li>
                <NavLink to="/steam-data-viz" activeClassName="selected-navlink">Steam Data Viz</NavLink>
            </li>
            <li>
                <NavLink to="/todraw-app" activeClassName="selected-navlink">ToDraw App</NavLink>
            </li>
        </ul>;

        return (

                <div>
                    <Router>
                        <React.Fragment>
                            <div className={"header"}>
                                <h1 className={"header-text"}>SketchEm93</h1>
                                <Route className={"navigation"} path="/" component={Header}/>
                            </div>

                            <Switch>
                                <Route path="/steam-data-viz" component={SteamGamesBarChart}/>
                                <Route path="/todraw-app" component={ToDrawApp}/>
                                <Route exact path="/" component={Home}/>
                            </Switch>
                        </React.Fragment>
                    </Router>
                </div>


        )
    }
}


export default App;
