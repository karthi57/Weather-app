import React from 'react'
import { db, deleteDoc,doc} from "~/componets/firebase";

interface Params {
  cityId?: string;
  // slug?: string;
  // [key: string]: string | undefined; // Optional if dynamic keys are expected
}

function weatherCards() {
  return (
    <div>WeatherCards</div>
  )
}

export default weatherCards


export async function action({ request, params }: { request: Request; params : Params }) {

    if (!params.cityId) {
      return new Response("Document ID is missing", { status: 400 });
    }
    try {
      await deleteDoc(doc (db, `users/1/userCities`, params.cityId) );
    } catch (error) {
      console.error("Error deleting document:", error);
      return new Response("Failed to delete document", { status: 500 });
    }
  return null;
}

