import './styles/DialogForm.css';
import React from 'react';

import { Link } from 'react-router-dom';

import { DialogBox } from './DialogBox';

export function DialogForm(props) {
	const fetching = () => {
		fetch(`https://127.0.0.1:8000/logout/`, {
			method: 'GET',
			mode: 'no-cors',
			credentials: 'include',
		}).then(() => {
			window.location = `http://127.0.0.1:3000/`;
		});
	};

	return (
		<div className="dialogForm">
			<div className="dialogs">
				<div>
					<Link to="/personalpage">
						<div className="burger" onClick={props.inPersonalPage} />
					</Link>
				</div>
				<div className="messages">Сообщения</div>
				<div className="something">
					<div className="some_button" />
					{/* <Link to="/login"> */}
					<div
						className="exit_button"
						onClick={() => {
							fetching();
						}}
					/>
					{/* </Link> */}
				</div>
			</div>
			<div className="dialogContent">
				<div className="dialogWrap" onClick={props.inMessageForm}>
					<DialogBox
						text={props.lastMessagesTexts}
						time={props.lastMessagesTimes}
						nameDialogBox="Максим Макаров"
						chatpage={props.chatpages[0]}
					/>
					<DialogBox chatpage={props.chatpages[1]} nameDialogBox="Общий чат" />
				</div>
			</div>
			<div className="newButton_place">
				<div className="newButton" />
			</div>
		</div>
	);
}
