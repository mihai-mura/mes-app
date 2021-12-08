import Head from "./Head";
import Contacts from "./ContactsList";
import { useState } from "react";

function MainLeftPannel() {

    const [panelOpen, setPanelOpen] = useState(true);

    function menuClick(){
        setPanelOpen(!panelOpen);
    }

    const panelClass = panelOpen ? "left_panel left_panel_open" : "left_panel left_panel_closed";
    return (
        <div className={panelClass}>
            <Head menuClick={menuClick}/>
            <Contacts />
        </div>
    );
}

export default MainLeftPannel;