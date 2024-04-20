import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import { getUser } from "~/session.server";
import stylesheet from "~/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ user: await getUser(request) });
};

export default function App() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Layout user={user}>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

function Layout({ children, user }: any) {

  return (
    <>
      <nav className="bg-yellow-500 flex space-x-4 justify-center">
        {
          [
            ['Todos', '/todos'],
            ['Checks', '/checks'],
            ['Machines', '/machines'],
            ['Login', '/login'],
            ['Logout', '/logout'],
            ['Register', '/register']
          ].map(([title, url], index) => (
            <Link key={index} to={url} className="text-gray-900 hover:text-white rounded-md px-3 py-2 text-sm font-medium">{title}</Link>
          ))
        }
        <p className="text-gray-900 rounded-md px-3 py-2 text-sm font-medium absolute right-0">{user && user.email}</p>
      </nav>
      <div className="container">
        {children}
      </div>
    </>
  )
}