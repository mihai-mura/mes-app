import Contact from "./Contact";

function Contacts() {


    return (
            <ul className="contacts_list">
                <li><Contact fName='Mihai' lName='Mura' message='Last message...' messageTime='19:21'/></li>
                <li><Contact fName='Darius' lName='Tente' message='Last message...' messageTime='14:56'/></li>
            </ul>
    );
}

export default Contacts;