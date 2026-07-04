//= laz | wishgender
//= Fri, Jul 03, 2026
//= 14:17:15 UTC-04:00
//= components\tabcontent\Toys\OtherApps.jsx

//= Dependencies =//
import { useState, useEffect } from "react";

const AppLink = (props) => {

    return (
        <a className="AppLink"
        href={props.url} id={props.slug}>
            {props.title}
        </a>
    )
}

const OtherApps = (props) => {
    const [apps, setApps] = useState([]);

    useEffect(() => {
        setApps(props.apps)
        console.log(apps)
    })

    return (
        <div id="OtherWebApps">
            {apps.map((app, index) => <AppLink slug={app.slug} title={app.title} url={app.url} />)}
        </div>
    );
}

export default OtherApps;