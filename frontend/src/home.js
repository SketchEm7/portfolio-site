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
                    <h2>Hello and welcome to the portfolio site of Emily Melendez</h2>
                    <p>Yep. It me.</p>
                </div>


                <svg className={"hex-pattern"} width="100%" height="100em" >
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
            </div>
        )

    }
}

export default Home;