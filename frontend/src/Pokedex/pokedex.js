import React, {Component} from "react";
import styles from "./pokedex.module.scss";
import axios from "axios";
import Autosuggest from 'react-autosuggest';
// import pokemonImage from `../assets/imgs/pokemon/${pokemonId}.png`;



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
        this.pokedex = await axios.get(`/pokedex`);
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
        this.pokemon = await axios.get(`/pokedex/${suggestionValue}`);

        this.setState({
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

        switch (this.state.typeOne) {
            case 'Fire':
                this.setState({
                    typeOneBackgroundColor: '#d00606'
                });
                break;
            case 'Grass':
                this.setState({
                    typeOneBackgroundColor: '#028602'
                });
                break;
            case 'Water':
                this.setState({
                    typeOneBackgroundColor: '#022882'
                });
                break;
            case 'Bug':
                this.setState({
                    typeOneBackgroundColor: '#999900'
                });
                break;
            case 'Poison':
                this.setState({
                    typeOneBackgroundColor: '#990099'
                });
                break;
            case 'Flying':
                this.setState({
                    typeOneBackgroundColor: '#009999'
                });
                break;
            case 'Normal':
                this.setState({
                    typeOneBackgroundColor: '#444400'
                });
                break;
            case 'Electric':
                this.setState({
                    typeOneBackgroundColor: '#ce9e03'
                });
                break;
            case 'Rock':
                this.setState({
                    typeOneBackgroundColor: '#4b433e'
                });
                break;
            case 'Ground':
                this.setState({
                    typeOneBackgroundColor: '#906901'
                });
                break;
            case 'Psychic':
                this.setState({
                    typeOneBackgroundColor: '#6600a3'
                });
                break;
            case 'Fighting':
                this.setState({
                    typeOneBackgroundColor: '#990100'
                });
                break;
            case 'Dragon':
                this.setState({
                    typeOneBackgroundColor: '#275074'
                });
                break;
            case 'Fairy':
                this.setState({
                    typeOneBackgroundColor: '#d47d86'
                });
                break;
        }

        switch (this.state.typeTwo) {
            case 'Fire':
                this.setState({
                    typeTwoBackgroundColor: '#d00606'
                });
                break;
            case 'Grass':
                this.setState({
                    typeTwoBackgroundColor: '#028602'
                });
                break;
            case 'Water':
                this.setState({
                    typeTwoBackgroundColor: '#022882'
                });
                break;
            case 'Bug':
                this.setState({
                    typeTwoBackgroundColor: '#999900'
                });
                break;
            case 'Poison':
                this.setState({
                    typeTwoBackgroundColor: '#990099'
                });
                break;
            case 'Flying':
                this.setState({
                    typeTwoBackgroundColor: '#009999'
                });
                break;
            case 'Normal':
                this.setState({
                    typeTwoBackgroundColor: '#444400'
                });
                break;
            case 'Electric':
                this.setState({
                    typeTwoBackgroundColor: '#ce9e03'
                });
                break;
            case 'Rock':
                this.setState({
                    typeTwoBackgroundColor: '#4b433e'
                });
                break;
            case 'Ground':
                this.setState({
                    typeTwoBackgroundColor: '#906901'
                });
                break;
            case 'Psychic':
                this.setState({
                    typeTwoBackgroundColor: '#6600a3'
                });
                break;
            case 'Fighting':
                this.setState({
                    typeTwoBackgroundColor: '#990100'
                });
                break;
            case 'Dragon':
                this.setState({
                    typeTwoBackgroundColor: '#275074'
                });
                break;
            default:
                this.setState({
                    typeTwoBackgroundColor: 'transparent'
                });
        }

    };

    render() {
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Type a Gen 1 Pokemon',
            value,
            onChange: this.onChange
        };

        const pokemonImage = <img className={styles.pokemonImage} src={`${process.env.PUBLIC_URL}/pokemon/${this.state.pokemonId}.png`} alt={"pokemon-img"}/>
        const showImage = this.state.pokemonId ? pokemonImage : null;
        return(
            <div>
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
                            {showImage}
                            <div className={styles.pokemonId}>#{this.state.pokemonId}</div>
                            <span style={{backgroundColor: this.state.typeOneBackgroundColor}} className={styles.type}>{this.state.typeOne}</span>
                            <span style={{backgroundColor: this.state.typeTwoBackgroundColor}} className={styles.type}>{this.state.typeTwo}</span>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Pokedex;