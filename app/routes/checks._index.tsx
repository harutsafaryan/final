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

export default function Checks() {
    const { checks } = useLoaderData<typeof loader>();

    return (
        <ChecksList checksList={checks}/>
    )
}