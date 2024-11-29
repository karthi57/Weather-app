import { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { db, collection, addDoc, getDocs } from "~/componets/firebase";
import getWeatherData from "~/API/index";
import Welcome from "~/componets/Welcome";

export const meta: MetaFunction = () => {
  return [
    { title: "Weather App" },
    { name: "description", content: "Welcome to the Weather app!" },
  ];
};

export default function WeatherPage() {

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

export async function action({request}: {request: Request}) {
  //console.log("action of weather is called ; ");

  const formData = await request.formData();
  const cities = Object.fromEntries(formData.entries());

  //-------------< Adding City To firebase >------------------------
  try {
    const userCitiesRef = collection(db, `users/1/userCities`);
    const querySnapshot = await getDocs(userCitiesRef);
    const numberOfCitiesInFireBase = querySnapshot.size;
    const weatherData = await getWeatherData(formData.get("city"));

    //----------< Adding Max of 5 cities >---------------------
    if (numberOfCitiesInFireBase >=5) {
      return { message: "You can add only upto 5 cities" };
    }

    //----------< Wrong City Input >---------------------------
    if (weatherData.error) {
      return { message: "Please enetr the valid City Name" };
    }

    await addDoc(userCitiesRef, {city: weatherData.location.name,});
    console.log(`Succesfulyy added city ${weatherData.location.name} to FB `);
    return weatherData.location.name;
  } catch (e) {
    console.log("unable to add cities", e);
    return '';
  }

}

//--------------------< Loader >---------------------------------------------------------

export async function loader() {
  //----------< getting data form firebase >---------------------------
  //const cityArray = :['London', 'Bangalore', 'Kolkata', 'Tokyo', 'Ireland' ];
  const cityArray = await fetchingCitiesWithID();

  if (!cityArray || cityArray.length === 0) {
    console.log("No cities found in FB");
    return [];
  }
  return cityArray;
}

//--------------------< Fetching cities and Id >---------------------------------------------------------
export async function fetchingCitiesWithID() {
  const userCitiesRef = collection(db, `users/1/userCities`);
  try {
    //---------< getting all docs from firebase >---------
    const querySnapshot = await getDocs(userCitiesRef);

    const cityArray = querySnapshot.docs.map((doc) => {
      return { id: doc.id, city: doc.data().city };
    });
    return cityArray;

  } catch (error) {
    console.log("Error fetching cities:", error);
    return [];
  }
}
