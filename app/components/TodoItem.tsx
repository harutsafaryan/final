import { redirect, useFetcher, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { GoChecklist, GoCheck } from "react-icons/go";
import PulseLoader from "react-spinners/PulseLoader";
import ClipLoader from "react-spinners/PulseLoader";

export default function TodoItem({ todo, last, checkCount }) {
    const fetcher = useFetcher();
    const navigate = useNavigate();
    const isSaving = fetcher.state === 'idle';
    console.log('count: ', checkCount)

    const [showRecord, setShowRecord] = useState(true);
    const [record, setRecord] = useState("");

    return (
        <div className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
            <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                        <h3 className="truncate text-sm font-medium text-gray-900">{todo.title}</h3>
                        <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            {todo.reference.name}
                        </span>
                        <p>Last action:
                            <span>
                                {fetcher.state === 'idle' ? calculateLastAction(last) : <PulseLoader size={5} color="orange" />}
                            </span>
                        </p>
                        <p>
                            <span>
                            checks: {fetcher.state === 'idle' ? checkCount[0]._count : <PulseLoader size={5} color="orange" />}
                            </span>
                        </p>
                    </div>
                    <p className="mt-1 truncate text-sm text-gray-500">{todo.definition}</p>
                    <p className="mt-1 truncate text-sm text-gray-500">{todo.location}</p>
                    <p className="mt-1 truncate text-sm text-gray-500">{todo.criteria}</p>
                    {showRecord && <input placeholder="record" className="border border-gray-800" onChange={(e) => setRecord(e.target.value)} />}
                </div>
                {/* <img className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src={todo.imageUrl} alt="" /> */}
            </div>
            <div>
                <div className="flex flex-row divide-x divide-gray-200">
                    <div className="flex basis-1/3">
                        <button type="button" onClick={() => setShowRecord(!showRecord)}
                            className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                        >
                            <GoChecklist className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            Comply
                        </button>
                    </div>
                    <div className="flex basis-1/3">
                        <button type="button" onClick={() => navigate(`/todoEdit/${todo.id}`)}>
                            Edit
                        </button>
                    </div>
                    <fetcher.Form method="post" className="flex basis-2/3 hover:bg-green-500">
                        <input title="todoId" type="hidden" name="todoId" value={todo.id} />
                        <input title="record" type="hidden" name="comment" value={record} />
                        <button type="submit"
                            className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                        >
                            <GoCheck className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            {isSaving ? 'Save' : 'Saving...'}
                        </button>
                    </fetcher.Form>
                </div>
            </div>
        </div>
    )
}

function calculateLastAction(history) {
    if (history.length === 0) {
        return 'no history';
    }
    else {
        const last = new Date(history[0]?._max.createdAt).toDateString();
        return last;
    }
}