// import { redirect } from "@remix-run/react";
// import { db, deleteDoc,doc, getDoc} from "~/componets/firebase";


// interface Params {
//   cityId?: string;
// }
  
// import React from 'react'

// function $cityId() {
//   return (
//     <div>$cityId</div>
//   )
// }

  

// //------------------------------------< Action >---------------------------------------------------

// export async function action({ request, params }: { request: Request; params : Params }) {
//   console.log("Params city Id => ",params.cityId);
  
//    if (!params.cityId) {
//    return new Response("Document ID is missing", { status: 400 });
//   }
//    try {
//      await deleteDoc(doc (db, `users/1/userCities`, params.cityId ));
//    } catch (error) {
//     console.error("Error deleting document:", error);
//     return new Response("Failed to delete document", { status: 500 });
//   }
//   return redirect('/weather');
// }




