

var APIKey = "&appid=8c9bb7e0eeb10862d148cd62de471c05";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=";
var citiesArray = JSON.parse(localStorage.getItem("cities")) || [];
const m = moment();

$(document).ready(function() {
	var city = citiesArray[citiesArray.length - 1];
	fiveDay(city);
	citySearch(city);
});

function citySearch(city) {
	// clear previous city data
	$(".city").empty();
	$(".temp").empty();
	$(".humidity").empty();
	$(".wind").empty();
	$(".uvIndex").empty();

	var citySearch = queryURL + city + APIKey;

	// search location 
	$.ajax({
		url: citySearch,
		method: "GET"
	}).then(function(response) {
	
		// SECTION: location current weather
		var cityInfo = response.name;
		var dateInfo = response.dt;;
		var currentDate = moment.unix(dateInfo).format("LL");
		var iconDummy = "https://openweathermap.org/img/wn/";
		var iconPng = "@2x.png";
		var iconWeather = response.weather[0].icon;
		var iconUrl = iconDummy + iconWeather + iconPng;
		var iconImg = $("<img>");
		iconImg.attr("src", iconUrl);
		$(".city").append(cityInfo + " ");
		$(".city").append(currentDate + " ");
		$(".city").append(iconImg);

		// temperature
		var K = response.main.temp;
		var C = (K - 273.15).toFixed(1);
		$(".temp").append("Temperature: " + C + " °C");

		// humidity
		var humidityInfo = response.main.humidity;
		$(".humidity").append("Humidity: " + humidityInfo + "%");

		// wind speed
		var windSpeed = response.wind.speed;
		$(".wind").append("Wind Speed: " + windSpeed + " m/s");

		//   uv index
		var lon = response.coord.lon;
		var lat = response.coord.lat;
		uvIndex(lon, lat);
	});
}

// get location uv level
function uvIndex(lon, lat) {
	var indexURL ="https://api.openweathermap.org/data/2.5/uvi?appid=8c9bb7e0eeb10862d148cd62de471c05&lat=";
	var middle = "&lon=";
	var indexSearch = indexURL + lat + middle + lon;

	$.ajax({
		url: indexSearch,
		method: "GET"
	}).then(function(response) {
		var uvFinal = response.value;

		$(".uvIndex").append("UV Index: ");
		var uvBtn = $("<button>").text(uvFinal);
		$(".uvIndex").append(uvBtn);

		// determine uv level colour
		if (uvFinal < 3) {
			uvBtn.attr("class", "uvGreen");
		} else if (uvFinal < 6) {
			uvBtn.attr("class", "uvYellow");
		} else if (uvFinal < 8) {
			uvBtn.attr("class", "uvOrange");
		} else if (uvFinal < 11) {
			uvBtn.attr("class", "uvRed");
		} else {
			uvBtn.attr("class", "uvPurple");
		}
	});
}


// Render buttons for each new location
function renderButtons() {																				
	$(".list-group").empty();													
	for (var i = 0; i < citiesArray.length; i++) {							
		var a = $("<li>");
		a.addClass("cityName");
		a.addClass("list-group-item");
		a.attr("data-name", citiesArray[i]);
		a.text(citiesArray[i]);
		$(".list-group").append(a);
	}
	$(".cityName").on("click", function(event) {
		event.preventDefault();
		var city = $(this).data("name");
		console.log("prev searched city" + city);
		fiveDay(city);
		citySearch(city);
	});
}


