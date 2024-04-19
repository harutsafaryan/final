import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getCheckById } from "~/models/checks.server";
import { requireUserId } from "~/session.server";

export async function loader({ params, request }: LoaderFunctionArgs) {
    const userId = await requireUserId(request);
    invariant(params.checkId, "checkId not found");

    const checkId = Number(params.checkId)
    const check = await getCheckById(checkId);

    if (!check) {
        throw new Response("Not Found", { status: 404 });
    }

    return json({ check });
}

export default function CheckPage() {
    const { check } = useLoaderData<typeof loader>();

    return (
        <div>
            <h3 className="text-2xl font-bold">{check.todo.definition}</h3>
            <p className="py-6">{check.todo.location}</p>
            <hr className="my-4" />
            <Form method="post">
                <label>
                    Comments:
                    <input name="comments" type="text"></input>
                </label>
                <button
                    type="submit"
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
                >
                    Save
                </button>
            </Form>
        </div>
    )
}