import { FiMenu } from 'react-icons/fi';

function Head(props) {


    return (
        <div className="head">
            <div className="user_info">
                <h4>Mihai</h4>
                <p>mihai.mura2@gmail.com</p>
            </div>
            <FiMenu className="menu_icon" onClick={props.menuClick}/>
        </div>
    );
}

export default Head;