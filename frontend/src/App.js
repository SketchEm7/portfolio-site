import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { scaleLinear, scaleBand } from 'd3-scale';
import { max } from  'd3-array';
import { select } from 'd3-selection';
import { axisLeft, axisBottom } from 'd3-axis';
import { format } from 'd3-format'

class App extends Component {

    render() {
       return <SteamGamesBarChart />
    }
}

class SteamGamesBarChart extends Component {
    WIDTH = 500;
    height = 500;
    constructor(props) {
        super(props);
        this.createBarChart = this.createBarChart.bind(this);
        this.state = {
            gameData: null
        };
    }

    async componentDidMount() {
        const gamesResponse = await axios.get("/games");
        this.setState({
            gameData: gamesResponse.data
        });
        this.createBarChart();
    }

    componentDidUpdate() {
        this.createBarChart();
    }

    createBarChart() {

        if (this.state.gameData) {

            const playedGames = this.state.gameData.games.filter(game => game.playtime_forever > 1);
            const timePlayed = playedGames.map(game => game.playtime_forever);
            const names = playedGames.map(game => game.name);

            let unit = timePlayed.map((e,index) => [e, names[index]]);

            const node = this.node;
            const dataMax = max(timePlayed);
            const margin = ({top: 20, right: 0, bottom: 30, left: 40});

            const x = scaleBand()
                .domain(unit.map(d=> {
                    return d[0];
                }))
                .range([margin.left, this.WIDTH - margin.right])
                .padding(0.1)

            let formatNumber = format(".1f");

            const xAxis = g => g
                .attr("transform", `translate(0,${this.height - margin.bottom})`)
                .call(axisBottom(x) .tickSize(this.WIDTH)
                    .tickFormat(function(d) {
                        let s = formatNumber(d / 1e6);
                        return this.parentNode.nextSibling
                            ? "\xa0" + s
                            : "$" + s + " million";
                    }))

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
                .remove().attr('class', 'loo');

            select(node)
                .selectAll('rect')
                .data(unit)
                .style('fill', '#007799')
                .style('stroke', '#fff')
                .attr('x', 0)
                .attr('y', (d,i) => i * 55)
                .attr('height', 45 - margin.top)
                .attr('width',d => {
                    return (d[0]/10)
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
        return (
            <div className="GameChart">
                <h1>Steam API Data Viz</h1>
                <svg ref={node => this.node = node}
                     width={1200} height={1200} className={"chart"}>
                </svg>
            </div>
        );
    }
}

export default App;
