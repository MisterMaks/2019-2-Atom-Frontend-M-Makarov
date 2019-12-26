import './styles/WeatherCityPage.css';
import React from 'react';

import { Link } from 'react-router-dom';

export function WeatherCityPage(props) {
  const tomorrowTemperature = props.tomorrow.temperature;
  const tomorrowWeatherIconURL = props.tomorrow.weatherIconURL;
  const dayAfterTomorrowTemperature = props.dayAfterTomorrow.temperature;
  const dayAfterTomorrowWeatherIconURL = props.dayAfterTomorrow.weatherIconURL;
  const thirdDayTemperature = props.thirdDay.temperature;
  const thirdDayWeatherIconURL = props.thirdDay.weatherIconURL;
  let geo = "";
  const geoIconURL = "https://userscontent2.emaze.com/images/9e7c6f79-e952-4ea8-bb31-cf6c22458724/d05b181d-5b16-4739-a0ff-f8bcfb65c5c5.png";

  if (props.geo) {
    geo = (
      <img id="geo" src={geoIconURL} alt={geoIconURL} />
    );
  }

  return (
    <div className="weatherCityPage_place">
      <div className="header">
        <Link to="/">
          <div className="backButton" />
        </Link>
        <div className="headerName">Weather in the city</div>
        <div className="something" />
      </div>
      <div className="cityName_and_currentIconURL_and_currentTemperature">
        <div className="city_and_geo">
          <div className="cityName">{props.cityName}</div>
          {geo}
        </div>
        <div className="currentWeatherPNG_and_currentTemperature">
          <div className="currentWeatherPNG">
            <img id="currentWeatherIcon" src={props.currentIconURL} alt={props.currentIconURL} />
          </div>
          <div className="currentTemperature">{props.currentTemperature}</div>
        </div>
      </div>
      <div className="weatherForecastForThreeDays">
        <div className="weatherForecastBox">
          <div className="day">Tomorrow</div>
          <div className="weatherPNG_and_temperature">
            <div className="weatherPNG">
              <img id="weatherIcon" src={tomorrowWeatherIconURL} alt={tomorrowWeatherIconURL} />
            </div>
            <div className="temperature">{tomorrowTemperature}&#176;С</div>
          </div>
        </div>
        <div className="weatherForecastBox">
          <div className="day">Day after tomorrow</div>
          <div className="weatherPNG_and_temperature">
            <div className="weatherPNG">
              <img id="weatherIcon" src={dayAfterTomorrowWeatherIconURL} alt={dayAfterTomorrowWeatherIconURL} />
            </div>
            <div className="temperature">{dayAfterTomorrowTemperature}&#176;С</div>
          </div>
        </div>
        <div className="weatherForecastBox">
          <div className="day">Third day</div>
          <div className="weatherPNG_and_temperature">
            <div className="weatherPNG">
              <img id="weatherIcon" src={thirdDayWeatherIconURL} alt={thirdDayWeatherIconURL} />
            </div>
            <div className="temperature">{thirdDayTemperature}&#176;С</div>
          </div>
        </div>
      </div>
    </div>
  );
}