//  SECTION: 5 Day Forecast
function fiveDay(city) {
	var fiveFront = "https://api.openweathermap.org/data/2.5/forecast?q=";
	var fiveURL = fiveFront + city + APIKey;
	$(".card-text").empty();
	$(".card-title").empty();

	$.ajax({
		url: fiveURL,
		method: "GET"
	}).then(function(response) {
		//dates
		var dateOne = moment
			.unix(response.list[1].dt)
			.utc()
			.format("LL");
		$(".dateOne").append(dateOne);
		var dateTwo = moment
			.unix(response.list[9].dt)
			.utc()
			.format("LL");
		$(".dateTwo").append(dateTwo);
		var dateThree = moment
			.unix(response.list[17].dt)
			.utc()
			.format("LL");
		$(".dateThree").append(dateThree);
		var dateFour = moment
			.unix(response.list[25].dt)
			.utc()
			.format("LL");
		$(".dateFour").append(dateFour);
		var dateFive = moment
			.unix(response.list[33].dt)
			.utc()
			.format("LL");
		$(".dateFive").append(dateFive);

		// weather icon
		var iconOne = $("<img>");
		var iconOneSrc =
			"https://openweathermap.org/img/wn/" +
			response.list[4].weather[0].icon +
			"@2x.png";
		
		iconOne.attr("src", iconOneSrc);
		$(".iconOne").append(iconOne);
		
		var iconTwo = $("<img>");
		var iconTwoSrc =
			"https://openweathermap.org/img/wn/" +
			response.list[12].weather[0].icon +
			"@2x.png";
		iconTwo.attr("src", iconTwoSrc);
		$(".iconTwo").append(iconTwo);

		var iconThree = $("<img>");
		var iconThreeSrc =
			"https://openweathermap.org/img/wn/" +
			response.list[20].weather[0].icon +
			"@2x.png";
		iconThree.attr("src", iconThreeSrc);
		$(".iconThree").append(iconThree);

		var iconFour = $("<img>");
		var iconFourSrc =
			"https://openweathermap.org/img/wn/" +
			response.list[28].weather[0].icon +
			"@2x.png";
		iconFour.attr("src", iconFourSrc);
		$(".iconFour").append(iconFour);

		var iconFive = $("<img>");
		var iconFiveSrc =
			"https://openweathermap.org/img/wn/" +
			response.list[36].weather[0].icon +
			"@2x.png";
		iconFive.attr("src", iconFiveSrc);
		$(".iconFive").append(iconFive);

		//temp
		$(".tempOne").append("Temperature: ");
		$(".tempOne").append(
			tempAvg(
				response.list[2].main.temp,
				response.list[4].main.temp,
				response.list[6].main.temp
			)
		);
		$(".tempOne").append(" °C");

		$(".tempTwo").append("Temperature: ");
		$(".tempTwo").append(
			tempAvg(
				response.list[10].main.temp,
				response.list[12].main.temp,
				response.list[14].main.temp
			)
		);
		$(".tempTwo").append(" °C");

		$(".tempThree").append("Temperature: ");
		$(".tempThree").append(
			tempAvg(
				response.list[18].main.temp,
				response.list[20].main.temp,
				response.list[22].main.temp
			)
		);
		$(".tempThree").append(" °C");

		$(".tempFour").append("Temperature: ");
		$(".tempFour").append(
			tempAvg(
				response.list[26].main.temp,
				response.list[28].main.temp,
				response.list[30].main.temp
			)
		);
		$(".tempFour").append(" °C");

		$(".tempFive").append("Temperature: ");
		$(".tempFive").append(
			tempAvg(
				response.list[34].main.temp,
				response.list[36].main.temp,
				response.list[38].main.temp
			)
		);
		$(".tempFive").append(" °C");

		//humidity
		$(".humidityOne").append("Humidity: ");
		$(".humidityOne").append(
			humidityAvg(
				response.list[2].main.humidity,
				response.list[4].main.humidity,
				response.list[6].main.humidity
			)
		);
		$(".humidityOne").append("%");

		$(".humidityTwo").append("Humidity: ");
		$(".humidityTwo").append(
			humidityAvg(
				response.list[10].main.humidity,
				response.list[12].main.humidity,
				response.list[14].main.humidity
			)
		);
		$(".humidityTwo").append("%");

		$(".humidityThree").append("Humidity: ");
		$(".humidityThree").append(
			humidityAvg(
				response.list[18].main.humidity,
				response.list[20].main.humidity,
				response.list[22].main.humidity
			)
		);
		$(".humidityThree").append("%");

		$(".humidityFour").append("Humidity: ");
		$(".humidityFour").append(
			humidityAvg(
				response.list[26].main.humidity,
				response.list[28].main.humidity,
				response.list[30].main.humidity
			)
		);
		$(".humidityFour").append("%");

		$(".humidityFive").append("Humidity: ");
		$(".humidityFive").append(
			humidityAvg(
				response.list[34].main.humidity,
				response.list[36].main.humidity,
				response.list[38].main.humidity
			)
		);
		$(".humidityFive").append("%");
	});
}

function tempAvg(x, y, z) {
	var avgThree = (x + y + z) / 3.0;
	var avgReturn = (avgThree - 273.15).toFixed(0);
	return avgReturn;
}

function humidityAvg(x, y, z) {
	var avgHum = (x + y + z) / 3.0;
	return avgHum.toFixed(0);
}

// EVENTS
$("#add-city").on("click", function(event) {
	event.preventDefault();
	var city = $("#city-input")
		.val()
		.trim();
	var containsCity = false;
	if (citiesArray != null) {
		$(citiesArray).each(function(x) {
			if (citiesArray[x] === city) {
				containsCity = true;
			}
		});
	}
	if (containsCity === false) {
		citiesArray.push(city);
	}

	localStorage.setItem("cities", JSON.stringify(citiesArray));
	fiveDay(city);
	citySearch(city);
	renderButtons();
});

renderButtons();
