import { redirect, useActionData,useNavigate, Link, useLoaderData  } from "@remix-run/react";
import { db, deleteDoc,doc, getDoc} from "~/componets/firebase";
import getWeatherData from "~/API/index";
import Modal from "~/componets/Modal";



interface Params {
  id?: string;
}

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

function card() {

  const navigate = useNavigate();
  const actionData = useActionData<Weather[]>();
  const loaderData = useLoaderData<Weather>();
  console.log("loader Data => ", loaderData);
  

  function closeHandler() {
    // navigate programmatically
    navigate('/weather');
  }
  
  return (
   <Modal 
   onClose={closeHandler}>
         {/* blur -circle blue */}
         <div className="absolute -z-10 left-0 right-10 top-10 h-[300px] w-[300px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(110,141,243,0.5)] opacity-70 blur-[80px]"></div>
     <div className="dialogBox w-full h-full  border-[0.5px] border-neutral-950 text-xl rounded-md bg-neutral-950 ">
     <div className="flex items-end justify-end p-2 m-1 text-white ">
        <Link to="/weather"> <button className="back-btn border-[0.5px] text-sm border-blue-100 hover:bg-blue-100 hover:text-black p-2 rounded-sm">Go back</button> </Link>
     </div>
    <div className="flex flex-col justify-center items-center mt-[-5%] p-4 ">
      { loaderData?.location?.name && (<h1 className="text-6xl text-white font-bold p-2">{loaderData?.location?.name}</h1>) }
      { loaderData?.location?.country && (<h1 className="text-3xl font-bold text-white p-2">{loaderData?.location?.country}</h1>) }
      { loaderData?.current?.condition?.text && (<h1 className="text-4xl font-bold text-green-300 p-2">{loaderData?.current?.condition?.text}</h1>) }
     <div className="border-2 rounded-full border-yellow-500 p-2 m-2">
      { loaderData?.current?.condition?.icon && (<img className="h-20 w-20" src={loaderData?.current?.condition?.icon} alt={loaderData?.current?.condition?.icon}/>) }
     </div>
      { loaderData?.current?.temp_c && (<h1 className="text-2xl font-semibold text-purple-400 p-2 m-1">Temp :  {loaderData?.current?.temp_c}  °C</h1>) }
      { loaderData?.current?.humidity && (<h1 className="text-2xl font-semibold text-purple-400 p-2">Humidity : {loaderData?.current?.humidity}</h1>) }
      { ((loaderData?.current?.precip_mm) !== undefined )&&
        (<h1 className="text-2xl font-semibold text-purple-400 p-2 mb-2">Precipitation : {loaderData?.current?.precip_mm} mm</h1>)
      } 
    </div>
     
     
     
    </div>
   </Modal>
  )
}

export default card




//------------------------------------< Action >---------------------------------------------------

export async function action({ request, params }: { request: Request; params : Params }) {
  //console.log("Params city Id  from /weather/id.jsx  action function => ",params.id);
  console.log("Method type from /weather/id.jsx  action function => ",request.method);
  if(request.method === 'POST'){
  
   if (!params.id) {
   return new Response("Document ID is missing", { status: 400 });
  }
   try {
     await deleteDoc(doc (db, `users/1/userCities`, params.id ));
   } catch (error) {
    console.error("Error deleting document:", error);
    return new Response("Failed to delete document", { status: 500 });
  }
  return redirect('/weather');
  }
  
}


//------------------------------------< Loader >------------------------------------------------


export async function loader({ request, params }: { request: Request; params : Params }){
  
    //console.log("Method type from /weather/id.jsx  action2 view more function => ",request.method);
      if(params.id){
          const cityRef = doc(db, 'users/1/userCities', params.id);
          const citySnap = await getDoc(cityRef);

          if (citySnap.exists()) {
             // console.log(citySnap.data());
              
              const cityData = await getWeatherData(citySnap.data().city);
              //console.log("citydata => ",cityData);
              return cityData;
          }
      }
      return 'hii there how are you, u got this honey...';
  }


