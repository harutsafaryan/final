import { json } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react";
import { generateChecks, getChecks } from "~/models/checks.server";

export async function loader() {
    await generateChecks();
    const checks = await getChecks()

    return json({ checks });
}

export default function Checks() {
    const { checks } = useLoaderData<typeof loader>();

    return (
        <div>
            <p>checks count: {checks.length}</p>
            <ul>
                {checks.map(check => (
                    <li key={check.id}>
                        <Link to={`${check.id}`}>{check.comment}</Link>
                    </li>
                ))}
            </ul>
        </div>

    )
}