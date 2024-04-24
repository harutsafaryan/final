import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, Outlet, useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { getTodos } from "~/models/todos.server";
import { createCheck, lastAction } from "~/models/checks.server";
import { requireUserId } from "~/session.server";
import TodoItem from "~/components/TodoItem";
import TodoList from "~/components/TodoList";

export async function loader() {
    const todos = await getTodos();
    const lastActions = await lastAction();

    return json({ todos, lastActions });
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
    const { todos, lastActions } = useLoaderData<typeof loader>();

    console.log('lastactions: ',lastActions)
    const navigate = useNavigate();

    return (
        <div>
            <div>
                <button className="rounded-full bg-white px-2.5 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" onClick={() => navigate('/todoNew')}>New</button>
            </div>
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-1">
                {todos.map((todo) => (
                    <li key={todo.id} >
                        <TodoItem todo={todo} key={todo.id} last={lastActions.filter(e => e.todoId === todo.id)}/>
                    </li>
                ))}
            </ul>
            <TodoList todos={todos} />
            <Outlet />
        </div>
    )
}

