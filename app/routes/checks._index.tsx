import { json } from "@remix-run/node"
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { generateChecks, getChecks } from "~/models/checks.server";

export async function loader() {
    await generateChecks();
    const checks = await getChecks()

    return json({ checks });
}

export default function Checks() {
    const { checks } = useLoaderData<typeof loader>();

    return (
        <div className="p-3">
            <table className="min-w-full divide-y divide-gray-300">
                <thead>
                    <tr>
                        <th className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Comment</th>
                        <th className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Created At</th>
                        <th className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Updated At</th>
                        <th className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Todo</th>
                        <th className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">User</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {
                        checks.map(check => (
                            <tr key={check.id}>
                            <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{check.comment}</td>
                            <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{new Date(check.createdAt).toLocaleString() }</td>
                            <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{new Date(check.updatedAt).toLocaleString() }</td>
                            <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{check.todoId}</td>
                            <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{check.userId}</td>
                        </tr>        
                        ))
                    }
                </tbody>
            </table>
        </div>

    )
}