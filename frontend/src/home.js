import {Component} from "react";
import React from "react";

class Home extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div>
                <div className={"homepage-msg"}>
                    <h1 className={"intro-line fadeIn"}>Hello and welcome to the portfolio site of Emily Melendez</h1>
                    <h3 className={"bio-subtitle"}>Work Experience</h3>
                    <p className={"bio-description"}>I am a UI/Frontend web developer with professional experience in Angular/Typescript, CSS, and HTML extensively. Of these my greatest strength has been CSS. Because of the stigma of this quasi-programming quasi-black magic language combined with my knowledge of its principles such as the cascade, and the box model, as well as with its wide depth in its many properties, I was able to roll up my sleeves and become the goto UI dev eventhough I had less overall experience than my co-workers. As for my non-professional technical experience, this website is loaded with a variety of projects utilizing different APIs. The entire site was created using the create-react-app and flask.</p>

                    <h3 className={"bio-subtitle"}>Personal Interests</h3>
                    <p className={"bio-description"}>Drawing has been a hobby a mine for as long as I can remember. If you check out the Instafeed link in the navigation you will see some of my latest sketches. Sitting down with paper, pencils, and markers is one of my favorite ways to unplug. I have a dog. She is my first pet and therefore has me wrapped around her paw. I love to spend time with her, especially going to the park on warm days. I also like games. Video games, board games, card games, I admit I have my preferences, but overall a good game and a good beer makes for an awesome night.
                    </p>

                    <h3 className={"bio-subtitle"}>Contact Info</h3>
                    <ul className={"bio-description"}>
                        <li>Email: emily.melendez4@gmail.com</li>
                        <li>Phone: 484-278-3835</li>
                    </ul>
                    <p>I look forward to hearing from you.</p>
                </div>


                {/*<svg className={"hex-pattern"} width="100%" height="100em" >*/}
                    {/*<pattern id="pattern-hex" x="0" y="0" width="112" height="190" patternUnits="userSpaceOnUse" viewBox="56 -254 112 190">*/}

                        {/*<g id="hexagon">*/}
                            {/*<path d="M168-127.1c0.5,0,1,0.1,1.3,0.3l53.4,30.5c0.7,0.4,1.3,1.4,1.3,2.2v61c0,0.8-0.6,1.8-1.3,2.2L169.3-0.3*/}
			{/*c-0.7,0.4-1.9,0.4-2.6,0l-53.4-30.5c-0.7-0.4-1.3-1.4-1.3-2.2v-61c0-0.8,0.6-1.8,1.3-2.2l53.4-30.5C167-127,167.5-127.1,168-127.1*/}
			{/*L168-127.1z"/>*/}
                            {/*<path d="M112-222.5c0.5,0,1,0.1,1.3,0.3l53.4,30.5c0.7,0.4,1.3,1.4,1.3,2.2v61c0,0.8-0.6,1.8-1.3,2.2l-53.4,30.5*/}
			{/*c-0.7,0.4-1.9,0.4-2.6,0l-53.4-30.5c-0.7-0.4-1.3-1.4-1.3-2.2v-61c0-0.8,0.6-1.8,1.3-2.2l53.4-30.5*/}
			{/*C111-222.4,111.5-222.5,112-222.5L112-222.5z"/>*/}
                            {/*<path d="M168-317.8c0.5,0,1,0.1,1.3,0.3l53.4,30.5c0.7,0.4,1.3,1.4,1.3,2.2v61c0,0.8-0.6,1.8-1.3,2.2L169.3-191*/}
			{/*c-0.7,0.4-1.9,0.4-2.6,0l-53.4-30.5c-0.7-0.4-1.3-1.4-1.3-2.2v-61c0-0.8,0.6-1.8,1.3-2.2l53.4-30.5*/}
			{/*C167-317.7,167.5-317.8,168-317.8L168-317.8z"/>*/}
                        {/*</g>*/}

                    {/*</pattern>*/}


                    {/*<rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-hex)" />*/}

                {/*</svg>*/}
            </div>
        )

    }
}

export default Home;