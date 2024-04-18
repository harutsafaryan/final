import { json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { getTodos } from "~/models/todos.server";

export async function loader() {
    const todos = await getTodos();

    return json({ todos });
}

export default function Todos() {
    const { todos } = useLoaderData<typeof loader>();
    const navigate = useNavigate();

    return (
        <p>
            todos count is: {todos.length}
            <button onClick={() => navigate('/todos/new')}>New</button>
            <table className="border-collapse border border-slate-500">
                <thead>
                    <tr className="border border-slate-600">
                        <th className="border border-slate-600">Id</th>
                        <th className="border border-slate-600">Description</th>
                        <th className="border border-slate-600">Interval</th>
                        <th className="border border-slate-600">Created At</th>
                        <th className="border border-slate-600">Updated At</th>
                        <th className="border border-slate-600">User</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr>
                            <td className="border border-slate-700 px-3">{todo.id}</td>
                            <td className="border border-slate-700 px-3">{todo.description}</td>
                            <td className="border border-slate-700 px-3">{todo.interval}</td>
                            <td className="border border-slate-700 ps-3">{todo.createdAt}</td>
                            <td className="border border-slate-700 ps-3">{todo.updatedAt}</td>
                            <td className="border border-slate-700 ps-3">{todo.userId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Outlet />
        </p>
    )
}