//= laz | wishgender
//= Sun, May 31, 2026
//= 14:29:50 UTC-04:00
//= app.jsx

//= Dependencies =//
import { useEffect, useState } from "react";
import content from "./content.js";
import Header from "./components/Header.jsx";
import Home from "./components/tabcontent/Home.jsx";
import About from "./components/tabcontent/About.jsx";
import Friends from "./components/tabcontent/Friends.jsx";
import Footer from "./components/Footer.jsx";
import Fun from "./components/tabcontent/Fun.jsx";

const App = () => {
    const [pageContent, setPageContent] = useState(content);
    const [activeTab, setActiveTab] = useState("Home");
    const [activeFunTab, setActiveFunTab] = useState(null);

    useEffect(() => {
        setPageContent(content);
        // console.log(pageContent.collabs)
    }, [])

    const makeActive = (tabName) => {
        if (tabName!=="") setActiveTab(tabName);
    }
    
    const isActiveTab = (tabName) => {
        if (activeTab===tabName) return true;
        else return false;
    }

    const getActive = () => {
        return activeTab;
    }
    
    const makeActiveFun = (tabName) => {
        if (tabName!=="") setActiveFunTab(tabName);
    }
    
    const isActiveFunTab = (tabName) => {
        if (activeFunTab===tabName) return true;
        else return false;
    }

    const getActiveFun = () => {
        return activeFunTab;
    }

    return (
        <div id="App">
            <Header title={pageContent.title} imageURL={pageContent.headerImage.source} imageAlt={pageContent.headerImage.alt}
                tabs={pageContent.sidebarTabs} update={makeActive} check={isActiveTab} getActive={getActive}
                funTabs={pageContent.toys} updateFun={makeActiveFun} checkFun={isActiveFunTab} getActiveFun={getActiveFun} />
            <div id="SiteContent">
            { (activeTab === "Home") ? <Home /> : 
            (activeTab === "About Me") ? <About />
            : (activeTab === "Friends & Collabs") ? <Friends friends={pageContent.friends} collabs={pageContent.collabs}/> 
            : (activeTab === "Just For Fun") ? <Fun apps={pageContent.otherApps} update={makeActiveFun} check={isActiveFunTab} getActive={getActiveFun} />
            : <></> }       
            </div>    
            <Footer socials={pageContent.socials}/> 
        </div>
    )
}

export default App;