import './styles/FormInput.css';
import React, { Component } from 'react';

export function FormInput(props) {
	return (
		<form className="formInput_place" onSubmit={props.onSubmit}>
			<input
				placeholder="Ваше сообщение"
				value={props.value}
				onChange={props.onChange}
			/>
		</form>
	);
}
