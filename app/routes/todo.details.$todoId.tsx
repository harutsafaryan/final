import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, Link, Outlet, useLoaderData, useLocation, useNavigate, useNavigation, useSearchParams } from "@remix-run/react";
import { useRef, useState } from "react";
import invariant from "tiny-invariant";
import { createCheck } from "~/models/checks.server";
import { getTodoById } from "~/models/todos.server";
import { requireUserId } from "~/session.server";

const statuses = ['UNKNOWN', 'SUCCESS', 'FAIL', 'PASSED']

export async function loader({ params }: LoaderFunctionArgs) {
    invariant(params.todoId, "todoId not found");
    const todoId = Number(params.todoId);
    const todo = await getTodoById(todoId);
    return json({ todo });
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    let { status, value, text, comment, todoId} = Object.fromEntries(formData);
    todoId = Number(todoId);
    value = value !== '' ? value : null;

    const userId = await requireUserId(request);
    const check = await createCheck({status, value, text, comment, todoId, userId });

    return redirect('/todos');
}



export default function TodoPage() {
    const { todo } = useLoaderData<typeof loader>();
    const [value, setValue] = useState("");
    const [showHistory, setShowHistory] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const commentRef = useRef<HTMLTextAreaElement>(null);
    const valueRef = useRef<HTMLInputElement>(null);
    const textRef = useRef<HTMLInputElement>(null);

    const isHistoryView = location.pathname.endsWith('history');

    return (
        <div>

            <Form method="POST">
                <p>Title: {todo?.title}</p>
                <p>definition: {todo?.definition}</p>
                <p>criteria: {todo?.criteria}</p>
                <p>created: {todo?.createdAt}</p>
                <input type="hidden" name="todoId" value={todo?.id}></input>


                <label className="flex w-full flex-col gap-1">
                    <span>Status: </span>
                    <fieldset className="mt-4">
                        <legend className="sr-only">Notification method</legend>
                        <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                            {statuses.map((notificationMethod, index) => (
                                <div key={index} className="flex items-center">
                                    <input
                                        id={index.toString()}
                                        name="status"
                                        value={notificationMethod}
                                        type="radio"
                                        defaultChecked={index.toString() === '0'}
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor={index.toString()} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                                        {notificationMethod}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </fieldset>
                </label>

                <label>
                <span>Numeric value: </span>
                    <input
                        ref={valueRef}
                        name="value"
                        type="number" step=".01"
                    ></input>
                </label>

                
                <label>
                <span>Any value: </span>
                    <input
                        ref={textRef}
                        name="text"
                        type="text"
                    ></input>
                </label>

                <label className="flex w-full flex-col gap-1">
                    <span>Comment: </span>
                    <textarea
                        ref={commentRef}
                        name="comment"
                        className="w-full flex-1 rounded-md border-2 border-blue-500 px-3 py-2 text-lg leading-6"
                        rows={4}>
                    </textarea>
                </label>

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