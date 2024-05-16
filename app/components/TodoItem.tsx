import { redirect, useFetcher, useNavigate } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";

function classNames(...classes: Array<String>) {
    return classes.filter(Boolean).join(' ')
}

export default function TodoItem({ todo, last, checkCount }) {
    const fetcher = useFetcher();
    const navigate = useNavigate();
    const isSaving = fetcher.state === 'idle';

    const [record, setRecord] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleSave = () => {
        setIsOpen(false);
    }

    const handleOpen = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        setRecord("");
    }, [isSaving])

    return (
        <div className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow-lg border-2 border-sky-800">
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
                                checks: {fetcher.state === 'idle' ? (checkCount.length === 0 ? 0 : checkCount[0]._count) : <PulseLoader size={5} color="orange" />}
                            </span>
                        </p>
                    </div>
                    <p className="mt-1 truncate text-sm text-gray-500">{todo.definition}</p>
                    <p className="mt-1 truncate text-sm text-gray-500">{todo.location}</p>
                    <p className="mt-1 truncate text-sm text-gray-500">{todo.criteria}</p>

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