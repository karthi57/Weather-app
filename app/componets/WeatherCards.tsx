import React from 'react'
import { useLoaderData } from '@remix-run/react';


interface Weather{
 location:{
  name: string;
  region: string;
  country: string;
 };
 current:{
  temp_c: number;
  wind_kph: number;
  precip_mm: number;
  humidity:number;
  condition:{
    text : string;
    icon : string;
  }
 };
}

function WeatherCards() {
    const weather = useLoaderData<Weather[]>();
    //console.log(weather)
  return (
    <div className="flex flex-wrap items-center justify-center w-[90%]">
    {
      weather.map((cityData, index) => (
        <div key={index} className=' w-1/4 h-[400px] flex flex-col items-center border-2 border-red-400 rounded p-2 m-2'>
          {(cityData?.location) ? (
          <>
            
                <h1 className='text-xl font-bold p-1 m-1'>{cityData?.location?.name},</h1>
                <h1 className='text-md font-bold p-1 m-1'>{cityData?.location?.region},</h1>
                <h1 className='text-md font-bold p-1 m-1'>{cityData?.location?.country}</h1>
          </>
          ):(
            <h1 className='text-3xl font-semibold p-2 text-red-400 m-1'>Unable to fetch the data, Kindly recheck the city name and try again</h1>
          )
          }
        </div>
      ))
    }
  </div>
  )
}

export default WeatherCards