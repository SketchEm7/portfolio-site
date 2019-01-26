import {Component} from "react";
import {select} from "d3-selection";
import axios from 'axios';
import steamLogo from "../assets/imgs/steam-logo-transparent.png";
import d3Logo from "../assets/imgs/d3.png";
import React from "react";
import styles from "./games.module.scss";
import cx from 'classnames';

class SteamGamesBarChart extends Component {
    WIDTH = 500;
    height = 500;

    constructor(props) {
        super(props);
        this.createBarChart = this.createBarChart.bind(this);
        this.state = {
            playedGames: null,
            steamId: null,
            personName: null,
        };

    }

    async componentDidMount() {
        const gamesResponse = await axios.get(`/games`);
        this.setState({
            playedGames: gamesResponse.data.games.filter(game => game.playtime_forever > 1),
            personName: gamesResponse.data.name
        });
        this.createBarChart();
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    loadSteamId = async () => {
        const gamesResponse = await axios.get(`/games?steam_id=${ this.state.steamId }`);
        if (gamesResponse.data) {
            this.setState({
                playedGames: gamesResponse.data.games && gamesResponse.data.games.filter(game => game.playtime_forever > 1),
                personName: gamesResponse.data.name
            });
        }
        select("svg").selectAll("*").remove();
        this.createBarChart();
    };

    componentDidUpdate() {
        this.createBarChart();
    }

    createBarChart() {
        if (this.state.playedGames) {

            const playedGames = this.state.playedGames;
            const timePlayed = playedGames.map(game => game.playtime_forever);
            const names = playedGames.map(game => game.name);

            let unit = timePlayed.map((tp, index) => [tp, names[index]]).sort((a, b) => b[0] - a[0]);
            const maxTimePlayed = Math.max(...unit.map(u => u[0]));

            const node = this.node;
            const margin = ({top: 20, right: 0, bottom: 30, left: 40});


            select(node)
                .selectAll('rect')
                .data(unit)
                .enter()
                .append('g')
                .attr("transform", "translate(0 ," + margin.top + ")")
                .append('rect');

            select(node)
                .selectAll('rect')
                .data(unit)
                .exit()
                .remove();

            select(node)
                .selectAll('rect')
                .data(unit)
                .style('fill', '#4f9b94')
                .attr('x', 0)
                .attr('y', (d,i) => i * 55)
                .attr('height', 45 - margin.top)
                .attr('width',d => {
                    return 1000 * (d[0] / maxTimePlayed)
                });

            select(node)
                .selectAll('text.labels')
                .data(unit)
                .enter()
                .append('g')
                .append('text')
                .text(function(d) {
                    return d[1] + ' ' + ':' + ' ' + Number(Math.round((d[0]/60) + 'e2') + 'e-2').toFixed(2) + ' ' + 'hrs';
                })
                .attr('x', 0)
                .attr('y', (d,i) => i * 55 + 17)
                .attr('text-anchor', 'start')
                .attr('fill', '#fff');


        }

    }

    render() {
        const gamesSVG = <svg ref={node => this.node = node} width={1200} height={this.state.playedGames ? this.state.playedGames.length * 55 : 0} className={"chart"} />;
        const privateProfileWarning = <div  className={"desktop-containers-text undefined-msg"}>
                                        <h2 className={"undefined-msg-text"}>Something went wrong.</h2>
                                        <ul className={"undefined-msg-ul"}>
                                            <li className={"undefined-msg-li"}><span>&#8226;</span> Please make sure the steam profile you are tyring to view is set to public</li>
                                            <li className={"undefined-msg-li"}><span>&#8226;</span> If you are sure the STEAM ID is connected to a public profile, then the STEAM API is probably down, please try again in 10 minutes</li>
                                        </ul>
                                    </div>;
        const playedGamesContent = this.state.playedGames ? gamesSVG : privateProfileWarning;

        return (
            <div className="GameChart">
                <div className={"project-desc-container"}>
                    <h1 className={cx(styles.heading, "desktop-containers-text ")}>Steam API Data Viz</h1>
                    <p className="header-text desktop-containers-text">This project is a data visualization created using the D3 library and data provided from the Steam API. To see your stats please enter your Steam ID and click the load button. Please note your Steam Profile must be set to public for this visualization to work.</p>
                    <br/>
                    <p className="header-text desktop-containers-text"> Not sure what your Steam ID is? <a href={"https://steamid.io/"} target={"blank"}>https://steamid.io/</a></p>
                    <div className={"desktop-containers-text"}>
                        <input className={"steam-input"} aria-label={"steam-id"} placeholder="Steam ID" onChange={this.handleChange("steamId")}/>
                        <button onClick={this.loadSteamId} className="input-btn">Load</button>
                    </div>
                    <p className="header-text desktop-containers-text">Technologies Used</p>
                    <div className="tech-used-box desktop-containers-text">
                        <div className="tech-logos-box">
                            <img  className="tech-used-logo" src={steamLogo} alt={"steam-logo"}/>
                            <img className="tech-used-logo" src={d3Logo} alt={"d3-library-logo"}/>
                        </div>
                    </div>
                </div>
                <div className={"personName-container"}>
                    <h1 className={"personName desktop-containers-text"}>{this.state.personName}'s Steam Games Stats</h1>
                </div>
                {playedGamesContent}
            </div>
        );
    }
}

export default SteamGamesBarChart;