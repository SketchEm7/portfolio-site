import React, {Component} from 'react';
import './App.scss';
import {BrowserRouter as Router, Route, Switch, Link, NavLink, Image} from 'react-router-dom'
import Home from './home.js';
import SteamGamesBarChart from './GamesViz/games.js';
import InstaFeed from './InstaFeed/instafeed';
import Pokedex from './Pokedex/pokedex';
import {
    Container,
    Icon,
    Menu,
    Sidebar,
    Responsive
} from "semantic-ui-react";
import WordCloud from './WordCloud/wordcloud';


class App extends Component {
    constructor () {
        super();
        this.state = {
            isHidden: true
        }
    }

    toggleHidden() {
        this.setState({
            isHidden: !this.state.isHidden
        });

        if(this.state.isHidden === true) {
            document.body.style.overflow = 'hidden';
            console.log(document);
            // document.body.getElementsByClassName('.parallax').style.opacity = '.3';
        } else {
            document.body.style.overflow = 'initial';
        }

    }


    render() {
        const Header = (props) => <ul>
            <li>
                <NavLink to="/" exact activeClassName="selected-navlink">Home</NavLink>
            </li>
            <li>
                <NavLink to="/api/steam-data-viz" activeClassName="selected-navlink">Steam Data Viz</NavLink>
            </li>
            <li>
                <NavLink to="/api/instafeed" activeClassName="selected-navlink">InstaFeed</NavLink>
            </li>
            <li>
                <NavLink to="/api/pokedex" activeClassName="selected-navlink">Pokedex</NavLink>
            </li>
            <li>
                <NavLink to="/api/wordcloud" activeClassName="selected-navlink">Word Cloud</NavLink>
            </li>
        </ul>;

        const MobileMenu = (props) => <Menu className={"mobile-menu"} pointing vertical>
            <li>
                <Menu.Item link><NavLink to="/" exact activeClassName="selected-navlink" onClick={this.toggleHidden.bind(this)}>Home</NavLink></Menu.Item>
            </li>
            <li>
                <Menu.Item link><NavLink to="/api/steam-data-viz" activeClassName="selected-navlink" onClick={this.toggleHidden.bind(this)}>Steam Data Viz</NavLink></Menu.Item>
            </li>
            <li>
                <Menu.Item link><NavLink to="/api/instafeed" activeClassName="selected-navlink" onClick={this.toggleHidden.bind(this)}>InstaFeed</NavLink></Menu.Item>
            </li>
            <li>
                <Menu.Item link><NavLink to="/api/pokedex" activeClassName="selected-navlink" onClick={this.toggleHidden.bind(this)}>Pokedex</NavLink></Menu.Item>
            </li>
            <li>
                <Menu.Item link><NavLink to="/api/wordcloud" activeClassName="selected-navlink" onClick={this.toggleHidden.bind(this)}>Word Cloud</NavLink></Menu.Item>
            </li>
        </Menu>;

        return (

                    <Router>
                        <React.Fragment>
                            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                                <header className={"header"}>
                                    <h2 className={"header-text"}>SketchEm93</h2>
                                    <Route className={"navigation"} path="/" component={Header}/>
                                </header>
                            </Responsive>
                            <Responsive {...Responsive.onlyMobile}>
                                <header className={"header"}>
                                    { this.state.isHidden ? <Icon onClick={this.toggleHidden.bind(this)} name={"sidebar"} className={`mobile-menu-icon ${!this.state.isHidden ? 'active-menu' : ''}`} size="large"/> : null }
                                    { !this.state.isHidden ? <Icon onClick={this.toggleHidden.bind(this)} name={"close"} className={`mobile-menu-icon ${!this.state.isHidden ? 'active-menu' : ''}`} size="large"/> : null }
                                    <h2 onClick={this.toggleHidden.bind(this)} className={"header-text"}>SketchEm93</h2>
                                </header>
                                { !this.state.isHidden ? <MobileMenu/> : null }
                            </Responsive>

                            <Switch>
                                <Route path="/api/wordcloud" component={WordCloud}/>
                                <Route path="/api/pokedex" component={Pokedex}/>
                                <Route path="/api/instafeed" component={InstaFeed}/>
                                <Route path="/api/steam-data-viz" component={SteamGamesBarChart}/>
                                <Route exact path="/" component={Home}/>
                            </Switch>
                        </React.Fragment>
                    </Router>

        )
    }
}


export default App;
