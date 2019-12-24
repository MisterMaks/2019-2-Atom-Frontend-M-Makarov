import './styles/FormInput.css';
import React, { useState } from 'react';

export function FormInput(props) {
	const pause = {
		background:
			"url('http://cdn.onlinewebfonts.com/svg/img_161173.png') center center / 100% no-repeat orange",
	};
	const microphone = {
		background:
			"url('https://webmii.com/images/mic.png') center center / 100% no-repeat orange",
	};
	const stylesMicrophoneButton = [microphone, pause];
	const input = React.useRef(null);
	const [isRecord, changeRecord] = useState(0);

	const clickOnMicrophone = (event) => {
		props.audioMessage(event);
		navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
			if (isRecord === 0) {
				changeRecord(1);
			} else {
				changeRecord(0);
			}
			stream.getTracks().forEach((track) => track.stop());
		});
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
					style={stylesMicrophoneButton[isRecord]}
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
