import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { createTodo } from "~/models/todos.server";
import { requireUserId } from "~/session.server";

export async function action({ request }: ActionFunctionArgs) {
    const userId = await requireUserId(request);

    const formData = await request.formData();
    const description = formData.get('description');
    const interval = formData.get('interval');

    if (typeof description !== "string" || description.length === 0) {
        return json(
            { errors: { description: "Description is required" } },
            { status: 400 },
        );
    }

    if (typeof interval !== "string" || (interval !== 'DAILY' && interval !== 'WEEKLY' && interval !== 'MONTLY'))
        return json(
            { errors: { interval: "Interval value isn't correct" } },
            { status: 400 },
        );

    const todo = await createTodo({ description, interval, userId });
    return redirect('/todos');
}


export default function NewTodoPage() {
    const actionData = useActionData<typeof action>();

    const descriptionRef = useRef<HTMLInputElement>(null);
    const intervalRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (actionData?.errors?.description) {
            descriptionRef.current?.focus();
        }

        if (actionData?.errors?.interval) {
            intervalRef.current?.focus();
        }

    }, [actionData]);

    // const errors = useActionData<typeof action>();

    return (
        <div>
            <h1>new Todo page</h1>
            <Form method="post">
                <div>
                    <label className="flex w-full flex-col gap-1">
                        <span>Todo description:</span>
                        <input
                            ref={descriptionRef}
                            type="text"
                            name="description"
                            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
                            aria-invalid={actionData?.errors?.description ? true : undefined}
                            aria-errormessage={actionData?.errors?.description ? "name-error" : undefined}
                        />
                    </label>
                    {actionData?.errors?.description ? (
                        <div className="pt-1 text-red-700" id="title-error">
                            {actionData.errors.description}
                        </div>
                    ) : null}
                    <label className="flex w-full flex-col gap-1">
                        <span>Todo interval:</span>
                        <input
                            ref={intervalRef}
                            type="text"
                            name="interval"
                            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
                            aria-invalid={actionData?.errors?.interval ? true : undefined}
                            aria-errormessage={actionData?.errors?.interval ? "name-error" : undefined}
                        />
                    </label>
                    {actionData?.errors?.interval ? (
                        <div className="pt-1 text-red-700" id="title-error">
                            {actionData.errors.interval}
                        </div>
                    ) : null}
                </div>
                <button type="submit">Add</button>
            </Form>
        </div>
    )
}