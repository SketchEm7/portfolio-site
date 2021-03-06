import React, {Component} from "react";
import axios from 'axios';
import styles from "./instafeed.module.scss";
import cx from 'classnames';
import instaLogo from "../assets/imgs/instagram-logo.png";
import { Dimmer, Loader } from 'semantic-ui-react';
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react';

class InstaFeed extends Component {

    height;

    constructor(props) {
        super(props);
        this.state = {
            images: null,
        };

        this.imgContainer = React.createRef();

    }

    async componentDidMount() {
        this.setState({
            loading: true
        });
        const instafeedResponse = await axios.get(`/api/instafeed`);
        this.setState({
            images: instafeedResponse.data,
            loading: false
        });

    }

    render() {
        let latestImages = null;
        if (this.state.images) {
            const images = this.state.images;
            latestImages = images.slice(0, 12).map( (image, index) => {
                const imgUrl = image.images.standard_resolution.url;
                return <img className={styles['images']} key={index} src={imgUrl}/>
            });
        }
        const LoadingMessage = (props) =>  <Dimmer active>
            <Loader size='massive'>Loading</Loader>
        </Dimmer>;


        return(
            <div>{this.state.loading ? <LoadingMessage/> :
                <div>
                    <div className={"project-desc-container"}>
                        <h1 className={cx(styles.heading, "desktop-containers-text ")}>InstaFeed</h1>
                        <p className="header-text desktop-containers-text">I like to draw things. This section of the site is a feed of my lastest 12 posts on Instagram using the Instagram API.</p>
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
                    </div>
                </div>}
            </div>

        )
    };
}

export default InstaFeed;