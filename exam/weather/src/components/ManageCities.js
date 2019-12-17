import './styles/ManageCities.css';
import React from 'react';

import { Link } from 'react-router-dom';

import {WeatherBox} from './WeatherBox';

export function ManageCities(props) {
  return (
    <div className="manageCities_place">
      <div className="manageCities_header">
        <div>			
          <div className="backButton" />
        </div>
        <div className="manageCities">Manage cities</div>
        <div className="writeButton" onClick={props.location}/>
      </div>
      <div className="weatherContent">
        <div className="weatherWrap">
          <WeatherBox />
        </div>
      </div>
      <div className="newButton_place">
				<div className="newButton" />
			</div>
    </div>
  );
}