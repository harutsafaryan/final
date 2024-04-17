import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getTodos } from "~/models/todos.server";

export async function loader() {
    const todos = await getTodos();

    return json({ todos });
}

export default function Todos() {
    const { todos } = useLoaderData<typeof loader>();

    return (
        <p>
            todos count is: {todos.length}
        </p>
    )
}