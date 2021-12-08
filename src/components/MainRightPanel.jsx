import Chat from "./Chat";
import ChatTitle from "./ChatTitle";

function MainRightPannel() {
    return (
        <div className="right_panel">
            <ChatTitle fName='Mihai' lName='Mura'/>
            <Chat />
            <input className="message_input" type="text" name="message" id="message" placeholder="Message"/>
        </div>
    );
}

export default MainRightPannel;