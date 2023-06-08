import React, { useEffect, useState } from "react";
import "./style.css";
import { API_KEY } from "./config/constants";
import Weather from "./assets/weather_jpeg.jpg";
import axios from "axios";
const App = () => {
	const [data, setData] = useState({});
	const [location, setLocation] = useState("");

	const [keys, setKeys] = useState("");

	const [suggestionList, setSuggestionList] = useState([]);

	const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;

	const list = [
		"Kathmandu",
		"Bhaktapur",
		"Lalitpur",
		"Bharatpur",
		"Baglung",
		"Nepalgung",
		"Bhairahawa",
		"Pokhara",
		"Dharan",
		"Biratnagar",
		"abcd",
		"aa",
		"aaa",
		"aaaaaa",
		"aashish",
		"Anamnager",
	];

	// const handleSearch = (str) => {
	// 	const filteredSuggestions = list.filter((li) =>
	// 		li.toLowerCase().includes(str.toLowerCase()),
	// 	);
	// 	setSuggestionList(filteredSuggestions);
	// };

	// const handleSearch = (str) => {
	// 	console.log("iam here");
	// 	const filteredSuggestions = list.filter((li) => {
	// 		const l = li.toLowerCase();
	// 		let len = str.length;
	// 		for (let i = 0; i <= len; i++) {
	// 			if (l[i] !== str[i]) {
	// 				return false;
	// 			}
	// 			return true;
	// 		}
	// 	});
	// 	setSuggestionList(filteredSuggestions);
	// };

	// const handleSearch = (str) => {
	// 	const filteredSuggestions = list.filter((li) => {
	// 		const lowerCaseLi = li.toLowerCase();
	// 		const lowerCaseStr = str.toLowerCase();
	// 		return lowerCaseLi.indexOf(lowerCaseStr) === 0;
	// 	});
	// 	setSuggestionList(filteredSuggestions);
	// };
	const handleSearch = (str) => {
  if (str !== "") {
    const filteredSuggestions = list.filter((li) => {
      const lowerCaseLi = li.toLowerCase();
      const lowerCaseStr = str.toLowerCase();
      return lowerCaseLi.indexOf(lowerCaseStr) === 0;
    });
    setSuggestionList(filteredSuggestions);
  } else {
    setSuggestionList([]);
  }
};

	const covertToCelcius = (k) => {
		const c = k - 273;
		return c;
	};

	const searchLocation = () => {
		axios.get(url).then((response) => {
			setData(response.data);
			
		});
		// setLocation(" ");
	};
	const handleSelectSuggestion = (suggestion) => {
		// console.log("location clicked , location : ", suggestion);
		setLocation(suggestion);
		setSuggestionList([]);
	};
	useEffect(() => {
		searchLocation();
		//  covertToCelcius()
	}, []);

	useEffect(() => {
		handleSearch(keys);
	}, [keys]);
	return (
		<div className="app">
			<center>
				<input
					type="text"
					value={location}
					placeholder="Enter Location..."
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							searchLocation();
						} else if (e.key === "Backspace") {
							setKeys(keys.slice(0, -1));
						} else {
							// handleSearch(e.key);
							setKeys(keys + e.key);
						}
					}}
					onChange={(event) => setLocation(event.target.value)}
				/>
				<ul>
					{suggestionList?.length > 0 ? (
						suggestionList.map((suggestion, index) => (
							<li
								key={index}
								onClick={() => handleSelectSuggestion(suggestion)}
							>
								{suggestion}
							</li>
						))
					) : (
						<li> No Data Found</li>
					)}
				</ul>
			</center>

			<div className="container">
				<div className="top">
					<div className="location">
						<p>{data.name}</p>
					</div>
					<div className="temp">
						{data.main && (
							<h1>{covertToCelcius(data?.main?.temp?.toFixed())}°C</h1>
						)}
					</div>

					<div className="description">
						{data.weather && <p> {data?.weather[0].main}</p>}
					</div>
				</div>
			</div>

			<div className="bottom">
				<div className="feels">
					{data.main && (
						<p className="bold">
							{covertToCelcius(data?.main?.temp?.toFixed())}°C
						</p>
					)}
					<p>feels like</p>
				</div>
				<div className="humidity">
					{data.main ? <p className="bold">{data?.main?.humidity}%</p> : null}
					<p>Humidity</p>
				</div>
				<div className="wind">
					{data.main ? (
						<p className="bold">{data?.wind?.speed.toFixed()}MPH</p>
					) : null}

					<p>Wind Speed</p>
				</div>
			</div>
		</div>
	);
};

export default App;
