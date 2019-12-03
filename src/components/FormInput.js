import './styles/FormInput.css';
import React, { useState } from 'react';

export function FormInput(props) {
	// const [value, setValue] = useState('');

	const input = React.useRef(null);
	const [styleMicrophoneButton, changeStyleMicrophone] = useState({
		background: "url('https://webmii.com/images/mic.png') no-repeat orange",
		backgroundPosition: 'center',
		backgroundSize: '100%',
	});
	const [isRecord, changeRecord] = useState(true);

	const clickOnMicrophone = (event) => {
		props.audioMessage(event);
		if (isRecord === true) {
			changeStyleMicrophone({
				background:
					"url('http://cdn.onlinewebfonts.com/svg/img_161173.png') center center / 100% no-repeat orange",
			});
			changeRecord(false);
		} else {
			changeStyleMicrophone({
				background:
					"url('https://webmii.com/images/mic.png') center center / 100% no-repeat orange",
			});
			changeRecord(true);
		}
	};

	return (
		<form className="formInput_place" onSubmit={props.onSubmit}>
			<div className="geolocationButton_place">
				<div className="geolocationButton" onClick={props.geolocation} />
			</div>
			<div className="pictureButton_place">
				<div
					className="pictureButton"
					onClick={() => {
						input.current.click();
					}}
				/>
			</div>
			<input
				placeholder="Ваше сообщение"
				value={props.value}
				onChange={props.onChange}
			/>
			<div className="microphoneButton_place">
				<div
					className="microphoneButton"
					onClick={clickOnMicrophone}
					style={styleMicrophoneButton}
				/>
			</div>
			<input
				type="file"
				id="fileElem"
				className="fileElem"
				multiple
				style={{ display: 'None' }}
				ref={input}
				onChange={props.filesOnChange}
			/>
		</form>
	);
}
