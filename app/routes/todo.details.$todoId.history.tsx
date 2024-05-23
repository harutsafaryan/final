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

interface Check {
    id : string;
    status : string;
    value : number;
    text : number;
    createdAt : string
    comment : string;
    year : number;
    month : number
    day : number;
    todo: {
        title: string;
    }
    user : {
        name : string
    }
}

export default function ChecksHistory() {
    const {checks} = useLoaderData<typeof loader>();
    const c = checks as unknown as Check[];
    return (
        <ChecksList checksList={c}/>
    )
}