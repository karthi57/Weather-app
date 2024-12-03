
import { Form, useNavigation, useActionData } from "@remix-run/react";
import "~/styles/cityInput.css";

interface ActionData {
  message?: string;
}

function CityInput() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting'

  return (
    <div className="form rounded w-1/3 h-[500px] p-8 bg-neutral-950">
      <h1 className="p-4 font-semibold text-xl italic"> Please Enter Your Favourite City </h1>
      <div className="flex items-center justify-center">
      <Form method="post" className="small-form border-[0.6px] m-2 border-neutral-400 w-[90%] p-8 rounded-md flex flex-col justify-left items-left " >
          {actionData?.message && (<p className="text-red-600 text-bold">{actionData.message}</p>)}

          <p className="m-2">
            <label htmlFor="city" className="mb-4"> {" "} City Name </label>
            <div className="input-container">
              <input type="text" id="city" name="city" disabled={isSubmitting} placeholder="Enter the City Name" required />
            </div>
          </p>

          <div className="flex items-center justify-center p-4">
            <button className="button text-center" disabled={isSubmitting}>
              Submit
            </button>
          </div>
          
        </Form>
      </div>
    </div>
  );
}

export default CityInput;


