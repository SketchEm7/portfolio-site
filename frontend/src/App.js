import React, {Component} from 'react';
import './App.scss';
import {BrowserRouter as Router, Route, Switch, Link, NavLink, Image} from 'react-router-dom'
import Home from './home.js';
import SteamGamesBarChart from './GamesViz/games.js';
import GameReviews from './GameReviews/gameReviews';
import ToDrawApp from './ToDrawApp/toDrawApp.js';
import InstaFeed from './InstaFeed/instafeed';
import Pokedex from './Pokedex/pokedex';
import {
    Container,
    Icon,
    Menu,
    Sidebar,
    Responsive
} from "semantic-ui-react";


class App extends Component {

    render() {
        const Header = (props) => <ul>
            <li>
                <NavLink to="/" exact activeClassName="selected-navlink">Home</NavLink>
            </li>
            <li>
                <NavLink to="/steam-data-viz" activeClassName="selected-navlink">Steam Data Viz</NavLink>
            </li>
            <li>
                <NavLink to="/game-reviews" activeClassName="selected-navlink">Game Reviews</NavLink>
            </li>
            <li>
                <NavLink to="/todraw-app" activeClassName="selected-navlink">ToDraw App</NavLink>
            </li>
            <li>
                <NavLink to="/instafeed" activeClassName="selected-navlink">InstaFeed</NavLink>
            </li>
            <li>
                <NavLink to="/pokedex" activeClassName="selected-navlink">Pokedex</NavLink>
            </li>
        </ul>;

        return (

                    <Router>
                        <React.Fragment>
                            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                                <header className={"header"}>
                                    <h1 className={"header-text"}>SketchEm93</h1>
                                    <Route className={"navigation"} path="/" component={Header}/>
                                </header>
                            </Responsive>
                            <Responsive {...Responsive.onlyMobile}>
                                <div className={"basicBar"}>

                                </div>
                            </Responsive>
                            <Responsive {...Responsive.onlyMobile}>
                                <Menu className={"mobile-menu"} pointing vertical>
                                    <li>
                                        <Menu.Item link><NavLink to="/" exact activeClassName="selected-navlink">Home</NavLink></Menu.Item>
                                    </li>
                                    <li>
                                        <Menu.Item link><NavLink to="/steam-data-viz" activeClassName="selected-navlink">Steam Data Viz</NavLink></Menu.Item>
                                    </li>
                                    <li>
                                        <Menu.Item link><NavLink to="/game-reviews" activeClassName="selected-navlink">Game Reviews</NavLink></Menu.Item>
                                    </li>
                                    <li>
                                        <Menu.Item link><NavLink to="/todraw-app" activeClassName="selected-navlink">ToDraw App</NavLink></Menu.Item>
                                    </li>
                                    <li>
                                        <Menu.Item link><NavLink to="/instafeed" activeClassName="selected-navlink">InstaFeed</NavLink></Menu.Item>
                                    </li>
                                    <li>
                                        <Menu.Item link><NavLink to="/pokedex" activeClassName="selected-navlink">Pokedex</NavLink></Menu.Item>
                                    </li>
                                </Menu>
                            </Responsive>

                            <Switch>
                                <Route path="/instafeed" component={InstaFeed}/>
                                <Route path="/pokedex" component={Pokedex}/>
                                <Route path="/game-reviews" component={GameReviews}/>
                                <Route path="/steam-data-viz" component={SteamGamesBarChart}/>
                                <Route path="/todraw-app" component={ToDrawApp}/>
                                <Route exact path="/" component={Home}/>
                            </Switch>
                        </React.Fragment>
                    </Router>

        )
    }
}


export default App;
