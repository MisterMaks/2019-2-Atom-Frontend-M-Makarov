import React, { Component } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import MessageForm from './MessageForm';
import { PersonalPage } from './PersonalPage';
import { DialogForm } from './DialogForm';
import { LoginForm } from './LoginForm';

export class Messenger extends Component {
	constructor(props) {
		super(props);

		this.inDialogForm = this.inDialogForm.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
		this.changeStateValue = this.changeStateValue.bind(this);
		this.getGeolocation = this.getGeolocation.bind(this);
		this.handleFiles = this.handleFiles.bind(this);
		this.handleDragNDropFiles = this.handleDragNDropFiles.bind(this);
		this.handleAudioMessage = this.handleAudioMessage.bind(this);
		this.handleAudioButtonClick = this.handleAudioButtonClick.bind(this);

		let lastMessage = '';
		let text = '';
		let time = '';
		const fileList = [];
		let messages = [];
		const newMessages = [];

		if (localStorage.getItem('dialog_0') !== null) {
			lastMessage = JSON.parse(localStorage.getItem('dialog_0')).slice(-1)[0];
			text = lastMessage.text;
			if (text.length >= 50) {
				text = lastMessage.text.slice(0, 50) + '...';
				time = lastMessage.time;
			}

			messages = JSON.parse(localStorage.getItem('dialog_0'));
			for (let i = 0; i < messages.length; i = 1 + i) {
				const message = messages[i];
				if (message.typeMessage === 'text' || message.typeMessage === 'geo') {
					newMessages.push(message);
				}
			}
			if (newMessages.length !== 0) {
				localStorage.setItem('dialog_0', JSON.stringify(newMessages));
			} else {
				localStorage.clear();
			}
		}

		this.state = {
			value: '',
			textLastMessage: text,
			timeLastMessage: time,
			files: fileList,
			isAudioMessage: false,
			recordAudioMessage: [false],
			mediaRecorder: null,
			typeMessage: 'text',
		};
	}

	getGeolocation(event) {
		navigator.geolocation.getCurrentPosition((position) => {
			const currentPositionLatitude = position.coords.latitude;
			const currentPositionLongitude = position.coords.longitude;
			const geoUrl =
				'https://www.openstreetmap.org/#map=18/' +
				currentPositionLatitude +
				'/' +
				currentPositionLongitude +
				'/';
			this.setState({ value: geoUrl });
			// debugger;
			this.sendMessage(event, false, 'geo');
		});
	}

	handleFiles(event) {
		// this.setState({typeMessage: "image"});
		if (event.target.files.length > 0) {
			console.log(event.target.files.length);
			for (let i = 0; i < event.target.files.length; i = 1 + i) {
				const file = event.target.files[i];
				const data = new FormData();
				data.append('image', file);
				fetch('https://tt-front.now.sh/upload', {
					method: 'POST',
					body: data,
				})
					.then(() => {
						alert('Картинка отправлена');
					})
					.catch(console.log);
				const link = window.URL.createObjectURL(file);
				this.state.files.push(link);
				console.log(this.state);
				// this.setState({typeMessage: "image"});
				this.sendMessage(event, false, 'image');
				this.state.files.pop();
			}
		}
	}

	handleDragNDropFiles(event) {
		// this.setState({typeMessage: "image"});
		event.stopPropagation();
		event.preventDefault();
		const dt = event.dataTransfer;
		const files = dt.files;
		if (files.length > 0) {
			console.log(files.length);
			for (let i = 0; i < files.length; i = 1 + i) {
				const file = files[i];
				const data = new FormData();
				data.append('image', file);
				fetch('https://tt-front.now.sh/upload', {
					method: 'POST',
					body: data,
				})
					.then(() => {
						alert('Картинка отправлена');
					})
					.catch(console.log);
				const link = window.URL.createObjectURL(file);
				this.state.files.push(link);
				console.log(this.state);
				// this.setState({typeMessage: "image"});
				this.sendMessage(event, false, 'image');
				this.state.files.pop();
			}
		}
	}

	handleAudioMessage(event) {
		if (this.state.recordAudioMessage[0] === true) {
			let chuncks = [];
			const constrains = { audio: true };

			navigator.mediaDevices.getUserMedia(constrains).then((stream) => {
				this.setState({ mediaRecorder: new MediaRecorder(stream) });

				this.state.mediaRecorder.addEventListener('stop', (event) => {
					const blob = new Blob(chuncks, {
						type: this.state.mediaRecorder.mimeType,
					});

					const data = new FormData();
					data.append('audio', blob);
					fetch('https://tt-front.now.sh/upload', {
						method: 'POST',
						body: data,
					})
						.then(() => {
							alert('Голосовое сообщение отправлено');
						})
						.catch(console.log);

					chuncks = [];
					const audioURL = URL.createObjectURL(blob);
					this.setState({ isAudioMessage: true });
					this.state.files.push(audioURL);
					console.log(this.state);
					// this.setState({typeMessage: "audio"});
					this.sendMessage(event, false, 'audio');
					this.state.files.pop();
					this.setState({ mediaRecorder: null });
					stream.getTracks().forEach((track) => track.stop());
					this.setState({ isAudioMessage: false });
				});

				this.state.mediaRecorder.addEventListener('dataavailable', (event) => {
					chuncks.push(event.data);
				});

				if (this.state.mediaRecorder !== null) {
					this.state.mediaRecorder.start();
				}
			});
		}
	}

