import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react";
import { getChecks } from "~/models/checks.server";

export async function loader() {
    const checks = await getChecks()

    return json({ checks });
}

export default function Checks() {
    const {checks} = useLoaderData<typeof loader>();

    return (
        <p>checks count: {checks.length}</p>
    )
}