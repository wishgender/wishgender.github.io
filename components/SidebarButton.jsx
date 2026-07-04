//= laz | wishgender
//= Sun, May 31, 2026
//= 15:30:42 UTC-04:00
//= components\SidebarButton.jsx

//= Dependencies =//
import { useEffect, useState } from "react";

const SidebarButton = (props) => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        setIsActive(props.check(props.tab))
    })

    const handleClick = () => {
        props.update(props.tab);
    } 

    return (
        <div className={`HeaderButton${isActive ? " activeButton" : ""}`} onClick={handleClick} >
            <h3>{props.tab}</h3>
        </div>
    )
}

export const FunButton = (props) => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        setIsActive(props.checkFun(props.tab))
    })

    const handleClick = () => {
        props.updateFun(props.tab);
    } 

    return (
        <div className={`FunButton${isActive ? " activeFunButton" : ""}`} onClick={handleClick} >
            <h4>{props.tab}</h4>
        </div>
    )
}

export default SidebarButton;