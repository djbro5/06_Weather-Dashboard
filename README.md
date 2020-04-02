## PROJECT TITLE:

Weather Dashboard

## PROBLEM DESCRIPTION:

I want to plan my trip but how do I find what the current weather is and the 5-day forcast outlook for a particular city? 

## USER STORY:

AS a traveller
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly

## USER STORY ACCEPTANCE TEST

A weather dashboard application that can search and save CURRENT WEATHER conditions 
with corresponding 5-DAY WEATHER OUTLOOK  for MULTIPLE CITIES.

## APPLICATION DESCRIPTION

### a) OPERATION

1. Enter name of city and press search.
2. Current weather for that city is displayed including date, conditions graphic, e.g. sunny or cloudy, temperature, humidity and uv index.
3. Under current weather is 5-day forcast outlook.
4. Multiple searches results in city with weather that is locally stored. Stored cities is  listed under search field.

### b) DEVELOPMENT

The [OpenWeather API](https://openweathermap.org/api) API is used to retrieve weather data for cities.
AJAX hooks into the API to retrieve data in JSON format. This  weather data is displayed in a browser that
 features dynamically updated HTML (with CSS) powered by jQuery.

 Technologies used:
 HTML
 CSS
 JavaScript
 JSON
 jQuery

## LICENSE

MIT License

Copyright (c) 2020 David Brown

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
