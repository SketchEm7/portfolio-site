import React, {Component} from "react";
import styles from "./wordcloud.module.scss";
import cx from 'classnames';
import homer from "../assets/imgs/wordcloud/homer_final.png";
import frankenstein from "../assets/imgs/wordcloud/frankenstein_final.png";
import glados from "../assets/imgs/wordcloud/GLaDOS_final.png";
import python from "../assets/imgs/python.png"


class WordCloud extends Component {

    constructor(props) {
        super(props);
    }


    render() {

        return(
            <div>
                <div>
                    <div className={"project-desc-container"}>
                        <h1 className={cx("desktop-containers-text ")}>Word Cloud</h1>
                        <p className="header-text desktop-containers-text">These word cloud images are created with a python using a generator developed by Andreas Mueller. You can check out the repo here to try and create your own: The cloud below are GLaDOS, Homer Simpson, and fire from Mary Shelley's Frankenstein</p>
                        <h3 className="header-text desktop-containers-text">Technologies Used</h3>
                        <div className="tech-used-box desktop-containers-text">
                            <div className="tech-logos-box">
                                <img  className="tech-used-logo" src={python} alt={"python-logo"}/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.cloudContainer}>
                        <img className={styles.wordcloud} src={glados} alt={"homer-simpson-word-cloud"}/>
                        <img className={styles.wordcloud} src={homer} alt={"homer-simpson-word-cloud"}/>
                        <img className={styles.wordcloud} src={frankenstein} alt={"homer-simpson-word-cloud"}/>
                    </div>
                </div>
            </div>

        )
    };
}

export default WordCloud;