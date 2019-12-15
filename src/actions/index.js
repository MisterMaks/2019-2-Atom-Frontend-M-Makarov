import {
	GET_MESSAGES_REQUEST,
	GET_MESSAGES_SUCCESS,
	GET_MESSAGES_FAILURE,
} from '../constants/ActionTypes';

const getMessagesSuccess = (messages) => ({
	type: GET_MESSAGES_SUCCESS,
	payload: messages,
});

const getMessagesStarted = () => ({
	type: GET_MESSAGES_REQUEST,
});

const getMessagesFailure = (error) => ({
	type: GET_MESSAGES_FAILURE,
	payload: {
		error,
	},
});

export const getMessages = () => {
	return (dispatch, getState) => {
		dispatch(getMessagesStarted());

		fetch('https://127.0.0.1:8000/chats/get_chat_page/17/', {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
		})
			.then((resp) => resp.json())
			.then((data) => {
				if (data.messages && data.messages.length > 0) {
					const messageList = [];
					for (let i = data.messages.length - 1; i >= 0; i = -(1 - i)) {
						const message = data.messages[i];
						const messageBox = {
							id: message.message_id,
							sender: message.from_user_fullname,
							text: message.content,
							time: message.added_at.slice(11, 16),
							isAudioMessage: false,
							typeMessage: 'text',
						};
						messageList.push(messageBox);
					}
					dispatch(getMessagesSuccess(messageList));
				}
			})
			.catch((err) => {
				dispatch(getMessagesFailure(err.message));
			});
	};
};
