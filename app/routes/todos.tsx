import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { getTodos } from "~/models/todos.server";
import { BsChevronDoubleLeft } from "react-icons/bs";
import { BsChevronBarContract } from "react-icons/bs";
import { GoChecklist } from "react-icons/go";
import { createCheck } from "~/models/checks.server";
import { requireUserId } from "~/session.server";

export async function loader() {
    const todos = await getTodos();

    return json({ todos });
}

// export async function action({request} : ActionFunctionArgs) {
//     console.log('action going on');
//     const formData = await request.formData();
//     const {todoId} = Object.fromEntries(formData);
//     const userId = await requireUserId(request);
//     const check = await createCheck({todoId, userId});

//     return redirect(`/checks/${check.id}`)
// }

export default function Todos() {
    const { todos } = useLoaderData<typeof loader>();
    const navigate = useNavigate();

    return (
        <>
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {todos.map((todo) => (
                    <li key={todo.id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                        <div className="flex w-full items-center justify-between space-x-6 p-6">
                            <div className="flex-1 truncate">
                                <div className="flex items-center space-x-3">
                                    <h3 className="truncate text-sm font-medium text-gray-900">{todo.title}</h3>
                                    <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                        {todo.reference}
                                    </span>
                                </div>
                                <p className="mt-1 truncate text-sm text-gray-500">{todo.definition}</p>
                            </div>
                            {/* <img className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src={todo.imageUrl} alt="" /> */}
                        </div>
                        <div>
                            <div className="-mt-px flex divide-x divide-gray-200">
                                <Form className="flex w-0 flex-1">
                                    <button type="submit" name="todoId" value={todo.id}
                                        className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                    >
                                        <GoChecklist className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        Comply
                                    </button>
                                </Form>
                                <div className="-ml-px flex w-0 flex-1">
                                    <a
                                        href={`tel:${todo.location}`}
                                        className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                    >
                                        <BsChevronBarContract className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        Call
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>


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
                            <tr key={todo.id}>
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
                {/* <Outlet /> */}
            </p>
        </>
    )
}