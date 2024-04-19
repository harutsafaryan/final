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
                        <th className="border border-slate-600">reference</th>
                        <th className="border border-slate-600">title</th>
                        <th className="border border-slate-600">definition</th>
                        <th className="border border-slate-600">method</th>
                        <th className="border border-slate-600">location</th>
                        <th className="border border-slate-600">criteria</th>
                        <th className="border border-slate-600">record</th>
                        <th className="border border-slate-600">comments</th>
                        <th className="border border-slate-600">Created At</th>
                        <th className="border border-slate-600">Updated At</th>
                        <th className="border border-slate-600">User</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr>
                            <td className="border border-slate-700 px-3">{todo.id}</td>
                            <td className="border border-slate-700 px-3">{todo.reference}</td>
                            <td className="border border-slate-700 px-3">{todo.title}</td>
                            <td className="border border-slate-700 ps-3">{todo.definition}</td>
                            <td className="border border-slate-700 ps-3">{todo.method}</td>
                            <td className="border border-slate-700 ps-3">{todo.location}</td>
                            <td className="border border-slate-700 ps-3">{todo.criteria}</td>
                            <td className="border border-slate-700 ps-3">{todo.record}</td>
                            <td className="border border-slate-700 ps-3">{todo.comments}</td>
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