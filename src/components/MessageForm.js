import './styles/MessageForm.css';
import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { MessageBox } from './MessageBox';
import { FormInput } from './FormInput';

export function MessageForm(props) {
	const messageList = props.messageList;
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
					<div className="dialogName">Максим Макаров</div>
				</div>
				<div className="search_options_place">
					<div className="search" />
					<div className="options" />
				</div>
			</div>
			<div className="content">
				<div className="messageWrap">
					{messageList.map((message) => (
						<MessageBox
							key={message.id.toString()}
							text={message.text}
							time={message.time}
							isAudioMessage={message.isAudioMessage}
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
