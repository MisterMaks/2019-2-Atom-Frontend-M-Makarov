import './styles/MessageBox.css';
import React from 'react';

export function MessageBox(props) {
	const show = { display: 'None' };
	let href = '';
	let text = '';
	let srcImage = '';
	let srcAudioMessage = [];
	const styleAudioMessage = { display: 'None' };
	const typeMessage = props.typeMessage;
	let geo = '';
	let image = '';
	let audio = '';
	// debugger;

	if (props.typeMessage === 'text') {
		text = props.text;
		show.display = '';
	}

	if (typeMessage === 'geo') {
		href = props.text;
		show.display = '';
		geo = (
			<a
				className="message_link"
				href={href}
				style={{ color: 'yellow', textDecoration: 'underline' }}
			>
				{href}
			</a>
		);
	}

	if (typeMessage === 'image') {
		srcImage = props.text;
		show.display = '';
		image = <img src={srcImage} alt={srcImage} width="100%" />;
	}

	if (typeMessage === 'audio') {
		srcAudioMessage = props.text;
		styleAudioMessage.display = '';
		show.display = '';
		audio = (
			<audio
				className="audioMessage"
				controls
				src={srcAudioMessage}
				style={styleAudioMessage}
			/>
		);
	}

	return (
		<div className="messageBox_place" style={show}>
			<div className="messageBox self">
				<div className="text">
					{text}
					{geo}
					{image}
					{audio}
				</div>
				<div className="time">{props.time}</div>
			</div>
		</div>
	);
}
