import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, Link, Outlet, useLoaderData, useLocation, useNavigate, useNavigation, useSearchParams } from "@remix-run/react";
import { useState } from "react";
import invariant from "tiny-invariant";
import { createCheck } from "~/models/checks.server";
import { getTodoById } from "~/models/todos.server";
import { requireUserId } from "~/session.server";

export async function loader({ params }: LoaderFunctionArgs) {
    invariant(params.todoId, "todoId not found");
    const todoId = Number(params.todoId);
    const todo = await getTodoById(todoId);
    return json({ todo });
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    let { todoId, record } = Object.fromEntries(formData);
    todoId = Number(todoId);

    const userId = await requireUserId(request);
    const check = await createCheck({ record, todoId, userId });

    return redirect('/todos');
}

export default function TodoPage() {
    const { todo } = useLoaderData<typeof loader>();
    const [value, setValue] = useState("");
    const [showHistory, setShowHistory] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const isHistoryView = location.pathname.endsWith('history');

    return (
        <div>

            <Form method="POST">
                <p>Title: {todo?.title}</p>
                <p>definition: {todo?.definition}</p>
                <p>criteria: {todo?.criteria}</p>
                <p>created: {todo?.createdAt}</p>
                <input type="hidden" name="todoId" value={todo?.id}></input>
                <input name="record" placeholder="please type here..." value={value} onChange={(e) => setValue(e.target.value)}></input>
                <div className="flex space-x-4">
                    <button className="bg-sky-700 p-1">Save</button>
                    <button className="bg-gray-500 p-1">Cancel</button>
                </div>
            </Form>
            <div className="mt-4">
                {isHistoryView
                    ? <button onClick={() => navigate(-1)} className="p-1 border-2 rounded border-sky-500 hover:bg-sky-300">hide history</button>
                    : <button onClick={() => navigate('history')} className="p-1 border-2 rounded border-sky-500 hover:bg-sky-300">show history</button>
                }
                <Outlet />
            </div>
        </div>
    )
}