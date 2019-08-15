import {Component} from "react";
import React from "react";
import dataVizImg from "./assets/imgs/steam-viz.png";
import instafeedImg from "./assets/imgs/instafeed.png";
import pokedex from "./assets/imgs/pokedex-pikachu.png";

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

    render() {
        const Professional = (props) => <div>
            <h3 className={"bio-subtitle"}>Work Experience</h3>
            <p className={"bio-description"}>I am a UI/Frontend web developer with professional experience in Angular/Typescript, CSS, and HTML extensively. Of these my greatest strength has been CSS. Because of the stigma of this quasi-programming quasi-black magic language combined with my knowledge of its principles such as the cascade, and the box model, as well as with its wide depth in its many properties, I was able to roll up my sleeves and become the goto UI dev eventhough I had less overall experience than my co-workers. As for my non-professional technical experience, this website is loaded with a variety of projects utilizing different APIs. The entire site was created using the create-react-app and flask.</p>
        </div>;

        const Personal = (props) => <div>
            <h3 className={"bio-subtitle"}>About Me</h3>
            <p className={"bio-description"}>Drawing has been a hobby a mine for as long as I can remember. If you check out the Instafeed link in the navigation you will see some of my latest sketches. Sitting down with paper, pencils, and markers is one of my favorite ways to unplug. I have a dog. She is my first pet and therefore has me wrapped around her paw. I love to spend time with her, especially going to the park on warm days. I also like video games.</p>
        </div>;
        return(
            <div className={"parallax"}>
                <div>
                    <div className={"siteTitle section"}>
                        <h1 className={"intro-line fadeIn"}>Portfolio site of Emily Melendez</h1>
                    </div>
                    <div className={"buffer1"}></div>
                    <div className={"projects-section section"}>
                        <h2 className={"bio-subtitle"}>Projects</h2>
                        <div>
                            <img className={"thumbnail"} src={dataVizImg}/>
                            <img className={"thumbnail"} src={instafeedImg}/>
                            <img className={"thumbnail"} src={pokedex}/>
                        </div>
                    </div>

                    <div className={"buffer2"}></div>
                    <div className={"professional-section"}>
                        <h2 className={"bio-subtitle"}>Resume</h2>
                        <button onClick={this.toggleHidden.bind(this)}>Download Resume</button>
                        <Professional/>
                        <Personal/>
                        <h3 className={"bio-subtitle"}>Contact Info</h3>
                        <ul className={"bio-description"}>
                            <li>Email: emily.melendez4@gmail.com</li>
                            <li>Phone: 484-278-3835</li>
                        </ul>
                        <p>I look forward to hearing from you.</p>
                    </div>

                    <div className={"footer"}>

                    </div>
                </div>
            </div>
        )

    }
}

export default Home;