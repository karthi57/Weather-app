
import { useLoaderData } from '@remix-run/react';
import { db, deleteDoc,doc, getDoc} from "~/componets/firebase";
import getWeatherData from '~/db/database';

interface Params {
  '*'?: string;
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

function weatherCards() {

    const loaderData = useLoaderData<Weather>();
    
    
  return (
    <div>
        <h1>heyyyyy you got this</h1>
        <h1>Take a deeep breathe</h1>
        <h2> Universe is alwasy in favour to you</h2>
        <div>
            
        <h1 className='text-xl font-bold p-1 m-1'>{loaderData?.location?.name},</h1>
                <h1 className='text-md font-bold p-1 m-1'>{loaderData?.location?.region},</h1>
                <h1 className='text-md font-bold p-1 m-1'>{loaderData?.location?.country}</h1>
        </div>
    </div>
    
  )
}

export default weatherCards





//------------------------------------< Loader >------------------------------------------------

export async function loader({params}:{params : Params}){
    console.log('loader of weather/cityid is called',params['*']);
        if(params['*']){
            const cityRef = doc(db, 'users/1/userCities', params['*']);
            const citySnap = await getDoc(cityRef);

            if (citySnap.exists()) {
                //console.log(citySnap.data());
                
                const cityData = await getWeatherData(citySnap.data().city);
                //console.log(cityData);
                
                return cityData;
            }
        }
        return [];
}