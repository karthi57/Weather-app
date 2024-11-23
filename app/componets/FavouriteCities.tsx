import React from "react";
import { Form } from "@remix-run/react";
import FavCitiesInput from "./FavCitiesInput";

function FavouriteCities() {
  return (
    <div className="flex">
        <div className="w-1/2">
          <h1 className="p-4">Please Enter 5 Favourite Cities</h1>
          <Form
            method="post"
            className="border-2 m-4 border-white w-[90%] p-8 rounded flex flex-col justify-left items-left"
          >
            <FavCitiesInput inputFor="city" label="City" />
            <FavCitiesInput inputFor="city2" label="City 2" />
            <FavCitiesInput inputFor="city3" label="City 3" />
            <FavCitiesInput inputFor="city4" label="City 4" />
            <FavCitiesInput inputFor="city5" label="City 5" />
            <button className="p-1 m-2  mt-4 bg-blue-400 hover:bg-blue-500 rounded">
             Submit
        </button>
          </Form>
        </div>
    </div>
  );
}

export default FavouriteCities;
