//= laz | wishgender
//= Thu, Jul 16, 2026
//= 12:03:22 UTC-04:00
//= components\tabcontent\Toys\TepigEnclosure.jsx

//= Dependencies =//
import { useState } from "react";
import "../../../styles/tepig.css"


const tepigJump = [
    { transform: "translateY(-30px)" },
    { transform: "translateY(0px)" }
]

const jumpTiming = {
    duration: 100,
    iterations: 1
}

const enclosureID = 'tepigEnclosure';

const pics = [
    'sprite1.png',
    'sprite2.png'
]



const Tepig = () => {
    let [imgSrc, setImgSrc] = useState("menu.png");

    function startDancing(tep) {
        setImgSrc("menuAnim.png");
    }

    function stopDancing(tep) {
        setImgSrc("menu.png");
    }
    
    return (
        <div className="tepig">
            <img src={`assets/${imgSrc}`} onMouseEnter={startDancing}
                    onMouseLeave={stopDancing} />
        </div>
    )
}


const TepigEnclosure = () => {
    const [tepigCount, setTepigCount] = useState(1);

    const addTepig = () => {
        const newCount = tepigCount + 1;
        setTepigCount(newCount);
    }

    const setFree = () => {
        setTepigCount(1);
    }

    
async function makeSounds() {
    let tepigs = document.getElementsByClassName('tepig');
    for (let tepig of tepigs) {
        const cry = new Audio('/assets/tepig.ogg');
        cry.play();
        tepig.animate(tepigJump, jumpTiming);
    }
}

    return (
        <div className="tepigZone">
            <div className="tepTop">

        <div id="info">
            <h1>Welcome to the Tepig Enclosure!</h1>
            <h2>Tepig count: {tepigCount}</h2>
        </div>
        <div id="actions">
            <button id="addTepButton" onClick={addTepig}>Make more!</button>
            <button id="sayHiButton" onClick={makeSounds}>Say hi!</button>
            <button id="setFreeButton" onClick={setFree}>Set them free!</button>
        </div>
            </div>


        <div id="tepigEnclosure">
            {
                Array.from({ length: tepigCount }).map((_, index) => (
                    <Tepig key={index}/>
                ))
            }
        </div>
        </div>
    )
};

export default TepigEnclosure;