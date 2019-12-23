import './styles/WeatherBox.css';
import React from 'react';

import { Link } from 'react-router-dom';


export function WeatherBox(props) {
  let geo = "";

  if (props.geoIconURL) {
    geo = (
      <img src={props.geoIconURL} alt={props.geoIconURL} />
    );
  }

	return (
    <Link to={"/"+props.cityName}>
      <div className="weatherBox_place" 
        onClick={(event) => {
          props.goToWeatherCityPage(event, props.cityName, props.cityID, props.temperature, props.iconURL, geo)
        }}
      >
        <div className="weatherBox">
          <div className="city">
            <div className="nameLocation">{props.cityName}</div>
            {geo}
          </div>
          <div className="weatherElements">
            <div className="weatherPNG">
              <img id="weatherPNG" src={props.iconURL} alt={props.iconURL} />
            </div>
            <div className="weatherTemperature">{props.temperature}&#176;С</div>
            <div className="nextButton" >
              <img id="nextButton" src="https://c7.uihere.com/icons/590/660/27/next-page-9a0d550fe96e918794194d7470bc2f93.png" alt="https://c7.uihere.com/icons/590/660/27/next-page-9a0d550fe96e918794194d7470bc2f93.png" />
            </div>
          </div>
        </div>
      </div>
    </Link>
	);
}
