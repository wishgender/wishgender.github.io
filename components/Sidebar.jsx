//= laz | wishgender
//= Sun, May 31, 2026
//= 15:27:28 UTC-04:00
//= components\Sidebar.jsx

//= Dependencies =//
import { useState } from "react";
import SidebarButton from "./SidebarButton.jsx";

const Sidebar = (props) => {

    return (
        <div id="Sidebar">
            {props.tabs.map((tab, index) => <SidebarButton key={index} tab={tab} update={props.update} check={props.check} />)}
        </div>
    )
}

export default Sidebar;