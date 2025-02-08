
//----------------------< Getting data from Weather API >---------------------------
export default async function getWeatherData(city) {

  //calling API
  try {
    if (city) {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=e30089b308f04c5080c94715241611&q=${city}&aqi=no`
      );
      const weatherData = await response.json();
      return weatherData;
    } else {
      console.log("ERROR MESSAGE FROM API", weatherData.error.message);
      return null;
    }

  }
  catch (error) {
    console.error(`Error fetching weather data for ${city}`, error);
    throw error;
  }
}


