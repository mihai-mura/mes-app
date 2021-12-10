function Contact(props) {
	return (
		<div className='contact'>
			<h2>
				{props.fname.charAt(0)}
				{props.lname.charAt(0)}
			</h2>
			<div>
				<h4>
					{props.fname} {props.lname}
				</h4>
				<p>{props.message}</p>
			</div>
			<p>{props.messageTime}</p>
		</div>
	);
}

export default Contact;
