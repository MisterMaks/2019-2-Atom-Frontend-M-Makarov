import './styles/DialogBox.css';
import React from 'react';

import { Link } from 'react-router-dom';

export function DialogBox(props) {
	return (
		<Link to={props.chatpage}>
			<div className="dialogBox_place" style={props.style}>
				<div className="dialogBox">
					<div className="avatar_place">
						<div className="avatar" />
					</div>
					<div className="name_with_text">
						<div className="name">{props.nameDialogBox}</div>
						<div className="text">{props.text}</div>
					</div>
					<div className="time_with_read">
						<div className="time">{props.time}</div>
						<div className="read_place">
							<div className="read" />
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}
