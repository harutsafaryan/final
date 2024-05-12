import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, Link, Outlet, useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { getTodos } from "~/models/todos.server";
import { checkCount, createCheck, lastAction } from "~/models/checks.server";
import { requireUserId } from "~/session.server";
import TodoItem from "~/components/TodoItem";
import TodoList from "~/components/TodoList";

export async function loader({ request }: LoaderFunctionArgs) {
    await requireUserId(request);
    const todos = await getTodos();
    const lastActions = await lastAction();
    const checkCounts = await checkCount();

    return json({ todos, lastActions, checkCounts });
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    let { todoId, record } = Object.fromEntries(formData);
    todoId = Number(todoId);

    const userId = await requireUserId(request);
    const check = await createCheck({ record, todoId, userId });

    return null;
}

export default function Todos() {
    const { todos, lastActions, checkCounts } = useLoaderData<typeof loader>();
    const navigate = useNavigate();

    return (
        <div>
            <div className="flex space-x-3 mb-2 justify-center">
                <p className="sm:text-lg text-center font-bold">{todos.length !== 0 ? "Todo list" : "Todo list is empty"}</p>
                <button className="rounded-full bg-white px-2.5 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" onClick={() => navigate('/todoNew')}>new </button>
            </div>
            <ul role="list" className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {todos.map((todo) => (
                    <Link to={`../todo/details/${todo.id}`} key={todo.id} >
                        <TodoItem
                            todo={todo}
                            key={todo.id}
                            last={lastActions.filter(e => e.todoId === todo.id)}
                            checkCount={checkCounts.filter(e => e.todoId === todo.id)}
                        />
                    </Link>
                ))}
            </ul>
            <Outlet/>
        </div>
    )
}

