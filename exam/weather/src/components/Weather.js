import React, { Component } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { ManageCities } from './ManageCities';
import { WeatherCityPage } from './WeatherCityPage';

export class Weather extends Component {
	constructor(props) {
		super(props);

		this.getGeolocation = this.getGeolocation.bind(this);
		this.getWeatherFromGeolocation = this.getWeatherFromGeolocation.bind(this);
		this.getWeatherFromCityName = this.getWeatherFromCityName.bind(this);
		this.getWeatherFromID = this.getWeatherFromID.bind(this);
		this.addCity = this.addCity.bind(this);
		this.goToWeatherCityPage = this.goToWeatherCityPage.bind(this);

		this.cities = [
			{ id: 524901, name: 'Moscow', temperature: '', iconURL: '' },
			{ id: 498817, name: 'Saint Petersburg', temperature: '', iconURL: '' },
			{ id: 6356055, name: 'Barcelona', temperature: '', iconURL: '' },
			{ id: 3067696, name: 'Prague', temperature: '', iconURL: '' },
			{ id: 3054643, name: 'Budapest', temperature: '', iconURL: '' },
			{ id: 5128581, name: 'New York', temperature: '', iconURL: '' },
			{ id: 5368361, name: 'Los Angeles', temperature: '', iconURL: '' },
			{ id: 5391959, name: 'San Francisco', temperature: '', iconURL: '' },
			{ id: 6455259, name: 'Paris', temperature: '', iconURL: '' },
			{ id: 2761369, name: 'Vienna', temperature: '', iconURL: '' },
		];

		for (let i = 0; i < this.cities.length; i = 1 + i) {
			this.getWeatherFromID(this.cities[i].id);
		}

		this.state = {
			location: '',
			locationID: '',
			locationTemperature: '',
			locationIconURL: '',
			cities: [],
			selectedCityData: {
				link: '',
				cityID: '',
				cityName: '',
				currentTemperature: '',
				currentIconURL: '',
				geo: '',
			},
			tomorrow: [],
			dayAfterTomorrow: [],
			thirdDay: [],
		};

		this.getGeolocation();
	}

	getGeolocation() {
		navigator.geolocation.getCurrentPosition((position) => {
			const currentPositionLatitude = position.coords.latitude;
			const currentPositionLongitude = position.coords.longitude;
			this.setState({
				location: [
					currentPositionLatitude.toString(),
					currentPositionLongitude.toString(),
				],
			});
			this.getWeatherFromGeolocation();
		});
	}

	getWeatherFromGeolocation() {
		const [lat, long] = this.state.location;
		fetch(
			`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=22974c3e3aacf49aa6ed8191ccca8d39`,
			{
				headers: { origin: document.origin },
				method: 'GET',
			},
		)
			.then((resp) => resp.json())
			.then((data) => {
				this.setState({
					location: data.name,
					locationID: data.id,
					locationTemperature: data.main.temp,
					locationIconURL: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
				});
			});
	}

	getWeatherFromCityName(event, cityName) {
		fetch(
			`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=22974c3e3aacf49aa6ed8191ccca8d39`,
			{
				headers: { origin: document.origin },
				method: 'GET',
			},
		)
			.then((resp) => resp.json())
			.then((data) => {
				const newCity = {
					id: data.id,
					name: data.name,
					temperature: data.main.temp,
					iconURL: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
				};
				this.setState({ cities: [...this.state.cities, newCity] });
			});
		event.preventDefault();
	}

	getWeatherFromID(cityID) {
		fetch(
			`http://api.openweathermap.org/data/2.5/weather?id=${cityID}&units=metric&APPID=22974c3e3aacf49aa6ed8191ccca8d39`,
			{
				headers: { origin: document.origin },
				method: 'GET',
			},
		)
			.then((resp) => resp.json())
			.then((data) => {
				const name = data.name;
				const temperature = data.main.temp;
				const iconURL = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
				const city = {
					id: cityID,
					name: name,
					temperature: temperature,
					iconURL: iconURL,
				};
				this.setState({ cities: [...this.state.cities, city] });
			});
	}

	addCity(event) {
		const city = prompt('Введите название города', 'Washington');
		if (city) {
			for (let i = 0; i < this.cities.length; i = i + 1) {
				if (this.cities[i].name === city) {
					alert('Такой город уже есть в списке');
					return null;
				}
			}
			this.getWeatherFromCityName(event, city);
		}
	}

	goToWeatherCityPage(
		event,
		city,
		cityID,
		currentTemperature,
		currentIconURL,
		geo,
	) {
		fetch(
			`http://api.openweathermap.org/data/2.5/forecast?id=${cityID}&units=metric&APPID=22974c3e3aacf49aa6ed8191ccca8d39`,
			{
				headers: { origin: document.origin },
				method: 'GET',
			},
		)
			.then((resp) => resp.json())
			.then((data) => {
				const forecast = data.list;
				const tomorrow = {
					temperature: forecast[8].main.temp,
					weatherIconURL: `http://openweathermap.org/img/wn/${forecast[8].weather[0].icon}@2x.png`,
				};
				const dayAfterTomorrow = {
					temperature: forecast[16].main.temp,
					weatherIconURL: `http://openweathermap.org/img/wn/${forecast[16].weather[0].icon}@2x.png`,
				};
				const thirdDay = {
					temperature: forecast[24].main.temp,
					weatherIconURL: `http://openweathermap.org/img/wn/${forecast[24].weather[0].icon}@2x.png`,
				};

				this.setState({
					tomorrow: tomorrow,
					dayAfterTomorrow: dayAfterTomorrow,
					thirdDay: thirdDay,
					selectedCityData: {
						link: city,
						cityID: cityID,
						cityName: city,
						currentTemperature: currentTemperature,
						currentIconURL: currentIconURL,
						geo: geo,
					},
				});
			});
	}

	render() {
		return (
			<Router basename={process.env.PUBLIC_URL}>
				<React.Fragment>
					<Switch>
						<Route exact path="/">
							<ManageCities
								cities={this.state.cities}
								locationCityName={this.state.location}
								locationID={this.state.locationID}
								locationTemperature={this.state.locationTemperature}
								locationIconURL={this.state.locationIconURL}
								addCity={this.addCity}
								goToWeatherCityPage={this.goToWeatherCityPage}
							/>
						</Route>
						<Route path={'/' + this.state.selectedCityData.link}>
							<WeatherCityPage
								cityID={this.state.selectedCityData.cityID}
								cityName={this.state.selectedCityData.cityName}
								currentTemperature={
									this.state.selectedCityData.currentTemperature
								}
								currentIconURL={this.state.selectedCityData.currentIconURL}
								geo={this.state.selectedCityData.geo}
								tomorrow={this.state.tomorrow}
								dayAfterTomorrow={this.state.dayAfterTomorrow}
								thirdDay={this.state.thirdDay}
							/>
						</Route>
					</Switch>
				</React.Fragment>
			</Router>
		);
	}
}
