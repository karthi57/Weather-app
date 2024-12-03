import { redirect, useNavigate, Link, useLoaderData, useRouteError, isRouteErrorResponse  } from "@remix-run/react";
import { db, deleteDoc,doc, getDoc} from "~/componets/firebase";
import getWeatherData from "~/API/index";
import Modal from "~/componets/Modal";
import { MetaFunction } from "@remix-run/node";

//--------------------------< meta function >-------------------------------------

export const meta: MetaFunction = () => {
  return [
    { title: "Weather App" },
    { name: "description", content: "Welcome to the Weather app!" },
  ];
};

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
  const loaderData = useLoaderData<Weather>();
  console.log("loader Data => ", loaderData);
  
  function closeHandler() {
    // navigating programmatically
    navigate('/weather');
  }
  
  return (
   <Modal onClose={closeHandler}>
    
      {/*----------< blur-circle blue >------------- */}
      <div className="absolute -z-10 left-0 right-10 top-10 h-[300px] w-[300px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(110,141,243,0.5)] opacity-70 blur-[80px]"></div>

      {/* ---------< Dialog Box >----------------- */}
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
          { loaderData?.current?.humidity && (<h1 className="text-2xl font-semibold text-purple-400 p-2">Humidity : {loaderData?.current?.humidity} %</h1>) }
          { ((loaderData?.current?.precip_mm) !== undefined ) &&
            (<h1 className="text-2xl font-semibold text-purple-400 p-2 mb-2">Precipitation : {loaderData?.current?.precip_mm} mm</h1>)
          } 
        </div>
      </div>
   </Modal>
  )
}

export default card



//------------------------------------< Getting city id from url >----------------------------------------------

export async function action({ request, params }: { request: Request; params : Params }) {
  
  if(request.method === 'DELETE'){

    if (!params.id) { return new Response("Document ID is missing", { status: 400 }); }
    
    //------------< Deleting city from Firebase >---------------------------
    try {
      await deleteDoc(doc (db, `users/1/userCities`, params.id ));
    } catch (error) {
      console.error("Error deleting document:", error);
      throw new Response("Failed to delete document", { status: 500 });
    }

    return redirect('/weather');
  }
}


//------------------------------------< Viewing the City Details >------------------------------------------------

export async function loader({ params }: { params : Params }){
  
  if(params.id){
          const cityRef = doc(db, 'users/1/userCities', params.id);
          const citySnap = await getDoc(cityRef);

          if (citySnap.exists()) {
             // console.log(citySnap.data());
              const cityData : Weather = await getWeatherData(citySnap.data().city);
             // console.log("citydata => ",cityData);
              return cityData;
          }
      }
      throw new Response("City not found", { status: 404 });
  }



//------------------------------------< Error handling >------------------------------------------------
interface Errors{
  status: number;
  data: string;
}

interface Errors{
  status: number;
  data: string;
}

//------------------< Catch Boundary >-------------------
function CatchBoundary({ error } : {error : Errors}) {
  const navigate = useNavigate();
  function closeHandler() {
    navigate('/weather');
  }

  return (
    <Modal onClose={closeHandler}>
      <main className="error-box absolute z-10 w-full  mt-24 mb-20 p-12 text-center felx  border-red-500 ">
    <h1 className="text-4xl text-red-500 font-semibold m-2">{error.status}</h1>
    <h1 className="text-xl text-red-400 font-bold m-2 capitalize p-2">{error.data}</h1>
 </main>
    </Modal>
  );
}

//------------------< Error Boundary >-------------------
export function ErrorBoundary() {
  const error = useRouteError() as Errors;
  const response = isRouteErrorResponse(error);
  if (response) {
    return <CatchBoundary error={error} />;
  }

  const navigate = useNavigate();
  function closeHandler() {
    navigate('/weather');
  }
 
  return (
    <Modal onClose={closeHandler}>
      <main className="error-box absolute z-10 w-full  mt-24 mb-20 p-12 text-center felx  border-red-500 ">
        <h1 className="text-3xl text-red-400 font-semibold m-2">Something Went Wrong...😟</h1>
        <h1 className="text-4xl text-red-500 font-semibold m-2">{error.status}</h1>
        <h1 className="text-xl text-red-400 font-bold m-2 capitalize p-2">{error.data}</h1>
     </main>
    </Modal>
  );
}