/* eslint-disable jsx-a11y/label-has-associated-control */
import { Status } from "@prisma/client";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { Form, Outlet, useLoaderData, useLocation, useNavigate } from "@remix-run/react";
import { useRef } from "react";
import { redirectWithToast } from "remix-toast";
import invariant from "tiny-invariant";

import TodoInfo from "~/components/TodoInfo";
import { createCheck } from "~/models/checks.server";
import { getTodoById } from "~/models/todos.server";
import { requireUserId } from "~/session.server";


const statuses = Object.keys(Status);
type StatusKeys = keyof typeof Status;


export async function loader({ params }: LoaderFunctionArgs) {
    invariant(params.todoId, "todoId not found");
    const todoId = params.todoId;
    const todo = await getTodoById(todoId);
    return json({ todo });
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();

    const commentValue = formData.get('comment') as string;
    const textValue = formData.get('text') as string;
    const floatValue = formData.get('value') as string;
    const todoId = formData.get('todoId') as string;
    const status = formData.get('status') as StatusKeys;

    const value = floatValue ? parseFloat(floatValue) : null;
    const text = textValue !== '' ? textValue : null;
    const comment = commentValue !== '' ? commentValue : null;

    const userId = await requireUserId(request);
    await createCheck({ status, value, text, comment, todoId, userId });
    return redirectWithToast('/todos', {message: 'You succesfully create check', type : 'info'});
}

export default function TodoPage() {
    const { todo } = useLoaderData<typeof loader>();
    const navigate = useNavigate();
    const location = useLocation();

    const commentRef = useRef<HTMLTextAreaElement>(null);
    const valueRef = useRef<HTMLInputElement>(null);
    const textRef = useRef<HTMLInputElement>(null);

    const isHistoryView = location.pathname.endsWith('history');
    console.log('textRef.current?.value: ', textRef.current?.value)


    return (
        <div>
            <Form method="POST">
                <TodoInfo todo={todo} />
                <input type="hidden" name="todoId" value={todo?.id}></input>

                <label className="flex w-full flex-col gap-1">
                    <span>Status: </span>
                    <fieldset className="mt-4">
                        <legend className="sr-only">Notification method</legend>
                        <div className="space-y-4 sm:flex sm:items-center sm:space-x-5 sm:space-y-0">
                            {statuses.map((status, index) => (
                                <div key={index} className="flex items-center">
                                    <input
                                        id={index.toString()}
                                        name="status"
                                        value={status}
                                        type="radio"
                                        defaultChecked={index.toString() === '0'}
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor={index.toString()} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                                        {status}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </fieldset>
                </label>

                <div>

                    <label htmlFor="value" className="block text-sm font-medium leading-6 text-gray-900">
                        <span>Numeric value </span>
                        <input
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:w-96 sm:text-sm sm:leading-6"
                            ref={valueRef}
                            name="value"
                            type="number" step=".01"
                        ></input>
                    </label>
                </div>


                <div>

                    <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                        <span>Any value </span>
                        <input
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:w-96 sm:text-sm sm:leading-6"
                            ref={textRef}
                            name="text"
                            type="text"
                        ></input>
                    </label>
                </div>

                <label className="flex w-full flex-col gap-1">
                    <span>Comment </span>
                    <textarea
                        ref={commentRef}
                        name="comment"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:w-96 sm:text-sm sm:leading-6"
                        rows={4}>
                    </textarea>
                </label>

                <div className="flex space-x-4 mt-2">
                    <button
                        className="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  hover:bg-gray-50"
                    >
                        Save
                    </button>
                    <button
                        className="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
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