import { LoaderFunctionArgs, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react";

import ChecksList from "~/components/ChecksList";
import { getChecks } from "~/models/checks.server";
import { requireUserId } from "~/session.server";

export async function loader({request} : LoaderFunctionArgs) {
    await requireUserId(request);
    const checks = await getChecks()

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

export default function Checks() {
    const { checks } = useLoaderData<typeof loader>();
    const c = checks as unknown as Check[];

    return (
        <ChecksList checksList={c}/>
    )
}