import './styles/MessageForm.css';
import React from 'react';

import { Link } from 'react-router-dom';

import { MessageBox } from './MessageBox';
import { FormInput } from './FormInput';

export function MessageForm(props) {
	const messageList = props.messageList;

	return (
		<div className="messageForm_place">
			<div className="header">
				<div>
					<Link to="/">
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
						/>
					))}
				</div>
			</div>
			<div className="footer">
				<FormInput
					onSubmit={props.onSubmit}
					value={props.value}
					onChange={props.onChange}
				/>
			</div>
		</div>
	);
}
