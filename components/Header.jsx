//= laz | wishgender
//= Sun, May 31, 2026
//= 14:36:43 UTC-04:00
//= components\Header.jsx

//= Dependencies =//
import { useEffect, useState } from "react";
import SidebarButton, { FunButton } from "./SidebarButton.jsx";

const Header = (props) => {

    return (
        <>
            <header id="Header">
                <div id="MainHeader">
                    <img id="HeaderImage" src={props.imageURL} alt={props.imageAlt}/>
                    <h1 id="SiteTitle">{props.title}</h1>
                </div>
                <div id="HeaderTabs">
                    {props.tabs.map((tab, index) => <SidebarButton key={index} tab={tab} update={props.update} check={props.check} />)}
                </div>
                {(props.getActive() === "Just For Fun") ? 
                (
                    <div id="FunTabs">
                        {props.funTabs.map((tab, index) => <FunButton key={index} tab={tab} updateFun={props.updateFun} checkFun={props.checkFun} />)}
                    </div>
                ) 
                : <></>}
            </header>
        </>
    )
}

export default Header;