import './styles/LoginForm.css';
import React from 'react';

export function LoginForm(props) {
	const fetching = (requestOption) => {
		fetch(`https://127.0.0.1:8000/social_auth/login/${requestOption}`, {
			method: 'GET',
			mode: 'no-cors',
			credentials: 'include',
		}).then(() => {
			window.location = `https://127.0.0.1:8000/social_auth/login/${requestOption}`;
		});
	};

	return (
		<div className="loginForm_place">
			<div className="loginForm_center_place">
				<div className="Sign_in">Messenger</div>
				<div className="loginMethods_place">
					<div
						className="github_div_place login_button"
						onClick={() => {
							fetching('github/');
						}}
					>
						Login with GitHub
					</div>
					<div
						className="facebook_div_place login_button"
						onClick={() => {
							fetching('facebook/');
						}}
					>
						Login with Facebook
					</div>
					{/* <div className="vk_div_place login_button">
						Login with VK
    	    </div> */}
					<div
						className="odnoklassniki_div_place login_button"
						onClick={() => {
							fetching('odnoklassniki-oauth2/');
						}}
					>
						Login with Odnoklassniki
					</div>
				</div>
			</div>
		</div>
	);
}
