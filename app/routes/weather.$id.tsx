import { redirect } from "@remix-run/react";
import { db, deleteDoc,doc, getDoc} from "~/componets/firebase";

interface Params {
  id?: string;
}
  
  
  

//------------------------------------< Action >---------------------------------------------------

export async function action({ request, params }: { request: Request; params : Params }) {

    if (!params.id) {
      return new Response("Document ID is missing", { status: 400 });
    }
    try {
      await deleteDoc(doc (db, `users/1/userCities`, params.id) );
    } catch (error) {
      console.error("Error deleting document:", error);
      return new Response("Failed to delete document", { status: 500 });
    }
  return redirect('/weather');
}


//-----------<Loader>--------------------
export function loader(){
  return  null;
}

