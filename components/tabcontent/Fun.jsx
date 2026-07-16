//= laz | wishgender
//= Tue, Jun 02, 2026
//= 15:34:51 UTC-04:00
//= components\tabcontent\Fun.jsx

//= Dependencies =//
import { useState } from "react";
import DexNumber from "./Toys/DexNumber.jsx";
import OtherApps from "./Toys/OtherApps.jsx";
import TepigEnclosure from "./Toys/TepigEnclosure.jsx";

const Toys = [
"Pokédex Number Lookup",
        "My Other Web Apps",
        "Tepig Enclosure",
        "My PokéFarm"
]

const Fun = (props) => {
   

    return (
        <div id="FunZone">
            { (props.getActive() === Toys[0]) ? <DexNumber /> : 
            (props.getActive() === Toys[1]) ? <OtherApps apps={props.apps}/>
            : (props.getActive() === Toys[2]) ? <TepigEnclosure />
            : (props.getActive() === Toys[3]) ? <div id="Pokefarm">
                        Check out <a href="https://pokefarm.com/user/WishGender">my PokéFarm</a>!!<br />
                        <a href="https://pfq.link/?Wj_p3"><img src="https://pfq.link/?Wj_p3=platform.png" /></a>
                    </div>
            : <></> }  
        </div>
    )
};

export default Fun;