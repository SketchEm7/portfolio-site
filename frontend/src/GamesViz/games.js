import {Component} from "react";
import {select} from "d3-selection";
import axios from 'axios';
import steamLogo from "../assets/imgs/steam-logo-transparent.png";
import d3Logo from "../assets/imgs/d3.png";
import React from "react";
import styles from "./games.module.scss";
import cx from 'classnames';
import { Dropdown, Menu, Dimmer, Loader } from 'semantic-ui-react';

class SteamGamesBarChart extends Component {
    WIDTH = 500;
    height = 500;
    maxBarLength;

    constructor(props) {
        super(props);
        this.createBarChart = this.createBarChart.bind(this);
        this.state = {
            playedGames: null,
            steamId: null,
            personName: null,
            sortOrder: "greatestToLeast",
            loading: null,
        };

    }

    componentWillMount() {
        this.createBarChart();
    }

    windowResized() {
        this.createBarChart();
    }

    async componentDidMount() {
        this.setState({
            loading: true
        });
        const gamesResponse = await axios.get(`/games`);
        this.setState({
            playedGames: gamesResponse.data.games.filter(game => game.playtime_forever > 1),
            personName: gamesResponse.data.name,
            loading: false,
        });
        window.addEventListener("resize", this.windowResized.bind(this));
    }

    determineWindowSize() {
        this.maxBarLength = .72 * window.innerWidth;
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    handleSortOrderChange = (event, {value}) => {
        this.setState({
            sortOrder: value
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
        select("svg").selectAll("*").remove();
        this.determineWindowSize();
        if (this.state.playedGames) {

            const playedGames = this.state.playedGames;
            const timePlayed = playedGames.map(game => game.playtime_forever);
            const names = playedGames.map(game => game.name);
            const unit = timePlayed.map((tp, index) => [tp, names[index]]);

            if (this.state.sortOrder === "greatestToLeast") {
                unit.sort((a, b) => b[0] - a[0]);
            }

            if (this.state.sortOrder === "leastToGreatest") {
                unit.sort((a, b) => a[0] - b[0]);
            }

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

            if (this.maxBarLength > 1199) {

                select(node)
                    .selectAll('rect')
                    .data(unit)
                    .style('fill', '#519eec')
                    .attr('x', 0)
                    .attr('y', (d,i) => i * 55)
                    .attr('height', 45 - margin.top)
                    .attr('width',d => {
                        return this.maxBarLength * (d[0] / maxTimePlayed)
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

            } else {
                select(node)
                    .selectAll('rect')
                    .data(unit)
                    .style('fill', '#519eec')
                    .attr('x', 0)
                    .attr('y', (d,i) => i * 65 + 13)
                    .attr('height', 45 - margin.top)
                    .attr('width',d => {
                        return this.maxBarLength * (d[0] / maxTimePlayed)
                    });

                select(node)
                    .selectAll('text.labels')
                    .data(unit)
                    .enter()
                    .append('g')
                    .append('text')
                    .text(function(d) {
                        return d[1];
                    })
                    .attr('x', 0)
                    .attr('y', (d,i) => i * 65 + 15)
                    .attr('text-anchor', 'start')
                    .attr('fill', '#fff');

                select(node)
                    .selectAll('text.labels')
                    .data(unit)
                    .enter()
                    .append('g')
                    .append('text')
                    .text(function(d) {
                        return  Number(Math.round((d[0]/60) + 'e2') + 'e-2').toFixed(2) + ' ' + 'hrs';
                    })
                    .attr('x', 0)
                    .attr('y', (d,i) => i * 65 + 30)
                    .attr('text-anchor', 'start')
                    .attr('fill', '#fff');

            }
        }

    }

    render() {
        const gamesSVG = <svg ref={node => this.node = node} width={'72%'} height={this.state.playedGames ? this.state.playedGames.length * 65 : 0} className={styles.chart} />;
        const privateProfileWarning = <div  className={"desktop-containers-text undefined-msg"}>
                                        <h2 className={"undefined-msg-text"}>Something went wrong.</h2>
                                        <ul className={"undefined-msg-ul"}>
                                            <li className={"undefined-msg-li"}><span>&#8226;</span> Please make sure the steam profile and steam inventory you are tyring to view is set to public.</li>
                                            <li className={"undefined-msg-li"}><span>&#8226;</span> If you are sure the STEAM ID is connected to a public profile, then the STEAM API is probably down, please try again in 10 minutes</li>
                                        </ul>
                                    </div>;
        const LoadingMessage = (props) =>  <Dimmer active>
                                            <Loader size='massive'>Loading</Loader>
                                           </Dimmer>;
        let playedGamesContent = null;
        if (this.state.playedGames) {
            playedGamesContent = gamesSVG;
        } else {
            playedGamesContent = privateProfileWarning;
        }
        const SortOrderOptions = [
            { key: 1, text: 'Most played to least played', value: 'greatestToLeast' },
            { key: 2, text: 'Least played to most played', value: 'leastToGreatest' },
        ];
        const NameAndSort  =  <div className={styles['personName-container']}>
            <h1 className={cx(styles.personName)}>{this.state.personName}'s Steam Games Stats</h1>
            <div className={styles.dropdownContainer}>
                <Menu compact>
                    <Dropdown text="Sort Order" options={SortOrderOptions} simple item onChange={this.handleSortOrderChange} />
                </Menu>
            </div>
        </div>;
        const DisplaySort = this.state.playedGames ? NameAndSort : null;

        return (<div>
                    {this.state.loading ? <LoadingMessage/> :  <div className={styles.GameChart}>
                        <div className={"project-desc-container"}>
                            <h1 className={cx(styles.heading, "desktop-containers-text ")}>Steam API Data Viz</h1>
                            <p className="header-text desktop-containers-text">This project is a data visualization created using the D3 library and data provided from the Steam API. To see your stats please enter your Steam ID and click the load button. Please note your Steam Profile and Steam Inventory must be set to public for this visualization to work. (<a href={"https://support.steampowered.com/kb_article.php?ref=4113-YUDH-6401"} target={"blank"}>How to edit Steam Privacy Settings</a>)</p>
                            <br/>

                            <div className={"desktop-containers-text"}>
                                <input className={styles['steam-input']} aria-label={"steam-id"} placeholder="Steam ID" onChange={this.handleChange("steamId")}/>
                                <button onClick={this.loadSteamId} className={styles['input-btn']}>Load</button>
                            </div>
                            <p className="header-text desktop-containers-text helper-text"> Not sure what your Steam ID is? <a href={"https://steamid.io/"} target={"blank"}>https://steamid.io/</a></p>
                            <h3 className="header-text desktop-containers-text">Technologies Used</h3>
                            <div className="tech-used-box desktop-containers-text">
                                <div className="tech-logos-box">
                                    <img  className="tech-used-logo" src={steamLogo} alt={"steam-logo"}/>
                                    <img className="tech-used-logo" src={d3Logo} alt={"d3-library-logo"}/>
                                </div>
                            </div>
                        </div>
                        {DisplaySort}
                        {playedGamesContent}
                    </div> }
                </div>);
    }
}

export default SteamGamesBarChart;