import { redirect, useFetcher, useNavigate } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { GoChecklist, GoCheck } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import PulseLoader from "react-spinners/PulseLoader";
import ClipLoader from "react-spinners/PulseLoader";
import { MdOutlineChevronRight } from "react-icons/md";
import { FiArrowRight } from "react-icons/fi";

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
                    <div className="flex">
                        <button onClick={handleOpen}
                            className={`flex items-center bg-slate-200 rounded-full border-2 border-sky-700 h-8 w-8
                                        cursor-pointer duration-300`}>
                            <FiArrowRight className={`text-lg ${isOpen && "rotate-180"} duration-300`} />
                        </button>
                        <input placeholder={todo.criteria}
                            value={record}
                            className={`flex-auto border-2 border-sky-700 rounded-tr ${!isOpen ? 'scale-0' : "scale-x-100"} duration-500`}
                            onChange={(e) => setRecord(e.target.value)}
                        />
                    </div>
                </div>
                {/* <img className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src={todo.imageUrl} alt="" /> */}
            </div>
            <div>
                <div className="flex flex-row divide-x divide-gray-200">
                    <div className="flex basis-1/2">
                        <button type="button"
                            className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                            onClick={() => navigate(`/todoEdit/${todo.id}`)}>
                            Edit
                        </button>
                    </div>
                    <fetcher.Form method="post" className="flex basis-1/2 ">
                        <input title="todoId" type="hidden" name="todoId" value={todo.id} />
                        <input title="record" type="hidden" name="record" value={record}
                        />
                        <button type="submit"
                            onClick={handleSave}
                            className={classNames(
                                record && isOpen ? "transition duration-1000 bg-emerald-400" : "transition duration-500 bg-slate-100",
                                "relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                            )}
                        >
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