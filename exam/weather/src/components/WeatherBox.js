import './styles/WeatherBox.css';
import React from 'react';

import { Link } from 'react-router-dom';

export function WeatherBox(props) {
	return (
		// <Link to={props.weatherPage}>
			<div className="weatherBox_place">
				<div className="weatherBox">
					<div className="nameLocation">Москва</div>
					<div className="weatherPNG" style={{content: 'url(http://openweathermap.org/img/wn/10d@2x.png) no-repeat'}}></div>
          <div className="weatherTemperature">35</div>
				</div>
			</div>
		// </Link>
	);
}
