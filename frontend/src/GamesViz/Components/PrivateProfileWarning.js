import React from 'react'

export default (props) => (
     <div  className={"desktop-containers-text undefined-msg"}>
        <h2 className={"undefined-msg-text"}>Something went wrong.</h2>
        <ul className={"undefined-msg-ul"}>
            <li className={"undefined-msg-li"}><span>&#8226;</span> Please make sure the steam profile and steam inventory you are tyring to view is set to public.</li>
            <li className={"undefined-msg-li"}><span>&#8226;</span> If you are sure the STEAM ID is connected to a public profile, then the STEAM API is probably down, please try again in 10 minutes</li>
        </ul>
     </div>
)