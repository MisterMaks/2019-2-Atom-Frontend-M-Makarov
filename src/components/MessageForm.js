import './styles/MessageForm.css';
import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { getMessages } from '../actions';

import { MessageBox } from './MessageBox';
import { FormInput } from './FormInput';

export function MessageForm(props) {
	// const { web } = props;
	// const [messages, setMessages] = useState([]);
	const [style, changeStyle] = useState({
		display: 'None',
		height: '100%',
		width: '100%',
		position: 'absolute',
		backgroundColor: 'red',
		opacity: '0.3',
		zIndex: '10',
	});

	const forDragNDrop = (event) => {
		event.stopPropagation();
		event.preventDefault();
	};

	const changeStyleForDragNDrop = (event) => {
		forDragNDrop(event);
		changeStyle({
			display: '',
			height: '100%',
			width: '100%',
			position: 'absolute',
			backgroundColor: 'red',
			opacity: '0.3',
			zIndex: '10',
		});
	};

	const forOnDrop = (event) => {
		forDragNDrop(event);
		changeStyle({
			display: 'None',
			height: '100%',
			width: '100%',
			position: 'absolute',
			backgroundColor: 'red',
			opacity: '0.3',
			zIndex: '10',
		});
		props.dragNDropFiles(event);
	};

	useEffect(() => {
		const id = setInterval(() => {
			props.getMessages();
			// if (web) {
			// 	fetch('https://127.0.0.1:8000/chats/get_chat_page/17/', {
			// 		method: 'GET',
			// 		mode: 'cors',
			// 		credentials: 'include',
			// 	})
			// 		.then((resp) => resp.json())
			// 		.then((data) => {
			// 			if (data.messages && data.messages.length > 0) {
			// 				const messageList = [];
			// 				for (let i = data.messages.length - 1; i >= 0; i = -(1 - i)) {
			// 					const message = data.messages[i];
			// 					const messageBox = {
			// 						id: message.message_id,
			// 						sender: message.from_user_fullname,
			// 						text: message.content,
			// 						time: message.added_at.slice(11, 16),
			// 						isAudioMessage: false,
			// 						typeMessage: "text",
			// 					};
			// 					messageList.push(messageBox);
			// 				}
			// 				setMessages(messageList);
			// 			}
			// 		});

			// } else {
			// 	const messageList = JSON.parse(localStorage.getItem('dialog_0')) || [
			// 		{
			// 			id: '',
			// 			text: null,
			// 			time: null,
			// 			isAudioMessage: null,
			// 			typeMessage: null,
			// 		},
			// 	];
			// 	setMessages(messageList);
			// }
		}, 1000);
		return () => clearInterval(id);
	}, [props]); // [web]);

	return (
		<div
			className="messageForm_place"
			onDragEnter={changeStyleForDragNDrop}
			onDragOver={forDragNDrop}
			onDrop={forOnDrop}
		>
			<div className="DragNDropPlace" style={style} />
			<div className="header">
				<div>
					<Link to="/2019-2-Atom-Frontend-M-Makarov">
						<div className="backButton" onClick={props.onClick} />
					</Link>
				</div>
				<div className="name_with_photo">
					<div className="avatar_message_place">
						<div className="avatar_message" />
					</div>
					<div className="dialogName">{props.nameDialogBox}</div>
				</div>
				<div className="search_options_place">
					<div className="search" />
					<div className="options" />
				</div>
			</div>
			<div className="content">
				<div className="messageWrap">
					{props.messages.map((message) => (
						<MessageBox
							key={message.id.toString()}
							text={message.text}
							time={message.time}
							isAudioMessage={false}
							typeMessage="text"
						/>
					))}
				</div>
			</div>
			<div className="footer">
				<FormInput
					onSubmit={props.onSubmit}
					value={props.value}
					onChange={props.onChange}
					geolocation={props.geolocation}
					filesOnChange={props.filesOnChange}
					audioMessage={props.audioMessage}
				/>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	messages: state.messages.messages,
});

export default connect(
	mapStateToProps,
	{ getMessages },
)(MessageForm);
