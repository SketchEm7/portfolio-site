import React, { Component }  from 'react';
import cx from 'classnames';
import styles from "../games.module.scss";
import steamLogo from "../../assets/imgs/steam-logo-transparent.png";
import d3Logo from "../../assets/imgs/d3.png";


class Description extends Component {
    render(){
        return(
            <div className={styles.GameChart}>
                <div className={"project-desc-container"}>
                    <h1 className={cx(styles.heading, "desktop-containers-text ")}>Steam API Data Viz</h1>
                    <p className="header-text desktop-containers-text">This project is a data visualization created using the D3 library and data provided from the Steam API. To see your stats please enter your Steam ID and click the load button. Please note your Steam Profile and Steam Inventory must be set to public for this visualization to work. (<a href={"https://support.steampowered.com/kb_article.php?ref=4113-YUDH-6401"} target={"blank"}>How to edit Steam Privacy Settings</a>)</p>
                    <br/>

                    <div className={"desktop-containers-text"}>
                        <input className={styles['steam-input']} aria-label={"steam-id"} placeholder="Steam ID" onChange={this.props.handleChange}/>
                        <button onClick={this.props.loadSteamId} className={styles['input-btn']}>Load</button>
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
            </div>
        )
    }
}

export default Description;