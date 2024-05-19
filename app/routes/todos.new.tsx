import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { getMethods } from "~/models/method.server";
import { getReferences } from "~/models/reference.server";
import { createTodo } from "~/models/todos.server";
import { requireUserId } from "~/session.server";

export async function action({ request }: ActionFunctionArgs) {
    const userId = await requireUserId(request);

    const formData = await request.formData();
    // const inputs = Object.fromEntries(formData);

    const referenceId = formData.get('referenceId');
    const methodId = formData.get('methodId');
    const title = formData.get('title');
    const definition = formData.get('definition');
    const location = formData.get('location');
    const criteria = formData.get('criteria');
    const comments = formData.get('comments');

    const errors = {};

    if (typeof title !== "string" || title.length === 0)
        errors.title = "Title is required";

    if (typeof definition !== "string" || definition.length === 0)
        errors.definition = "Definition is required";

    if (typeof location !== "string" || location.length === 0)
        errors.location = "Location is required";


    if (typeof criteria !== "string" || criteria.length === 0)
        errors.location = "Criteria is required";

    if (typeof comments !== "string" || comments.length === 0)
        errors.comments = "Comments is required";

    for (let key in errors) {
        return json(
            { errors },
            { status: 400 },
        );
    }

    await createTodo({ title, definition, location, criteria, comments, methodId, referenceId, userId })
    return redirect('/todos');
}

export async function loader() {
    const references = await getReferences();
    const methods = await getMethods();
    return json({ references, methods });
}


export default function NewTodoPage() {
    const actionData = useActionData<typeof action>();
    const { references, methods } = useLoaderData<typeof loader>();

    const titleRef = useRef<HTMLInputElement>(null);
    const definitionRef = useRef<HTMLInputElement>(null);
    const locationRef = useRef<HTMLInputElement>(null);
    const criteriaRef = useRef<HTMLInputElement>(null);
    const commentsRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (actionData?.errors?.title) titleRef.current?.focus();
        if (actionData?.errors?.definition) definitionRef.current?.focus();
        if (actionData?.errors?.location) locationRef.current?.focus();
        if (actionData?.errors?.criteria) criteriaRef.current?.focus();
        if (actionData?.errors?.comments) commentsRef.current?.focus();
    }, [actionData]);


    // const errors = useActionData<typeof action>();

    return (
        <div>
            <h1>new Todo page</h1>
            <Form method="post">
                <div>
                    {/* reference */}
                    <label className="flex w-full flex-col gap-1">
                        <span>Refernce:</span>
                        <select name="referenceId"
                            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
                        >
                            {references.map(reference => (<option value={reference.id}>{reference.name}</option>))}
                        </select>
                    </label>
                    {/* title */}
                    <label className="flex w-full flex-col gap-1">
                        <span>TItle:</span>
                        <input
                            ref={titleRef}
                            type="title"
                            name="title"
                            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
                            aria-invalid={actionData?.errors?.title ? true : undefined}
                            aria-errormessage={actionData?.errors?.title ? "name-error" : undefined}
                        />
                    </label>
                    {actionData?.errors?.title ? (
                        <div className="pt-1 text-red-700" id="title-error">
                            {actionData.errors.title}
                        </div>
                    ) : null}
                    {/* definition */}
                    <label className="flex w-full flex-col gap-1">
                        <span>Definition:</span>
                        <input
                            ref={definitionRef}
                            type="text"
                            name="definition"
                            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
                            aria-invalid={actionData?.errors?.definition ? true : undefined}
                            aria-errormessage={actionData?.errors?.definition ? "name-error" : undefined}
                        />
                    </label>
                    {actionData?.errors?.definition ? (
                        <div className="pt-1 text-red-700" id="title-error">
                            {actionData.errors.definition}
                        </div>
                    ) : null}
                    {/* method */}
                    <label className="flex w-full flex-col gap-1">
                        <span>Method:</span>
                        <select name="methodId"
                            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
                        >
                            {methods.map(method => (<option value={method.id}>{method.name}</option>))}
                        </select>
                    </label>
                    {/* location */}
                    <label className="flex w-full flex-col gap-1">
                        <span>Location:</span>
                        <input
                            ref={locationRef}
                            type="text"
                            name="location"
                            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
                            aria-invalid={actionData?.errors?.location ? true : undefined}
                            aria-errormessage={actionData?.errors?.location ? "name-error" : undefined}
                        />
                    </label>
                    {actionData?.errors?.location ? (
                        <div className="pt-1 text-red-700" id="title-error">
                            {actionData.errors.location}
                        </div>
                    ) : null}
                    {/* criteria */}
                    <label className="flex w-full flex-col gap-1">
                        <span>Criteria:</span>
                        <input
                            ref={criteriaRef}
                            type="text"
                            name="criteria"
                            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
                            aria-invalid={actionData?.errors?.criteria ? true : undefined}
                            aria-errormessage={actionData?.errors?.criteria ? "name-error" : undefined}
                        />
                    </label>
                    {actionData?.errors?.criteria ? (
                        <div className="pt-1 text-red-700" id="title-error">
                            {actionData.errors.criteria}
                        </div>
                    ) : null}
                    {/* comments */}
                    <label className="flex w-full flex-col gap-1">
                        <span>Comments:</span>
                        <input
                            ref={commentsRef}
                            type="text"
                            name="comments"
                            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
                            aria-invalid={actionData?.errors?.comments ? true : undefined}
                            aria-errormessage={actionData?.errors?.comments ? "name-error" : undefined}
                        />
                    </label>
                    {actionData?.errors?.comments ? (
                        <div className="pt-1 text-red-700" id="title-error">
                            {actionData.errors.comments}
                        </div>
                    ) : null}
                </div>
                <button type="submit">Add</button>
            </Form>
        </div>
    )
}