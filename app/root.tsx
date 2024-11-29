import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { useRouteError } from "@remix-run/react";
import "~/styles/cityLists.css"

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href:"https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}


export default function App() {
  return <Outlet />;
}


export function ErrorBoundary() {
  const error = useRouteError();
  console.error("error from root => ",error);
    // Check if error is an object and safely display its details
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body className=" flex h-screen justify-center " >
       <main className="error-box w-1/3 h-[300px]  mt-24 p-12 text-center felx  border-red-500 ">
       <h1 className="text-3xl text-red-400 font-semibold m-2">Something Went Wrong...😟</h1>
        <p className="text-4xl text-red-500 font-semibold m-2">404</p>
       <h1 className="text-4xl text-red-500 font-bold m-2">Not Found</h1>
       <h1 className="text-xl text-red-400 font-bold m-2 capitalize">{errorMessage}</h1>

       </main>
        <Scripts />
      </body>
    </html>
  );
}

