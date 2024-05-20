import { LoaderFunctionArgs, json } from "@remix-run/node"
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import ChecksList from "~/components/ChecksList";
import { getChecks } from "~/models/checks.server";
import { requireUser, requireUserId } from "~/session.server";

export async function loader({request} : LoaderFunctionArgs) {
    // await generateChecks();
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