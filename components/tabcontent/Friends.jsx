//= laz | wishgender
//= Tue, Jun 02, 2026
//= 14:15:56 UTC-04:00
//= components\tabcontent\Friends.jsx

//= Dependencies =//
import { useEffect, useState } from "react";
import CollabLink from "../CollabLink"
import "../../styles/Friends.css"

const Friends = (props) => {

    const [links, setLinks] = useState([]);

    useEffect(() => {
        setLinks(props.collabs)
        console.log(links)
    })

    return (
    <div id="Friends" className="tabcontent">
                <h1 id="PremiumContent">
                    <span className="nf nf-fa-star"/> Premium Content <span className="nf nf-fa-star"/>
                </h1>
                
                <h3 id="FriendsLinksTitle">Friends</h3>
                <ul id="FriendLinks">
                    
                    {props.friends.map((link, index) => <CollabLink key={index} title={link.title} url={link.url} imgSrc={link.imgSrc}/>)}

                </ul>

                <div id="collabLinksSection">
                    <h3>
                        Collabs and Projects I've Participated In
                    </h3>
                    <div id="CollabLinks">
                        {props.collabs.map((link, index) => <CollabLink key={index} title={link.title} url={link.url} imgSrc={link.imgSrc}/>)}
                    </div>
                </div>

            </div>
            )
}

export default Friends;