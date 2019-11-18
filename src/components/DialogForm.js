import './styles/DialogForm.css';
import React from 'react';

import { Link } from 'react-router-dom';

import { DialogBox } from './DialogBox';

export function DialogForm(props) {
	return (
		<div className="dialogForm" /* style={props.styleDialogForm} */>
			<div className="dialogs">
				<div>
					<Link to="/personalpage">
						<div className="burger" onClick={props.inPersonalPage} />
					</Link>
				</div>
				<div className="messages">Сообщения</div>
				<div className="something" />
			</div>
			<div className="dialogContent">
				<div className="dialogWrap" onClick={props.inMessageForm}>
					<DialogBox
						text={props.lastMessagesTexts}
						time={props.lastMessagesTimes}
						/* style={ props.styleDialogBox } */
					/>
				</div>
			</div>
			<div className="newButton_place" /* onClick={ props.createDialog } */>
				<div className="newButton" />
			</div>
		</div>
	);
}
