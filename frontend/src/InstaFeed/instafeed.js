import React, {Component} from "react";
import axios from 'axios';
import styles from "./instafeed.module.scss";
import cx from 'classnames';
import instaLogo from "../assets/imgs/instagram-logo.png";

class InstaFeed extends Component {
    height;

    constructor(props) {
        super(props);
        this.state = {
            images: null,
        };

        this.imgContainer = React.createRef();
    }

    determineWindowSize() {
        this.height = 30 * window.innerHeight;
    }

    async componentDidMount() {
        const instafeedResponse = await axios.get(`/instafeed`);
        this.setState({
            images: instafeedResponse.data
        });

    }

    render() {
        console.log(this.imgContainer.current && this.imgContainer.current.clientHeight);
        let latestImages = null;
        if (this.state.images) {
            const images = this.state.images;
            latestImages = images.slice(0, 12).map( (image, index) => {
                const imgUrl = image.images.standard_resolution.url;
                return <img className={styles['images']} key={index} src={imgUrl}/>
            });
        }

        const HexPattern =  <svg className={styles['insta-bg']} width="100%" height="495em">
            <pattern id="pattern-hex" x="0" y="0" width="112" height="190" patternUnits="userSpaceOnUse" viewBox="56 -254 112 190">

                <g id="hexagon">
                    <path d="M168-127.1c0.5,0,1,0.1,1.3,0.3l53.4,30.5c0.7,0.4,1.3,1.4,1.3,2.2v61c0,0.8-0.6,1.8-1.3,2.2L169.3-0.3
                c-0.7,0.4-1.9,0.4-2.6,0l-53.4-30.5c-0.7-0.4-1.3-1.4-1.3-2.2v-61c0-0.8,0.6-1.8,1.3-2.2l53.4-30.5C167-127,167.5-127.1,168-127.1
                L168-127.1z"/>
                    <path d="M112-222.5c0.5,0,1,0.1,1.3,0.3l53.4,30.5c0.7,0.4,1.3,1.4,1.3,2.2v61c0,0.8-0.6,1.8-1.3,2.2l-53.4,30.5
                c-0.7,0.4-1.9,0.4-2.6,0l-53.4-30.5c-0.7-0.4-1.3-1.4-1.3-2.2v-61c0-0.8,0.6-1.8,1.3-2.2l53.4-30.5
                C111-222.4,111.5-222.5,112-222.5L112-222.5z"/>
                    <path d="M168-317.8c0.5,0,1,0.1,1.3,0.3l53.4,30.5c0.7,0.4,1.3,1.4,1.3,2.2v61c0,0.8-0.6,1.8-1.3,2.2L169.3-191
                c-0.7,0.4-1.9,0.4-2.6,0l-53.4-30.5c-0.7-0.4-1.3-1.4-1.3-2.2v-61c0-0.8,0.6-1.8,1.3-2.2l53.4-30.5
                C167-317.7,167.5-317.8,168-317.8L168-317.8z"/>
                </g>

            </pattern>


            <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-hex)" />

        </svg>
        return(
            <div>
                <div className={"project-desc-container"}>
                    <h1 className={cx(styles.heading, "desktop-containers-text ")}>InstaFeed</h1>
                    <p className="header-text desktop-containers-text">I like to draw things. This section of the site is a feed of my lastest 10 posts on Instagram using the Instagram API.</p>
                    <h3 className="header-text desktop-containers-text">Technologies Used</h3>
                    <div className="tech-used-box desktop-containers-text">
                        <div className="tech-logos-box">
                            <img  className="tech-used-logo" src={instaLogo} alt={"instagram-logo"}/>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={styles['gallery']} ref={this.imgContainer}>
                        {latestImages}
                    </div>

                    {HexPattern}
                </div>
            </div>
        )
    };
}

export default InstaFeed;