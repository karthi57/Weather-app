import { getDocs, limit, orderBy, serverTimestamp } from "firebase/firestore";
import React from "react";
import FavouriteCities from "~/componets/FavouriteCities";
import WeatherCards from "~/componets/WeatherCards";
import { db, collection, addDoc, getDoc, doc, query } from "~/componets/firebase";


export default function WeatherPage() {
  return (
    <div>
      <h1 className="p-2 border-2 border-zinc-800 text-center">
        Hii Welcome to the weather App
      </h1>
      <FavouriteCities />
      <WeatherCards />
    </div>
  );
}

type ActionData = string[];

//------------------------< Action >----------------------------------------

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  // console.log("Form Entries : ", Array.from(formData.entries()));

  const cities = Object.fromEntries(formData.entries());
  //console.log("Form Entries : ", Object.fromEntries(formData));
  
  //Adding To firebase

  let recentFavouriteCitiesID;

  try{
    const citiesRef = collection(db, `users/1/userCities`);
  
    const docRef = await addDoc(citiesRef,{
      city1: cities.city1,
      city2: cities.city2,
      city3: cities.city3,
      city4: cities.city4,
      city5: cities.city5,
      createdAt : serverTimestamp(),
    })
    console.log("Succesfully added to Fb with userID", docRef.id);
   
    recentFavouriteCitiesID = docRef.id
  }
    catch(e){
      console.log("unable to add cities", e);
    }

  return recentFavouriteCitiesID;
}


//--------------------< Fetching ID of most recent Data >---------------------------------------------------------

async function fetchingMostRecentCitiesID(){
  try{
    const citiesRef = collection(db, `users/1/userCities`);

    const q = query(citiesRef, orderBy("createdAt", "desc"), limit(1));
    const qSnapshot = await getDocs(q);

    if(!qSnapshot.empty){
      const recentFavouriteCities = qSnapshot.docs[0];

    // Convert object values to an array
       const cityArray = Object.values(recentFavouriteCities.data());
      console.log("Recent city data", cityArray);

    //removing TimeStamp from array
      const newCityArray = cityArray.filter(city => typeof(city)==='string')
      console.log("New city data", newCityArray);
      return newCityArray;
    }
    else{
      console.log("No user dta Found man!!!!")
      return [];
    }

    // const docSnap = await getDoc(docCitiesRef);

     // if (docSnap.exists()) {
     //   const data = docSnap.data();
     //   cityArray.push(data.city1, data.city2, data.city3, data.city4, data.city5);
     // } else {
     //   console.log("No cities found");
     // }
    
   
  }
  catch(error){
    console.log("Error fetching most recent cities:", error);
    
  }
}


//--------------------< Loader >---------------------------------------------------------

export async function loader() {
  //getting data form firebase

  //const cityArray = :['London', 'Bangalore', 'Kolkata', 'Tokyo', 'Ireland' ];
  const cityArray = await fetchingMostRecentCitiesID();

  console.log("after calling the function -Array is : ", cityArray);
  // const data = await getWeatherData();

  if(cityArray){
    const AllFiveCityWeatherData = cityArray.map(async (city) => {
      const multipleCityPromises = await getWeatherData(city);
      return multipleCityPromises;
    });
    //console.log(AllFiveCityWeatherData); // its an ARRAY of PROMISES

  const resolvedPromisesData = await Promise.all(AllFiveCityWeatherData);

  //console.log(promisesReoslvedData);
  return resolvedPromisesData;
  }
  return null
}

//----------------------< Getting data from API >---------------------------
export async function getWeatherData(city: string) {
  const weatherData = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=e30089b308f04c5080c94715241611&q="${city}&aqi=no`
  ).then((response) => response.json());
  return weatherData;
}

