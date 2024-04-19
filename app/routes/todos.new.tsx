import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { createTodo } from "~/models/todos.server";
import { requireUserId } from "~/session.server";

export async function action({ request }: ActionFunctionArgs) {
    const userId = await requireUserId(request);

    const formData = await request.formData();
    // const inputs = Object.fromEntries(formData);

    const reference = formData.get('reference');
    const title = formData.get('title');
    const definition = formData.get('definition');
    const method = formData.get('method');
    const location = formData.get('location');
    const criteria = formData.get('criteria');
    const record = formData.get('record');
    const comments = formData.get('comments');

    const errors = {};

    if (typeof reference !== "string" || reference.length === 0)
        errors.reference = "Reference is required";

    if (typeof title !== "string" || title.length === 0)
        errors.title = "Title is required";

    if (typeof definition !== "string" || definition.length === 0)
        errors.definition = "Definition is required";

    if (typeof method !== "string" || (method !== 'DAILY' && method !== 'WEEKLY' && method !== 'MONTLY'))
        errors.method = "Method is required";

    if (typeof location !== "string" || location.length === 0)
        errors.location = "Location is required";


    if (typeof criteria !== "string" || criteria.length === 0)
        errors.location = "Criteria is required";


    if (typeof record !== "string" || record.length === 0)
        errors.record = "Record is required";


    if (typeof comments !== "string" || comments.length === 0)
        errors.comments = "Comments is required";

    for (let key in errors) {
        return json(
            { errors },
            { status: 400 },
        );
    }

    await createTodo({ reference, title, definition, method, location, criteria, record, comments, userId })
    return redirect('/todos');
}


export default function NewTodoPage() {
    const actionData = useActionData<typeof action>();

    const referenceRef = useRef<HTMLInputElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const definitionRef = useRef<HTMLInputElement>(null);
    const methodRef = useRef<HTMLInputElement>(null);
    const locationRef = useRef<HTMLInputElement>(null);
    const criteriaRef = useRef<HTMLInputElement>(null);
    const recordRef = useRef<HTMLInputElement>(null);
    const commentsRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (actionData?.errors?.reference) referenceRef.current?.focus();
        if (actionData?.errors?.title) titleRef.current?.focus();
        if (actionData?.errors?.definition) definitionRef.current?.focus();
        if (actionData?.errors?.method) methodRef.current?.focus();
        if (actionData?.errors?.location) locationRef.current?.focus();
        if (actionData?.errors?.criteria) criteriaRef.current?.focus();
        if (actionData?.errors?.record) recordRef.current?.focus();
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
                        <input
                            ref={referenceRef}
                            type="text"
                            name="reference"
                            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
                            aria-invalid={actionData?.errors?.reference ? true : undefined}
                            aria-errormessage={actionData?.errors?.reference ? "name-error" : undefined}
                        />
                    </label>
                    {actionData?.errors?.reference ? (
                        <div className="pt-1 text-red-700" id="title-error">
                            {actionData.errors.reference}
                        </div>
                    ) : null}
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
                        <input
                            ref={methodRef}
                            type="text"
                            name="method"
                            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
                            aria-invalid={actionData?.errors?.method ? true : undefined}
                            aria-errormessage={actionData?.errors?.method ? "name-error" : undefined}
                        />
                    </label>
                    {actionData?.errors?.method ? (
                        <div className="pt-1 text-red-700" id="title-error">
                            {actionData.errors.method}
                        </div>
                    ) : null}
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
                    {/* record */}
                    <label className="flex w-full flex-col gap-1">
                        <span>Record:</span>
                        <input
                            ref={locationRef}
                            type="text"
                            name="record"
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