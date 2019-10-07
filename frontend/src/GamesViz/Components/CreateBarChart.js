import React, { Component }  from 'react';
import {select} from "d3-selection";
import styles from "../games.module.scss";


class Chart extends Component {
    WIDTH = 500;
    height = 500;
    maxBarLength;

    constructor(props) {
        super(props);
        this.createBarChart = this.createBarChart.bind(this);
    }


    determineWindowSize() {
        this.maxBarLength = .72 * window.innerWidth;
    }

    componentDidUpdate() {
        this.createBarChart();
    }

    async componentDidMount(){
        window.addEventListener("resize", this.windowResized.bind(this));
    }

    windowResized() {
        this.createBarChart();
    }


    createBarChart = () => {
        select("svg").selectAll("*").remove();
        this.determineWindowSize();
        console.log('bar chart');
        if (this.props.playedGames) {
            const playedGames = this.props.playedGames;
            const timePlayed = playedGames.map(game => game.playtime_forever);
            const names = playedGames.map(game => game.name);
            const appid = playedGames.map(game => game.appid);
            const unit = timePlayed.map((tp, index) => [tp, names[index], appid[index]]);

            if (this.props.sortOrder === "greatestToLeast") {
                unit.sort((a, b) => b[0] - a[0]);
            }

            if (this.props.sortOrder === "leastToGreatest") {
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

            select(node)
                .selectAll('rect')
                .data(unit)
                .style('fill', '#519eec')
                .attr('x', 0)
                .attr('height', 45 - margin.top)
                .attr('width', d => {
                    return this.maxBarLength * (d[0] / maxTimePlayed)
                });

            select(node)
                .selectAll('text.labels')
                .data(unit)
                .attr('x', 0)
                .attr('text-anchor', 'start');

            if (this.maxBarLength > 700) {

                select(node)
                    .selectAll('rect')
                    .data(unit)
                    .attr('y', (d,i) => i * 65);

                select(node)
                    .selectAll('text.labels')
                    .data(unit)
                    .enter()
                    .append('g')
                    .append('text')
                    .text(function(d) {
                        return d[1] + ' ' + ':' + ' ' + Number(Math.round((d[0]/60) + 'e2') + 'e-2').toFixed(2) + ' ' + 'hrs';
                    })
                    .on('mouseover', function() {
                        select(this)
                            .attr('fill', '#519eec')
                            .attr('cursor', 'pointer');
                    })
                    .on('mouseout', function() {
                        select(this)
                            .attr('fill', '#fff');
                    })
                    .on('click', (d) => this.props.callbackFromParent(d[1], d[2]))
                    .attr('y', (d,i) => i * 65 + 18)
                    .attr('fill', '#fff')
                    .attr('font-size', 18);

            } else {
                select(node)
                    .selectAll('rect')
                    .data(unit)
                    .attr('y', (d,i) => i * 65 + 13);

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
                    .attr('fill', '#fff');


                select(node)
                    .selectAll('text.labels')
                    .data(unit)
                    .enter()
                    .append('g')
                    .append('text')
                    .on('click', this.test)
                    .text(function(d) {
                        return  Number(Math.round((d[0]/60) + 'e2') + 'e-2').toFixed(2) + ' ' + 'hrs';
                    })
                    .attr('y', (d,i) => i * 65 + 30)
                    .attr('fill', '#fff');
            }
        }
    };



    render() {
        return(
            <div>
                <svg ref={node => this.node = node} width={'72%'} height={this.props.playedGames ? this.props.playedGames.length * 65 : 0} className={styles.chart} onLoad={this.createBarChart()} />

            </div>
        )
    }
}

export default Chart;