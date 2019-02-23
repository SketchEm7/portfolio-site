import React, {Component} from "react";
import styles from "./pokedex.module.scss";
import cx from 'classnames';
import axios from 'axios';

class Pokedex extends Component {
    constructor(props){
        super(props)
        this.state = {
            pokemon: null,
        }
    }

    async componentDidMount(){
        const pokedex = await axios.get(`/pokedex`);
        this.setState({
            pokemon: pokedex.data,
        })
        console.log(this.state.pokemon);
    }

    render() {
        return(
            <div>
                <div className={styles.pokedex}>
                    <div className={styles.pokedexMain}>
                        <div className={styles.pokedexHeader}>
                            <div className={styles.circle}>

                            </div>
                        </div>
                        <div className={styles.pokedexScreen}>

                        </div>
                        <input placeholder={"Enter Pokemon"}/>

                    </div>
                    <div className={styles.pokedexDoor}>
                        <div className={styles.doorInset}>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Pokedex;