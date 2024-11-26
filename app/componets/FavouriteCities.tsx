import React from "react";
import { Form, useNavigation, useActionData } from "@remix-run/react";
//import { fetchingCitiesWithID } from '~/routes/weather'


interface ActionData {
  message?: string; 
}

interface cityArr {
  id: string;
  city: string;
}




function FavouriteCities() {

  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state ==="submitting";
  

  
  
  return (
    
      <div className="w-1/2">
        <h1 className="p-4">Please Enter 5 Favourite Cities</h1>
        <Form
          method="post"
          className="border-2 m-4 border-white w-[90%] p-8 rounded flex flex-col justify-left items-left"
        >
            {actionData?.message && <p className="text-red-600 text-bold">{actionData.message}</p>}
          <p className="p-2">
            <label htmlFor='city' className="mr-4">
              {" "}
              City Name
            </label>
            <input
              type="text"
              id='city'
              name="city"
              className="cityNameInput bg-white rounded p-2 w-[100%] text-black font-semibold"
              disabled = {isSubmitting}
              placeholder="Enter the city Name"
              
              required
            />
          </p>
          <button
           className="p-1 m-2  mt-4 bg-blue-500 hover:bg-blue-400 rounded"
           disabled = {isSubmitting}
           >
           {isSubmitting ? "Submiting..." : "Submit"}
           
          </button>
        </Form>
      </div>
      
    
  );
}

export default FavouriteCities;




