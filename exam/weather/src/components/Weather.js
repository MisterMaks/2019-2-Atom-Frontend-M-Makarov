import React, { Component } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { ManageCities } from './ManageCities';


export class Weather extends Component {
	constructor(props) {
		super(props);
		
		this.getGeolocation = this.getGeolocation.bind(this);
		this.getWeather = this.getWeather.bind(this);

		this.state = {
			location: [],
			firstWeather: [], 
		};
  }

	getGeolocation(event) {
		navigator.geolocation.getCurrentPosition((position) => {
			const currentPositionLatitude = position.coords.latitude;
			const currentPositionLongitude = position.coords.longitude;
			this.setState({location: [currentPositionLatitude.toString(), currentPositionLongitude.toString()]});
			console.log(this.state.location[0]);
			this.getWeather(event);
		});
	}

	getWeather(event) {
		fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.location[0]}&lon=${this.state.location[1]}&APPID=b41984b8b5135f1695c5faac30990138`, {
			headers: {origin: document.origin},
			method: 'GET',
			// mode: 'no-cors',
			// credentials: 'include',
		})
			.then((resp) => resp.json())
			.then((data) => {
				console.log(data.name);
			})
	}

  render() {
		return (
			<Router>
				<React.Fragment>
					<Switch>
						<Route path="/">
							<ManageCities location={this.getGeolocation} />
						</Route>
					</Switch>
				</React.Fragment>
			</Router>
		);
	}
}