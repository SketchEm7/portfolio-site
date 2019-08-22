import {Component} from "react";
import React from "react";
import dataVizImg from "./assets/imgs/steam-viz.png";
import instafeedImg from "./assets/imgs/instafeed.png";
import pokedex from "./assets/imgs/pokedex-pikachu.png";
import wordCloudImg from "./assets/imgs/wordcloud.png"
import { Accordion, Icon } from 'semantic-ui-react'
import {Link} from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isHidden: true
        }
    }

    toggleHidden() {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }

    state = { activeIndex: 1 };

    handleClick = (e, titleProps) => {
        const { index } = titleProps;
        const { activeIndex } = this.state;
        const newIndex = activeIndex === index ? -1 : index;

        this.setState({ activeIndex: newIndex })
    }

    render() {
        const Professional = (props) => <div>
            <h3 className={"bio-subtitle"}>Work Experience</h3>
            <p className={"bio-description"}>I am a UI/Frontend web developer with professional experience in Angular/Typescript, CSS, and HTML extensively. Of these my greatest strength has been CSS. As for my non-professional technical experience, this website is loaded with a variety of projects utilizing different APIs. The entire site was created using the create-react-app and flask.</p>
        </div>;

        const Personal = (props) => <div>
            <h3 className={"bio-subtitle"}>Hobbies</h3>
            <p className={"bio-description"}>Drawing has been a hobby a mine for as long as I can remember. If you check out the Instafeed link in the navigation you will see some of my latest sketches. I also have a dog. She is my first pet and therefore has me wrapped around her paw. I love to spend time with her, especially going to the park on warm days. I also like video games.</p>
        </div>;
        const { activeIndex } = this.state;
        return(

            <div className={"parallax"}>
                <div>
                    <div className={"siteTitle section"}>
                        <h1 className={"intro-line fadeIn"}>Portfolio site of Emily Melendez</h1>
                    </div>
                    <div className={"buffer1"}></div>
                    <div className={"projects-section section"}>
                        <h2 className={"bio-subtitle"}>Projects</h2>
                        <div className={"projects-imgs-container desktop"}>
                            <Accordion styled>
                                <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                                    <img className={"thumbnail"} src={dataVizImg}/>
                                </Accordion.Title>
                                <Accordion.Content active={activeIndex === 0}>
                                    <p>
                                        This project is a data visualization created using the D3 library and data provided from the Steam API.
                                    </p>
                                    <Link to="/steam-data-viz" className={"project-links"}>View Project</Link>
                                </Accordion.Content>
                            </Accordion>
                            <Accordion styled>
                                <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
                                    <img className={"thumbnail"} src={instafeedImg}/>
                                </Accordion.Title>
                                <Accordion.Content active={activeIndex === 1}>
                                    <p>
                                        I like to draw things.
                                    </p>
                                    <Link to="/instafeed" className={"project-links"}>View Project</Link>
                                </Accordion.Content>
                            </Accordion>
                            <Accordion styled>
                                <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
                                    <img className={"thumbnail"} src={pokedex}/>
                                </Accordion.Title>
                                <Accordion.Content active={activeIndex === 2}>
                                    <p>
                                        Welcome to the world of Pokemon! Look up the stats on the first generation of pocket monsters.
                                    </p>
                                    <Link to="/pokedex" className={"project-links"}>View Project</Link>
                                </Accordion.Content>
                            </Accordion>
                            <Accordion styled>
                                <Accordion.Title active={activeIndex === 3} index={3} onClick={this.handleClick}>
                                    <img className={"thumbnail"} src={wordCloudImg}/>
                                </Accordion.Title>
                                <Accordion.Content active={activeIndex === 3}>
                                    <p>
                                        Wordcloud images generated with python wordcloud library
                                    </p>
                                    <Link to="/wordcloud" className={"project-links"}>View Project</Link>
                                </Accordion.Content>
                            </Accordion>
                        </div>
                        <div className={"projects-imgs-container tablet"}>
                            <div className={"tablet-column"}>
                                <Accordion styled>
                                    <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                                        <img className={"thumbnail"} src={dataVizImg}/>
                                    </Accordion.Title>
                                    <Accordion.Content active={activeIndex === 0}>
                                        <p>
                                            This project is a data visualization created using the D3 library and data provided from the Steam API.
                                        </p>
                                        <Link to="/steam-data-viz" className={"project-links"}>View Project</Link>
                                    </Accordion.Content>
                                </Accordion>
                                <Accordion styled>
                                    <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
                                        <img className={"thumbnail"} src={instafeedImg}/>
                                    </Accordion.Title>
                                    <Accordion.Content active={activeIndex === 1}>
                                        <p>
                                            I like to draw things.
                                        </p>
                                        <Link to="/instafeed" className={"project-links"}>View Project</Link>
                                    </Accordion.Content>
                                </Accordion>
                            </div>
                            <div className={"tablet-column"}>
                                <Accordion styled>
                                    <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
                                        <img className={"thumbnail"} src={pokedex}/>
                                    </Accordion.Title>
                                    <Accordion.Content active={activeIndex === 2}>
                                        <p>
                                            Welcome to the world of Pokemon! Look up the stats on the first generation of pocket monsters.
                                        </p>
                                        <Link to="/pokedex" className={"project-links"}>View Project</Link>
                                    </Accordion.Content>
                                </Accordion>
                                <Accordion styled>
                                    <Accordion.Title active={activeIndex === 3} index={3} onClick={this.handleClick}>
                                        <img className={"thumbnail"} src={wordCloudImg}/>
                                    </Accordion.Title>
                                    <Accordion.Content active={activeIndex === 3}>
                                        <p>
                                            Wordcloud images generated with python wordcloud library
                                        </p>
                                        <Link to="/wordcloud" className={"project-links"}>View Project</Link>
                                    </Accordion.Content>
                                </Accordion>
                            </div>
                        </div>
                    </div>

                    <div className={"buffer2"}></div>
                    <div className={"professional-section"}>
                        <h2 className={"bio-subtitle"}>About Me</h2>
                        <Professional/>
                        <Personal/>
                        <a href="./assets/docs/emily-melendez-resume.pdf" download>
                            <button className={"hvr-sweep-to-right resume-btn"} onClick={this.toggleHidden.bind(this)}>Download Resume</button>
                        </a>
                        <h3 className={"bio-subtitle"}>Contact Info</h3>
                        <ul className={"bio-description"}>
                            <a href="emily.melendez4@gmail.com" className={"email-link"}><li>Email: emily.melendez4@gmail.com</li></a>
                            <li>Phone: 484-278-3835</li>
                        </ul>
                    </div>

                    <div className={"footer"}>

                    </div>
                </div>
            </div>
        )

    }
}

export default Home;