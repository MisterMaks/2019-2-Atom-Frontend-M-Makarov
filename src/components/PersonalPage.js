import './styles/PersonalPage.css';
import React from 'react';

import { Link } from 'react-router-dom';

export function PersonalPage(props) {
	return (
		<div className="personalPage_place">
			<div className="personalPage_header">
				<div>
					<Link to="/chats">
						<div className="backButton" onClick={props.onClick} />
					</Link>
				</div>
				<div className="edit_profile">Edit Profile</div>
				<div className="tick" />
			</div>
			<div className="avatar_profile_place">
				<div className="avatar_profile" />
			</div>
			<div className="fullName_place">
				<div className="fullName_topic">Full name</div>
				<div className="fullName_with_button" id="with_button">
					<div className="fullName">Максим Макаров</div>
					<div className="changeButton" />
				</div>
			</div>
			<div className="userName_place">
				<div className="userName_topic">Username</div>
				<div className="userName_with_button" id="with_button">
					<div className="userName">Mister Maks</div>
					<div className="changeButton" />
				</div>
				<div className="userName_comment">Minimum lenght is 5 characters</div>
			</div>
			<div className="bio_place">
				<div className="bio_topic">Bio</div>
				<div className="bio_with_button" id="with_button">
					<div className="bio">
						Студент курса Mail.ru Group Техноатом FullStack
					</div>
					<div className="changeButton" />
				</div>
				<div className="bio_comment">Any details about you</div>
			</div>
		</div>
	);
}
