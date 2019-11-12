import './styles/DialogForm.css';
import React, { Component } from 'react';

import { DialogBox } from './DialogBox';
import { MessageForm } from './MessageForm';
// import { MessageBox } from './MessageBox';

export class DialogForm extends Component {
	constructor(props) {
		super(props);

		this.createDialog = this.createDialog.bind(this);
		this.inMessageForm = this.inMessageForm.bind(this);
		this.inDialogForm = this.inDialogForm.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
		this.changeStateValue = this.changeStateValue.bind(this);

		var styleDialogEl = { display: '' };
		var styleMessageEl = { display: 'None' };
		var styleDialogBoxEl = { display: 'None' };
		var lastMessage = '';
		var text = '';
		var time = '';
		if (localStorage.getItem('dialog_0') !== null) {
			lastMessage = JSON.parse(localStorage.getItem('dialog_0')).slice(-1)[0];
			text = lastMessage.text;
			if (text.length >= 50) {
				text = lastMessage.text.slice(0, 50) + '...';
				time = lastMessage.time;
			}
			styleDialogBoxEl = { display: '' };
		}
		this.state = {
			styleDialog: styleDialogEl,
			styleMessage: styleMessageEl,
			styleDialogBox: styleDialogBoxEl,
			value: '',
			textLastMessage: text,
			timeLastMessage: time,
		};
	}

	createDialog() {
		if (localStorage.getItem('dialog_0') === null) {
			console.log('Создать диалог');
			var styleDialogBoxEl = { display: '' };
			this.setState({ styleDialogBox: styleDialogBoxEl });
		}
	}

	inMessageForm() {
		console.log('В чат');
		var styleDialogEl = { display: 'None' };
		var styleMessageEl = { display: '' };
		this.setState({ styleDialog: styleDialogEl, styleMessage: styleMessageEl });
	}

	inDialogForm() {
		console.log('К списку чатов');
		var styleDialogEl = { display: '' };
		var styleMessageEl = { display: 'None' };
		this.setState({ styleDialog: styleDialogEl, styleMessage: styleMessageEl });

		if (localStorage.getItem('dialog_0') !== null) {
			var lastMessage = JSON.parse(localStorage.getItem('dialog_0')).slice(
				-1,
			)[0];
			console.log(lastMessage);
			var text = lastMessage.text;
			if (lastMessage.text.length >= 50) {
				text = lastMessage.text.slice(0, 50) + '...';
			}
			this.setState({
				textLastMessage: text,
				timeLastMessage: lastMessage.time,
			});
		}
	}

	sendMessage(event) {
		console.log('Отправить сообщение');
		console.log(this.state.value);
		console.log(new Date().toLocaleTimeString().slice(0, 5));

		var messages = [];
		var text = this.state.value;
		var time = new Date().toLocaleTimeString().slice(0, 5);
		var messageBox = {
			id: 0,
			sender: 'Maks',
			text: text,
			time: time,
		};
		messages.push(messageBox);
		if (localStorage.getItem('dialog_0') === null) {
			localStorage.setItem('dialog_0', JSON.stringify(messages));
		} else {
			messages = JSON.parse(localStorage.getItem('dialog_0'));
			var newId = messages.slice(-1)[0].id + 1;
			messageBox.id = newId;
			messages.push(messageBox);
			localStorage.setItem('dialog_0', JSON.stringify(messages));
		}

		this.setState({ value: '' });
		event.preventDefault();
	}

	changeStateValue(event) {
		this.setState({ value: event.target.value });
	}

	render() {
		return (
			<React.Fragment>
				<div className="dialogForm" style={this.state.styleDialog}>
					<div className="dialogs">
						<div className="burger" />
						<div className="messages">Сообщения</div>
						<div className="something" />
					</div>
					<div className="dialogContent">
						<div className="dialogWrap" onClick={this.inMessageForm}>
							<DialogBox
								text={this.state.textLastMessage}
								time={this.state.timeLastMessage}
								style={this.state.styleDialogBox}
							/>
						</div>
					</div>
					<div className="newButton_place" onClick={this.createDialog}>
						<div className="newButton" />
					</div>
				</div>
				<div className="messageContent" style={this.state.styleMessage}>
					<MessageForm
						onClick={this.inDialogForm}
						onSubmit={this.sendMessage}
						value={this.state.value}
						onChange={this.changeStateValue}
						messageList={
							JSON.parse(localStorage.getItem('dialog_0')) || [
								{ id: '', text: null, time: null },
							]
						}
					/>
				</div>
			</React.Fragment>
		);
	}
}
