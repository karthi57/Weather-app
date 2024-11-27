import FavouriteCities from "~/componets/FavouriteCities";
import getWeatherData from "~/db/database";
import { Outlet } from "@remix-run/react";
//import WeatherCards from "~/componets/WeatherLists";
import {db,collection,addDoc,getDocs, deleteDoc, doc} from "~/componets/firebase";
import { useLoaderData, Form, Link, redirect } from "@remix-run/react";
import { useState } from "react";
import Modal from "~/componets/Modal";

interface cityArr {
  id: string;
  city: string;
}

interface WeatherData {
  id: string;
  location: {
    name: string;
  };
}

interface Params {
  id?: string;
}

export default function WeatherPage() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  //const [selectedCity, setSelectedCity] = useState<string | null>(null);


  const openModal = () => {
   // setSelectedCity(city);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    //setSelectedCity(null);
  };

  const loaderData = useLoaderData<WeatherData[]>();

  return (
    <div>
      <h1 className="p-2 border-2 border-zinc-800 text-center">
        Hii Welcome to the weather App
      </h1>
      <div className="flex justify-between items-center p-16">
        <div className="flex w-full items-center">
          <FavouriteCities />
          <div className=" border-2 border-blue-400 w-1/2">
            <h1> hell here are your cities</h1>
            {loaderData?.map((cityData) => (
              <div key={cityData.id} className="flex justify-between ">
                <h1 className="p-2 m-2 text-red-600 text-3xl">
                  {cityData?.location?.name}
                </h1>
                <div>
                  <Link to={cityData.id}>
                    <button className="p-2 m-2 rounded border-2 border-zinc-600 hover:bg-green-500"
                    >
                      View more
                    </button>
                  </Link>


                  <Form  method="delete" action={`/weather/${cityData.id}`}>
                    <button className="deleteButton p-2 m-2 rounded border-2 border-zinc-600 hover:bg-red-500">
                      Delete
                    </button>
                  </Form>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <WeatherCards /> */}
      </div>
      <Outlet/>
    </div>
  );
}

//------------------------------------< Action >----------------------------------------

export async function action({ request, params }: { request: Request; params : Params }) {
  //console.log("action of weather is called ; ");


  const formData = await request.formData();
  const cities = Object.fromEntries(formData.entries());

  //Adding To firebase
 
    try {
      const userCitiesRef = collection(db, `users/1/userCities`);
      const querySnapshot = await getDocs(userCitiesRef);
      const numberOfCitiesInFireBase = querySnapshot.size;
      //const weatherData = await getWeatherData(formData.get('city'));

      // Adding Max of 5 cities
      if (numberOfCitiesInFireBase >= 25) {
        return { message: "You can add only upto 5 cities" };
      } 

      // if(weatherData.error){
      //   return { message : "Please enetr the valid City Name" }
      // }

      await addDoc(userCitiesRef, {
        city: cities.city,
      });
      console.log(`Succesfulyy added city ${cities.city} to FB `);
      
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

  if(!cityArray || cityArray.length === 0){
    console.log("No cities found in FB");
    return [];
    
  }


     try{
      const weatherDataArray = await Promise.all(
        cityArray.map(async (city) => {
         try{
          const weatherData = await getWeatherData(city.city);
          return {id: city.id, ...weatherData};
         }
         catch(error){
          console.error(`Error fetching weather data for ${city.city}:`, error);
          return { id:city.id, location: { name: city.city }}
         }
        }
      )
    )
    return weatherDataArray;
  }
    catch(error){
      console.log("error in fetching weather data", error);
    }
}


//--------------------< Fetching ID of most recent Data >---------------------------------------------------------
export async function fetchingCitiesWithID(){
  const userCitiesRef = collection(db, `users/1/userCities`);

  try{
    const querySnapshot = await getDocs(userCitiesRef);
    // let cityArray:cityArr[] = [];
    // querySnapshot.forEach((doc)=> {
    //   //  console.log(doc.id, " => ", doc.data().city);
    //   return( cityArray = [...cityArray, {id : doc.id, city: doc.data().city}]);
    // })

    const cityArray = querySnapshot.docs.map(doc =>{
      return {id: doc.id, city: doc.data().city};
    })
    return cityArray;
    }
  catch(error){
    console.log("Error fetching most recent cities:", error);
    return [];
  }
}