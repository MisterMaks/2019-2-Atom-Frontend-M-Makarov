import './styles/ManageCities.css';
import React from 'react';

import {WeatherBox} from './WeatherBox';

export function ManageCities(props) {
  let cities = props.cities;

  let locationCity = "";

  if (props.locationCityName) {
    locationCity = (
      <WeatherBox 
        cityName={props.locationCityName}
        cityID={props.locationID}
        temperature={props.locationTemperature}
        iconURL={props.locationIconURL}
        geoIconURL="https://userscontent2.emaze.com/images/9e7c6f79-e952-4ea8-bb31-cf6c22458724/d05b181d-5b16-4739-a0ff-f8bcfb65c5c5.png"
        goToWeatherCityPage={props.goToWeatherCityPage}
      />
    )
  }

  return (
    <div className="manageCities_place">
      <div className="manageCities_header">
        <div className="backButton" />
        <div className="manageCities">Manage cities</div>
        <div className="writeButton" />
      </div>
      <div className="weatherContent">
        <div className="weatherWrap">
          {locationCity}
          {cities.map((city) => (
            <WeatherBox 
              key={city.id}
              cityID={city.id}
              cityName={city.name}
              temperature={city.temperature}
              iconURL={city.iconURL}
              goToWeatherCityPage={props.goToWeatherCityPage}
              getWeatherForecastForThreeDays={props.getWeatherForecastForThreeDays}
            />
          ))}
        </div>
      </div>
      <div className="newButton_place">
				<div className="newButton" onClick={props.addCity}/>
			</div>
    </div>
  );
}