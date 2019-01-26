import React, {Component} from "react";
import styles from "./pokedex.module.scss";
import cx from 'classnames';

class Pokedex extends Component {
    constructor(props){
        super(props)
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