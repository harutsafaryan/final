import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect, useRef } from "react";

import { getReferences } from "~/models/reference.server";
import { createTodo } from "~/models/todos.server";
import { requireUserId } from "~/session.server";

export async function action({ request }: ActionFunctionArgs) {
    const userId = await requireUserId(request);

    const formData = await request.formData();
    // const inputs = Object.fromEntries(formData);

    const referenceId = formData.get('referenceId') as string;
    const methodId = formData.get('methodId') as string;
    const title = formData.get('title') as string;
    const definition = formData.get('definition') as string;
    const location = formData.get('location') as string;
    const criteria = formData.get('criteria') as string;
    const comments = formData.get('comments') as string;

interface Errors {
    title : string | null,
    definition : string |  null,
    location : string | null,
    criteria : string | null,
    comments : string | null
}

    const errors : Errors = {
        title : null,
        definition : null,
        location : null,
        criteria : null,
        comments : null
    };

    if (typeof title !== "string" || title.length === 0)
        errors.title = "Title is required";

    if (typeof definition !== "string" || definition.length === 0)
        errors.definition = "Definition is required";

    if (typeof location !== "string" || location.length === 0)
        errors.location = "Location is required";


    if (typeof criteria !== "string" || criteria.length === 0)
        errors.criteria = "Criteria is required";

    if (typeof comments !== "string" || comments.length === 0)
        errors.comments = "Comments is required";

    for (const key in errors) {
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
    return json({ references });
}


export default function NewTodoPage() {
    const actionData = useActionData<typeof action>();
    const { references } = useLoaderData<typeof loader>();

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
        <Form method="post">
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Title
                            </label>
                            <div className="mt-2">
                                <input
                                    ref={titleRef}
                                    type="text"
                                    name="title"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    aria-invalid={actionData?.errors?.title ? true : undefined}
                                    aria-errormessage={actionData?.errors?.title ? "name-error" : undefined}
                                    autoComplete="given-name"
                                />
                                {actionData?.errors?.title ? (
                                    <div className="pt-1 text-red-700" id="title-error">
                                        {actionData.errors.title}
                                    </div>
                                ) : null}
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Definition
                            </label>
                            <div className="mt-2">
                                <input
                                    ref={definitionRef}
                                    type="text"
                                    name="definition"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    aria-invalid={actionData?.errors?.definition ? true : undefined}
                                    aria-errormessage={actionData?.errors?.definition ? "name-error" : undefined}
                                    autoComplete="family-name"
                                />
                                {actionData?.errors?.definition ? (
                                    <div className="pt-1 text-red-700" id="title-error">
                                        {actionData.errors.definition}
                                    </div>
                                ) : null}
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="reference" className="block text-sm font-medium leading-6 text-gray-900">
                                Method
                            </label>
                            <div className="mt-2">
                                <select
                                    id="reference"
                                    name="referenceId"
                                    autoComplete="country-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    {references.map(reference => (<option value={reference.id}>{reference.name}</option>))}
                                </select>
                            </div>
                        </div>


                        <div className="col-span-3">
                            <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                Location
                            </label>
                            <div className="mt-2">
                                <input
                                    ref={locationRef}
                                    type="text"
                                    name="location"
                                    id="location"
                                    autoComplete="street-address"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {actionData?.errors?.location ? (
                                    <div className="pt-1 text-red-700" id="title-error">
                                        {actionData.errors.location}
                                    </div>
                                ) : null}
                            </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                            <label htmlFor="criteria" className="block text-sm font-medium leading-6 text-gray-900">
                                Criteria
                            </label>
                            <div className="mt-2">
                                <input
                                    ref={criteriaRef}
                                    type="text"
                                    name="criteria"
                                    id="criteria"
                                    autoComplete="address-level2"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {actionData?.errors?.criteria ? (
                                    <div className="pt-1 text-red-700" id="title-error">
                                        {actionData.errors.criteria}
                                    </div>
                                ) : null}
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="comments" className="block text-sm font-medium leading-6 text-gray-900">
                                Comments
                            </label>
                            <div className="mt-2">
                                <input
                                    ref={commentsRef}
                                    type="text"
                                    name="comments"
                                    id="comments"
                                    autoComplete="address-level1"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        We'll always let you know about important changes, but you pick what else you want to hear about.
                    </p>

                    <div className="mt-10 space-y-10">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                            <div className="mt-6 space-y-6">
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="comments"
                                            name="comments"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="comments" className="font-medium text-gray-900">
                                            Comments
                                        </label>
                                        <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                                    </div>
                                </div>
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="candidates"
                                            name="candidates"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        {actionData?.errors?.comments ? (
                                            <div className="pt-1 text-red-700" id="title-error">
                                                {actionData.errors.comments}
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="candidates" className="font-medium text-gray-900">
                                            Candidates
                                        </label>
                                        <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                                    </div>
                                </div>
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="offers"
                                            name="offers"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="offers" className="font-medium text-gray-900">
                                            Offers
                                        </label>
                                        <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
                            <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
                            <div className="mt-6 space-y-6">
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="push-everything"
                                        name="push-notifications"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                                        Everything
                                    </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="push-email"
                                        name="push-notifications"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Same as email
                                    </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="push-nothing"
                                        name="push-notifications"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                                        No push notifications
                                    </label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Save
                </button>
            </div>
        </Form>
    )
}