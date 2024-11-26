
//----------------------< Getting data from API >---------------------------
export default async function getWeatherData(city) {

      const cacheKey = `weather_${city}`;
      const cachedData = localStorage.getItem(cacheKey);

      if(cachedData){
        console.log(`Fetching the cahced data for the city ${city}`);
        return JSON.parse(cachedData);
      }

      //calling API
      try{
        const response = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=e30089b308f04c5080c94715241611&q=${city}&aqi=no`
        );
        const weatherData = await response.json();

        // stroring in cache
        localStorage.setItem(cacheKey, JSON.stringify(weatherData));
        console.log(`Fetched data from API and stroed in cache for city : ${city}`);
        
        return weatherData;
      }
      catch(error){
        console.error(`Error fetching weather data for ${city}`, error);
        throw error;
      }
  }

