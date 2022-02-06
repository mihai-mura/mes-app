import { FiMenu } from 'react-icons/fi';

function ChatTitle(props) {
	return (
		<div className='chat_title'>
			<FiMenu className='mobile_menu' onClick={props.mobileMenuClick} />
			<img className='profile_pic' src={`${process.env.REACT_APP_API_URI}/users/profilePic/${props._id}`} />
			<h4>
				{props.fname} {props.lname}
			</h4>
		</div>
	);
}

export default ChatTitle;
