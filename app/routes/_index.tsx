import type { MetaFunction } from "@remix-run/node";
import { Form,  useActionData } from "@remix-run/react";
import { redirect } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Weather App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

interface ActionData {
  message: "string";
}

export default function Index() {
  const actionData = useActionData<ActionData>();

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1>LOGIN PAGE</h1>
      <Form
        method="post"
        
        className="border-2 border-white w-1/3 p-8 rounded flex flex-col justify-left items-left"
      >
        {actionData?.message && (
          <p className="text-red-500">{actionData.message}</p>
        )}

        <p className="m-2">
          <label htmlFor="username" className="mr-4">
            Username
          </label>
          <input
            type="text"
            id="userName"
            className="bg-white rounded p-2 w-[100%] text-black font-semibold"
            name="username"
            required
          />
        </p>
        <p className="m-2">
          <label htmlFor="password" className="mr-4">
            Password
          </label>
          <input
            type="text"
            id="password"
            className="bg-white rounded p-2 w-[100%] text-black font-semibold"
            name="password"
            required
          />
        </p>
        <button className="p-1 m-2  mt-4 bg-blue-400 hover:bg-blue-500 rounded">
          Login
        </button>
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
      console.log("Action of login called...");
      
    
      // Convert FormData to an object
      const userData = Object.fromEntries(formData);
       
      //Adding data to Firebase
      try {
        const inputUserName = userData.username;
        const inputPassword = userData.password;
    
        if (inputUserName === "i" && inputPassword === "c") {
          console.log("Sucesss, its him");
          return redirect("/weather");
        } else {
          return {
            message:
              "We couldn't log you in. Double-check your username and password, and Try again.",
          };
        }
      } catch (error) {
        console.error("Something went wrong", error);
        return new Response("Error uploading data", { status: 500 });
      }
      
    }
