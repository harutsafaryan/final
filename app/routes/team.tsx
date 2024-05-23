import { ActionFunctionArgs, json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import React from "react";

import { deleteUserById, getUsers } from "~/models/user.server"
import { requireUserId } from "~/session.server";

export async function loader() {
  const users = await getUsers();
  return json({ users });
}

export async function action({ request }: ActionFunctionArgs) {
  await requireUserId(request);

  const formData = await request.formData();
  const userIdForDelete = formData.get("id") as string;
  return await deleteUserById(userIdForDelete);
}

export default function Team() {
  const { users } = useLoaderData<typeof loader>();

  return (
    <ul className="divide-y divide-gray-100">
      {users.map(user => <Member key={user.id} user={user} />)}
    </ul>
  )
}

interface MemberProps {
  id : string;
  name : string;
  email : string;
  role : string
} 

const Member : React.FC<{user :MemberProps }> =  ({ user }) => {
  const fetcher = useFetcher();
  const isDeleting = fetcher.state !== "idle";

  return (
    <li key={user.email} className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={user.imageUrl} alt="" /> */}
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">{user.name}</p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">{user.email}</p>
        </div>
      </div>
      <fetcher.Form method="post">
        <button
          type="submit"
          name="id"
          value={user.id}
          className="rounded bg-red-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </fetcher.Form>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="text-sm leading-6 text-gray-900">{user.role}</p>
      </div>
    </li>
  )
}
