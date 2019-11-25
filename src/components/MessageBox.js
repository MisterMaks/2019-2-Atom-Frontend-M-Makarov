import './styles/MessageBox.css';
import React from 'react';

export function MessageBox(props) {
	const show = { display: 'None' };
	var href = '';
	var text = props.text;
	var srcImage = '';
	var srcAudioMessage = '';
	var styleAudioMessage = { display: 'None' };

	if (localStorage.getItem('dialog_0') != null) {
		show.display = '';
	}

	if (props.text) {
		if (props.text.slice(0, 5) === 'https') {
			href = props.text;
			text = '';
		}

		if (
			props.text.slice(0, 9) === 'blob:http' &&
			props.isAudioMessage === false
		) {
			srcImage = text;
			text = '';
		}

		if (
			props.text.slice(0, 9) === 'blob:http' &&
			props.isAudioMessage === true
		) {
			srcAudioMessage = text;
			text = '';
			styleAudioMessage.display = '';
		}
	}

	return (
		<div className="messageBox_place" style={show}>
			<div className="messageBox self">
				<div className="text">
					{text}
					<a
						className="message_link"
						href={href}
						style={{ color: 'yellow', textDecoration: 'underline' }}
					>
						{href}
					</a>
					<img src={srcImage} width="100%" />
					<audio
						className="audioMessage"
						controls
						src={srcAudioMessage}
						style={styleAudioMessage}
					/>
				</div>
				<div className="time">{props.time}</div>
			</div>
		</div>
	);
}