	handleAudioButtonClick(event) {
		if (this.state.recordAudioMessage[0] === false) {
			this.state.recordAudioMessage.pop();
			this.state.recordAudioMessage.push(true);
			this.handleAudioMessage(event);
		} else {
			if (this.state.mediaRecorder !== null) {
				this.state.mediaRecorder.stop();
			}
			this.state.recordAudioMessage.pop();
			this.state.recordAudioMessage.push(false);
		}
	}

	inDialogForm() {
		if (localStorage.getItem('dialog_0') !== null) {
			const lastMessage = JSON.parse(localStorage.getItem('dialog_0')).slice(
				-1,
			)[0];
			console.log(lastMessage);
			let text = lastMessage.text;
			if (lastMessage.text.length >= 50) {
				text = lastMessage.text.slice(0, 50) + '...';
			}
			if (text.slice(0, 9) !== 'blob:http') {
				this.setState({
					textLastMessage: text,
					timeLastMessage: lastMessage.time,
				});
			}
		}
	}

	sendMessage(event, key, typeMessage = null) {
		console.log('Отправить сообщение');
		console.log(this.state);
		console.log(new Date().toLocaleTimeString().slice(0, 5));

		let newId = 0;
		let messages = [];
		let text = this.state.value;
		const time = new Date().toLocaleTimeString().slice(0, 5);
		const messageBox = {
			id: 0,
			sender: 'Maks',
			text: text,
			time: time,
			isAudioMessage: this.state.isAudioMessage,
			typeMessage: typeMessage,
		};
		if (text.trim().length > 0) {
			console.log('Отправить текст');
			messages.push(messageBox);
			if (localStorage.getItem('dialog_0') === null) {
				localStorage.setItem('dialog_0', JSON.stringify(messages));
			} else {
				messages = JSON.parse(localStorage.getItem('dialog_0'));
				newId = messages.slice(-1)[0].id + 1;
				messageBox.id = newId;
				if (key === true) {
					console.log('web');
					const data = new FormData();
					data.append('content', messageBox.text);
					data.append('chat', 17);
					fetch('https://127.0.0.1:8000/messages/send_message/', {
						method: 'POST',
						mode: 'no-cors',
						body: data,
						credentials: 'include',
					});
				} else {
					console.log('не web');
					messages.push(messageBox);
					localStorage.setItem('dialog_0', JSON.stringify(messages));
				}
			}
			this.inDialogForm();
		} else if (this.state.files.length > 0) {
			console.log('Отправить медиа');
			for (let i = 0; i < this.state.files.length; i = 1 + i) {
				var fileLink = this.state.files[i];
				messageBox.text = fileLink;
				messages.push(messageBox);
				if (localStorage.getItem('dialog_0') === null) {
					localStorage.setItem('dialog_0', JSON.stringify(messages));
				} else {
					messages = JSON.parse(localStorage.getItem('dialog_0'));
					newId = messages.slice(-1)[0].id + 1;
					messageBox.id = newId;
					messages.push(messageBox);
					localStorage.setItem('dialog_0', JSON.stringify(messages));
				}
			}
		}
		text = '';
		this.setState({ value: '', files: [] });
		if (event) {
			event.preventDefault();
		}
	}

	changeStateValue(event) {
		this.setState({ value: event.target.value });
		event.preventDefault();
	}

	render() {
		return (
			<Router>
				<React.Fragment>
					<Switch>
						<Route path="/login">
							<LoginForm />
						</Route>
						{/* <Route path="/">
							<DialogForm
								lastMessagesTexts={this.state.textLastMessage}
								lastMessagesTimes={this.state.timeLastMessage}
								chatpages={['/chatpage/1', '/chatpage/2']}
							/>
						</Route> */}
						{/* <Route path="/chatpage/1">
							<MessageForm
								onClick={this.inDialogForm}
								onSubmit={(event) => {
									this.sendMessage(event, false, 'text');
								}}
								value={this.state.value}
								onChange={this.changeStateValue}
								geolocation={this.getGeolocation}
								filesOnChange={this.handleFiles}
								dragNDropFiles={this.handleDragNDropFiles}
								audioMessage={this.handleAudioButtonClick}
								nameDialogBox="Максим Макаров"
								web={false}
							/>
						</Route> */}
						<Route path="/chatpage/2">
							<MessageForm
								onClick={this.inDialogForm}
								onSubmit={(event) => {
									this.sendMessage(event, true, 'text');
								}}
								value={this.state.value}
								onChange={this.changeStateValue}
								geolocation={this.getGeolocation}
								filesOnChange={this.handleFiles}
								dragNDropFiles={this.handleDragNDropFiles}
								audioMessage={this.handleAudioButtonClick}
								nameDialogBox="Общий чат"
								web={true}
								// typeMessage={this.state.typeMessage}
							/>
						</Route>
						<Route path="/personalpage">
							<PersonalPage onClick={this.inDialogForm} />
						</Route>
						<Route path="/">
							<DialogForm
								lastMessagesTexts={this.state.textLastMessage}
								lastMessagesTimes={this.state.timeLastMessage}
								chatpages={['/chatpage/1', '/chatpage/2']}
							/>
						</Route>
					</Switch>
				</React.Fragment>
			</Router>
		);
	}
}
