import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import ChecksList from "~/components/ChecksList";
import { getChecksByTodoId } from "~/models/checks.server";

export async function loader({ params }: LoaderFunctionArgs) {
    invariant(params.todoId, "todoId not found");
    const todoId = params.todoId;
    const checks = await getChecksByTodoId(todoId);
    return json({ checks });
}

export default function ChecksHistory() {
    const {checks} = useLoaderData<typeof loader>();

    return (
        <ChecksList checksList={checks}/>
    )
}