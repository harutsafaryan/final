import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getCheckById, getChecksByTodoId } from "~/models/checks.server";
import { getTodoById } from "~/models/todos.server";

export async function loader({ params }: LoaderFunctionArgs) {
    invariant(params.todoId, "todoId not found");
    const todoId = Number(params.todoId);
    const checks = await getChecksByTodoId(todoId);
    return json({ checks });
}

export default function ChecksHistory() {
    const {checks} = useLoaderData<typeof loader>();

    return (
        <ul>
            {checks.map(check => (
                <li key={check.id}>
                    {check.record}
                </li>
            ))}
        </ul>
    )
}