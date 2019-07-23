import React, {Component} from "react";
import styles from "./pokedex.module.scss";
import axios from "axios";
import Autosuggest from 'react-autosuggest';


class Pokedex extends Component {

    pokedex;
    getSuggestions;
    getSuggestionValue;
    renderSuggestion;

    constructor(props){
        super(props)
        this.state = {
            pokemon: null,
            value: '',
            suggestions: [],
        }

        this.doShit();
    }


    doShit() {
        // Teach Autosuggest how to calculate suggestions for any given input value.
        this.getSuggestions = value => {
            console.log(value);
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
            pokemon: this.pokedex.data,
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

    render() {
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Type a Gen 1 Pokemon',
            value,
            onChange: this.onChange
        };

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
                                inputProps={inputProps}
                                theme={styles}
                            />
                        </div>

                        <div className={styles.pokedexScreen}>

                        </div>



                    </div>
                </div>
            </div>
        )
    }
}

export default Pokedex;