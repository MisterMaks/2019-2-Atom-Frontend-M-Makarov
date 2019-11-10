import './styles/MessageBox.css';
import React from 'react';

export function MessageBox(props) {
	const show = { display: 'None' };

	if (localStorage.getItem('dialog_0') != null) {
		show.display = '';
	}

	return (
		<div className="messageBox_place" style={show}>
			<div className="messageBox self">
				<div className="text">{props.text}</div>
				<div className="time">{props.time}</div>
			</div>
		</div>
	);
}
