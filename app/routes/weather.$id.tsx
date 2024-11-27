import { redirect } from "@remix-run/react";
import { db, deleteDoc,doc, getDoc} from "~/componets/firebase";
import getWeatherData from "~/db/database";
import Modal from "~/componets/Modal";
import { useNavigate } from "@remix-run/react";


interface Params {
  id?: string;
}

function card() {

  const navigate = useNavigate();

  function closeHandler() {
    // navigate programmatically
    navigate('..');
  }
  
  return (
   <Modal onClose={closeHandler}>
     <div>
      <h1>Card</h1>
      <h1>hekllooo----</h1>
      <h1>you go this</h1>
      <h1 className='text-6xl'>IIIIII LOVEEEEE remixxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx........</h1>
    </div>
   </Modal>
  )
}

export default card




//------------------------------------< Action >---------------------------------------------------

export async function action({ request, params }: { request: Request; params : Params }) {
  console.log("Params city Id  from /weather/id.jsx  action function => ",params.id);
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
  else{
    console.log("Method type from /weather/id.jsx  action2 view more function => ",request.method);
      if(params.id){
          const cityRef = doc(db, 'users/1/userCities', params.id);
          const citySnap = await getDoc(cityRef);

          if (citySnap.exists()) {
              //console.log(citySnap.data());
              
              const cityData = await getWeatherData(citySnap.data().city);
              console.log(cityData);
              
              return cityData;
          }
      }
      return 'hii there how are you, u got this honey...';
  }
}


//------------------------------------< Loader >------------------------------------------------


export async function loader({params}:{params : Params}){
  return null
}

