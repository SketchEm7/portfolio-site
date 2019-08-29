import React, {Component} from "react";
import styles from "./pokedex.module.scss";
import axios from "axios";
import Autosuggest from 'react-autosuggest';
import {select} from "d3-selection";
import cx from 'classnames';
import d3Logo from "../assets/imgs/d3.png";
import sqlLogo from "../assets/imgs/sqlite-square-icon.png";


class Pokedex extends Component {

    pokedex;
    pokemon;
    getSuggestions;
    getSuggestionValue;
    renderSuggestion;

    constructor(props){
        super(props);
        this.state = {
            pokemonName: null,
            value: '',
            suggestions: [],
            typeOneBackgroundColor: '',
            typeTwoBackgroundColor: '',
        }

        this.doShit();
    }


    doShit() {
        // Teach Autosuggest how to calculate suggestions for any given input value.
        this.getSuggestions = value => {
            const inputValue = value.trim().toLowerCase();
            const inputLength = inputValue.length;

            return inputLength === 0 ? [] : this.pokedex.data.filter(pokemon =>
                pokemon.name.toLowerCase().slice(0, inputLength) === inputValue
            );
        };

        // When suggestion is clicked, Autosuggest needs to populate the input
        // based on the clicked suggestion. Teach Autosuggest how to calculate the
        // input value for every given suggestion.
        this.getSuggestionValue = suggestion => suggestion.name;

        // Use your imagination to render suggestions.
        this.renderSuggestion = suggestion => (
            <div>
                {suggestion.name}
            </div>
        );
    }

    async componentDidMount(){
        this.pokedex = await axios.get(`/api/pokedex`);
        this.setState({
            pokedex: this.pokedex.data,
        });
        this.doShit();
    }


    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onSuggestionSelected = async (selected, {suggestionValue}) => {
        this.pokemon = await axios.get(`/api/pokedex/${suggestionValue}`);

        this.setState({
            pokemon : this.pokemon.data,
            pokemonName: this.pokemon.data.name,
            pokemonId: this.pokemon.data.id,
            typeOne: this.pokemon.data.type_one,
            typeTwo: this.pokemon.data.type_two,
            hp: this.pokemon.data.hp,
            attack: this.pokemon.data.attack,
            defense: this.pokemon.data.defense,
            specialAttack: this.pokemon.data.sp_attack,
            specialDefense: this.pokemon.data.sp_defense,
            speed: this.pokemon.data.speed,
        });


    };

    componentDidUpdate() {
        this.createBarChart();
    }

    createBarChart() {
        select("svg").selectAll("*").remove();
        const pokemon = this.state.pokemon;
        let attackStat;
        let maxTimePlayed;

        if (!!pokemon) {
            const excludeKeys = ['id', 'total'];

            const unit = Object.keys(pokemon)
                .filter(key => !!pokemon[key])
                .filter(key => !excludeKeys.includes(key))
                .filter(key => !isNaN(pokemon[key]))
                .map(key => ({
                    "name": key,
                    "value": pokemon[key]
                }));

            const margin = ({top: 20, right: 0, bottom: 30, left: 40});

            const node = this.node;

            select(node)
                .selectAll('rect')
                .data(unit)
                .enter()
                .append('g')
                .attr("viewBox", "0,0,150,420")
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
                .style('fill', this.color1)
                .attr('x', 0)
                .attr('y', (d,i) => i * 55)
                .attr('height', 45 - margin.top)
                .attr('width', d => {
                    return d.value * 1.5;
                });


            select(node)
                .selectAll('text.labels')
                .data(unit)
                .enter()
                .append('g')
                .append('text')
                .text(function(d) {
                    if (d.name === 'sp_attack') {
                        d.name = 'Special Attack'
                    }

                    if (d.name === 'sp_defense') {
                        d.name = 'Special Defense'
                    }

                    return  d.name + ": " + d.value;
                })
                .attr('x', 0)
                .attr('y', (d,i) => i * 55 + 17)
                .attr('text-anchor', 'start')
                .attr('fill', '#fff')
                .style('font-size', '1em')
                .style('text-transform', 'Uppercase');

        }

    }

