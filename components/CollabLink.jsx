//= laz | wishgender
//= Sun, May 31, 2026
//= 15:49:54 UTC-04:00
//= components\CollabLink.jsx

import { useEffect, useState } from "react";

//= Dependencies =//

const CollabLink = (props) => {

    return (
        <div id={props.title}>
            <a className="collabLink" href={props.url}>
                <img id={`${props.title}Logo`} src={(props.imgSrc) ? (props.imgSrc) : null} height="48px" className="friendButton" />
            </a>
        </div>
    )
}

export default CollabLink;