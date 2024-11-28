import FavouriteCities from "~/componets/FavouriteCities";
import getWeatherData from "~/API/index";
import { Outlet } from "@remix-run/react";
import {
  db,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "~/componets/firebase";
import { useLoaderData, Form, Link, redirect } from "@remix-run/react";
import Welcome from "~/componets/Welcome";
import CityLists from "~/componets/CityLists";

interface cityArr {
  id: string;
  city: string;
}

interface WeatherData {
  id: string;
  city: string;
}

interface Params {
  id?: string;
}

export default function WeatherPage() {
  const loaderData = useLoaderData<WeatherData[]>();
  //console.log("city Array as loaderData = useLoaderData() => ", loaderData);

  return (
    <>
      <div className="absolute top-0 z-[-2]  w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
        {/* grid element */}
        <div className="absolute -z-10 bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:30px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        {/* blur circles */}
        <div className="absolute -z-10  left-1/2 top-[-30%] h-[400px] w-[400px] -translate-x-[50%] translate-y-[20%] rounded-full bg-[rgba(168,104,242,0.5)] opacity-60 blur-[80px]"></div>
        <div className="absolute -z-10 left-0 right-10 top-10 h-[300px] w-[300px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(110,141,243,0.5)] opacity-70 blur-[80px]"></div>
        <Welcome />
        <Outlet />
      </div>
    </>
  );
}

//------------------------------------< Action >----------------------------------------

export async function action({
  request,
  params,
}: {
  request: Request;
  params: Params;
}) {
  //console.log("action of weather is called ; ");

  const formData = await request.formData();
  const cities = Object.fromEntries(formData.entries());

  //Adding To firebase

  try {
    const userCitiesRef = collection(db, `users/1/userCities`);
    const querySnapshot = await getDocs(userCitiesRef);
    const numberOfCitiesInFireBase = querySnapshot.size;
    const weatherData = await getWeatherData(formData.get("city"));

    // Adding Max of 5 cities
    if (numberOfCitiesInFireBase >=5) {
      return { message: "You can add only upto 5 cities" };
    }

    if (weatherData.error) {
      return { message: "Please enetr the valid City Name" };
    }

    await addDoc(userCitiesRef, {
      city: weatherData.location.name,
    });
    document.getElementById('city-list')?.scrollIntoView({behavior:"smooth"});
    console.log(`Succesfulyy added city ${weatherData.location.name} to FB `);
    return weatherData.location.name;
  } catch (e) {
    console.log("unable to add cities", e);
  }
  //return weatherdata
  return " this is from weather.tsx null";
}

//--------------------< Loader >---------------------------------------------------------

export async function loader() {
  //getting data form firebase
  //console.log("action of loader is called ; ");
  //const cityArray = :['London', 'Bangalore', 'Kolkata', 'Tokyo', 'Ireland' ];
  const cityArray = await fetchingCitiesWithID();

  if (!cityArray || cityArray.length === 0) {
    console.log("No cities found in FB");
    return [];
  }
  //console.log("city Array => ", cityArray);

  //    try{
  //     const weatherDataArray = await Promise.all(
  //       cityArray.map(async (city) => {
  //        try{
  //         const weatherData = await getWeatherData(city.city);
  //         return {id: city.id, ...weatherData};
  //        }
  //        catch(error){
  //         console.error(`Error fetching weather data for ${city.city}:`, error);
  //         return { id:city.id, location: { name: city.city }}
  //        }
  //       }
  //     )
  //   )
  //   return weatherDataArray;
  // }
  //   catch(error){
  //     console.log("error in fetching weather data", error);
  //   }

  return cityArray;
}

//--------------------< Fetching ID of most recent Data >---------------------------------------------------------
export async function fetchingCitiesWithID() {
  const userCitiesRef = collection(db, `users/1/userCities`);

  try {
    const querySnapshot = await getDocs(userCitiesRef);
    // let cityArray:cityArr[] = [];
    // querySnapshot.forEach((doc)=> {
    //   //  console.log(doc.id, " => ", doc.data().city);
    //   return( cityArray = [...cityArray, {id : doc.id, city: doc.data().city}]);
    // })

    const cityArray = querySnapshot.docs.map((doc) => {
      return { id: doc.id, city: doc.data().city };
    });
    return cityArray;
  } catch (error) {
    console.log("Error fetching most recent cities:", error);
    return [];
  }
}
