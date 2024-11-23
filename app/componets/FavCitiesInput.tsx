import React from "react";

interface Props {
  inputFor: string;
  label: string;
}

function FavCitiesInput({ inputFor, label }: Props) {
  return (
    <>
      <p className="p-2">
        <label htmlFor={inputFor} className="mr-4">
          {" "}
          {label}
        </label>
        <input
          type="text"
          id={inputFor}
          name={inputFor}
          className="bg-white rounded p-2 w-[100%] text-black font-semibold"
          required
        />
      </p>
    </>
  );
}

export default FavCitiesInput;