    render() {
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Type a Gen 1 Pokemon',
            value,
            onChange: this.onChange
        };
        const statsSVG = this.state.pokemon ? <div className={styles.svgContainer}>
                                                <h2 style={{color: '#fff', textAlign: 'center'}}>STATS</h2>
                                                <svg ref={node => this.node = node}
                                                     width={'100%'}
                                                     height={'330px'}
                                                     // viewBox="0 0 120 230"
                                                     className={styles.statsChart}
                                                />
                                            </div> : null;

        const pokemonId = this.state.pokemonId ? <div className={styles.pokemonId}>#{this.state.pokemonId}</div> : null;
        const pokemonImage = this.state.pokemonId ? <img className={styles.pokemonImage} src={`${process.env.PUBLIC_URL}/pokemon/${this.state.pokemonId}.png`} alt={"pokemon-img"}/> : null;

        let colorsByType = {
            "Grass": "#028802",
            "Fire": "#EA0707",
            "Water": "#2B69FC",
            "Bug": "#7A7A00",
            "Poison": "#CE00CE",
            "Flying": "#009999",
            "Normal": "#5D5D00",
            "Electric": "#B98E03",
            "Rock": "#625751",
            "Ground": "#906901",
            "Psychic": "#8700D7",
            "Ghost": "#605665",
            "Fighting": "#B70100",
            "Dragon": "#2D5D86",
            "Ice": "#00A1CF",
            "Fairy": "#D37B84",
            "Steel": "#444444"
        };

        this.color1 = this.state.pokemon ? colorsByType[this.state.typeOne] : '';
        let color2 = this.state.pokemon ? colorsByType[this.state.typeTwo]: '';


        const typeTwoBadge = this.state.typeTwo ?  <span style={{backgroundColor: color2}} className={`${styles.type} ${styles.typeTwo}`}>{this.state.typeTwo}</span> : null;

        return(
            <div>
                <div className={"project-desc-container"}>
                    <h1 className={cx(styles.heading, "desktop-containers-text ")}>Pokedex</h1>
                    <p className="header-text desktop-containers-text">For those unfamiliar with the world of Pokemon, a pokedex is a device where one can look up the stats of various pokemon. The pokedex below contains information on the original generation of pokemon. </p>
                    <br/>

                    <h3 className="header-text desktop-containers-text">Technologies Used</h3>
                    <div className="tech-used-box desktop-containers-text">
                        <div className="tech-logos-box">
                            <img  className="tech-used-logo" src={sqlLogo} alt={"sqlite-logo"}/>
                            <img className="tech-used-logo" src={d3Logo} alt={"d3-library-logo"}/>
                        </div>
                    </div>
                </div>
                <div className={styles.pokedex}>
                    <div className={styles.pokedexMain}>
                        <div className={styles.pokedexHeader}>
                            <div className={styles.circle}>

                            </div>
                            <Autosuggest
                                suggestions={suggestions}
                                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                getSuggestionValue={this.getSuggestionValue}
                                renderSuggestion={this.renderSuggestion}
                                onSuggestionSelected={this.onSuggestionSelected}
                                inputProps={inputProps}
                                theme={styles}
                            />
                        </div>

                        <div className={styles.pokedexScreen}>
                            <h1 className={styles.pokemonName}>{!!this.pokemon ? this.state.pokemonName : '' }</h1>
                            {pokemonImage}
                            {pokemonId}
                            <div className={styles.typesContainer}>
                                <span style={{backgroundColor: this.color1}} className={styles.type}>{this.state.typeOne}</span>
                                {typeTwoBadge}
                            </div>
                            <div>
                                {statsSVG}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Pokedex;