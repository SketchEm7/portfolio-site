import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Link, NavLink} from 'react-router-dom'
import SteamGamesBarChart from './games.js';
import ToDrawApp from './toDrawApp.js';
import steamVizImg from "./assets/imgs/steam-viz-screenshot.png";
import steamLogo from "./assets/imgs/steam-logo-transparent.png";

class App extends Component {

    render() {
        const Header = (props) => <ul>
            <li>
                <NavLink to="/" activeClassName="selected-navlink">Home</NavLink>
            </li>
            <li>
                <NavLink to="/steam-data-viz" activeClassName="selected-navlink">Steam Data Viz</NavLink>
            </li>
            <li>
                <NavLink to="/todraw-app" activeClassName="selected-navlink">ToDraw App</NavLink>
            </li>
        </ul>;

        const MainPage = (props) =>  <div>
            {/*<ul id="categories" className="clr">*/}
                {/*<li className="pusher"></li>*/}
                {/*<li>*/}
                    {/*/!*<NavLink to="/steam-data-viz" activeClassName="selected-navlink">Steam Data Viz</NavLink>*!/*/}
                    {/*<div>*/}
                        {/*<img src={steamLogo} alt="project-preview"/>*/}
                        {/*<a href="#">*/}
                        {/*<h1>Steam Data Viz</h1>*/}
                        {/*</a>*/}
                        {/*<p>A data visualization project using the Steam API and D3</p>*/}
                    {/*</div>*/}
                {/*</li>*/}
                {/*<li>*/}
                    {/*<div>*/}
                        {/*<img src="https://farm8.staticflickr.com/7187/6895047173_d4b1a0d798.jpg" alt=""/>*/}
                        {/*<h1>This is a title</h1>*/}
                        {/*<p>Some sample text about the article this hexagon leads to</p>*/}
                    {/*</div>*/}
                {/*</li>*/}
                {/*<li>*/}
                    {/*<div>*/}
                        {/*<img src="https://farm4.staticflickr.com/3766/12953056854_b8cdf14f21.jpg" alt=""/>*/}
                        {/*<h1>This is a title</h1>*/}
                        {/*<p>Some sample text about the article this hexagon leads to</p>*/}
                    {/*</div>*/}
                {/*</li>*/}
                {/*<li>*/}
                    {/*<div>*/}
                        {/*<img src="https://farm7.staticflickr.com/6139/5986939269_10721b8017.jpg" alt=""/>*/}
                        {/*<h1>This is a title</h1>*/}
                        {/*<p>Some sample text about the article this hexagon leads to</p>*/}
                    {/*</div>*/}
                {/*</li>*/}
                {/*<li>*/}
                    {/*<div>*/}
                        {/*<img src="https://farm4.staticflickr.com/3165/5733278274_2626612c70.jpg" alt=""/>*/}
                        {/*<h1>This is a title</h1>*/}
                        {/*<p>Some sample text about the article this hexagon leads to</p>*/}
                    {/*</div>*/}
                {/*</li>*/}

            {/*</ul>*/}
            <svg className={"hex-pattern"} width="100%" height="100vh" >
                <pattern id="pattern-hex" x="0" y="0" width="112" height="190" patternUnits="userSpaceOnUse" viewBox="56 -254 112 190">

                    <g id="hexagon">
                        <path d="M168-127.1c0.5,0,1,0.1,1.3,0.3l53.4,30.5c0.7,0.4,1.3,1.4,1.3,2.2v61c0,0.8-0.6,1.8-1.3,2.2L169.3-0.3
			c-0.7,0.4-1.9,0.4-2.6,0l-53.4-30.5c-0.7-0.4-1.3-1.4-1.3-2.2v-61c0-0.8,0.6-1.8,1.3-2.2l53.4-30.5C167-127,167.5-127.1,168-127.1
			L168-127.1z"/>
                        <path d="M112-222.5c0.5,0,1,0.1,1.3,0.3l53.4,30.5c0.7,0.4,1.3,1.4,1.3,2.2v61c0,0.8-0.6,1.8-1.3,2.2l-53.4,30.5
			c-0.7,0.4-1.9,0.4-2.6,0l-53.4-30.5c-0.7-0.4-1.3-1.4-1.3-2.2v-61c0-0.8,0.6-1.8,1.3-2.2l53.4-30.5
			C111-222.4,111.5-222.5,112-222.5L112-222.5z"/>
                        <path d="M168-317.8c0.5,0,1,0.1,1.3,0.3l53.4,30.5c0.7,0.4,1.3,1.4,1.3,2.2v61c0,0.8-0.6,1.8-1.3,2.2L169.3-191
			c-0.7,0.4-1.9,0.4-2.6,0l-53.4-30.5c-0.7-0.4-1.3-1.4-1.3-2.2v-61c0-0.8,0.6-1.8,1.3-2.2l53.4-30.5
			C167-317.7,167.5-317.8,168-317.8L168-317.8z"/>
                    </g>

                </pattern>


                <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-hex)" />

            </svg>
        </div>


        return (

                <div>
                    <Router>
                        <React.Fragment>
                            <div className={"header"}>
                                <h1 className={"header-text"}>Portfolio Site</h1>
                                <Route className={"navigation"} path="/" component={Header}/>
                            </div>

                            <Switch>
                                <Route path="/" exact render={() => <MainPage/>}/>
                                <Route path="/steam-data-viz" component={SteamGamesBarChart}/>
                                <Route path="/todraw-app" component={ToDrawApp}/>
                            </Switch>
                        </React.Fragment>
                    </Router>
                </div>


        )
    }
}


export default App;
