
import { useLoaderData, Form, Link } from "@remix-run/react";
import  "~/styles/cityLists.css"


interface WeatherData {
    id: string;
   city : string
  }
  

function CityLists() {
    const loaderData = useLoaderData<WeatherData[]>();

    
  return (
    <>
     <div className="lists p-8 m-2 h-[500px]  rounded  w-1/3 bg-neutral-950" id='city-list'>
            <h1 className='text-xl font-semibold italic mb-6'>Your Favorite Cities are</h1>


            {loaderData?.map((cityData) => (
              <div key={cityData.id} className="small-card flex justify-between border-[0.5px] border-neutral-400 rounded-md mb-4 shadow-md">
                <h1 className="p-2 m-2 text-white font-bold text-2xl"> {cityData?.city} </h1>
                <div className='flex items-center justify-center'>
                  <Link to={cityData.id}>
                    <button className="btn-view p-2 m-2 border-green-600 hover:bg-green-500"> View more </button>
                  </Link>
                  <Form  method="delete" action={`/weather/${cityData.id}`}>
                    <button className="btn-del p-2 m-2  border-red-600 hover:bg-red-500">Delete </button>
                  </Form>
                </div>
              </div>
            ))}
     </div>
    </>
  )
}

export default CityLists


  