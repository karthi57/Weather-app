import type { MetaFunction } from "@remix-run/node";
import { Form,  useActionData } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import  '~/styles/cityInput.css'

export const meta: MetaFunction = () => {
  return [
    { title: "Weather App" },
    { name: "description", content: "Welcome to the Weather app!" },
  ];
};

interface ActionData {
  message: "string";
}

export default function Index() {
  const actionData = useActionData<ActionData>();

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="font-bold m-4 text-2xl">LOGIN PAGE</h1>
      <Form
        method="post"
        className=" small-form border-[0.05rem] border-neutral-950 w-1/3 p-8 rounded flex flex-col justify-left items-left"
      >
        {actionData?.message && (
          <p className="text-red-500">{actionData.message}</p>
        )}

        <p className="m-2">
          <label htmlFor="username" className="mr-4 font-semibold">
            Username
          </label>
          <input
            type="text"
            id="userName"
            className="bg-white rounded p-2 w-[100%] text-black font-semibold"
            name="username"
            placeholder="Enter the username"
           required
          />
        </p>
        <p className="m-2">
          <label htmlFor="password" className="mr-4 font-semibold">
            Password
          </label>
          <input
            type="text"
            id="password"
            className="bg-white rounded p-2 w-[100%] text-black font-semibold"
            name="password"
            placeholder="Enter the password"
            required
          />
        </p>
        <div className="flex items-center justify-center">
          <button className="btn-login p-1 m-2 mt-4 bg-neutral-950 border-[0.5px] border-blue-500 hover:bg-blue-500 rounded font-semibold w-1/3 text-center">
            Login
          </button>
        </div>
      </Form>
    </div>
  );
}

/** Request: This is the Fetch API Request object, representing an HTTP request
   When you write { request: Request } in a function, it specifies =>
   The function parameter is an object with a request property.
    The request property is of type Request.
 */

    export async function action({ request }: { request: Request }) {
      const formData = await request.formData();
      // console.log("Form Entries:", Array.from(formData.entries()));
      //console.log("Action of login called...");
      
    
      // Convert FormData to an object
      const userData = Object.fromEntries(formData);
       
      //checking username and  password 
      
        const inputUserName = userData.username;
        const inputPassword = userData.password;
    
        if (inputUserName === "ipgautomotive" && inputPassword === "carmaker") {
          console.log("SuccessFully Logged in, its ipgautomotive ");
          return redirect("/weather");
        } else
        {
          return {
            message:
              "We couldn't log you in. Double-check your username and password, and Try again.",
          };
        } 
        
      return null;
    }

   