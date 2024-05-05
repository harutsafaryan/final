export default function ({checksList}) {

    if (!checksList) 
        return (
            <p>no checks</p>
    )

    return (
        <ul className="flex justify-between gap-x-6 py-5">
            {checksList.map(check => (
                <li key={check.id} className="flex justify-between gap-x-6 py-5"    >
                    <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{check.todo.title}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{check.record}</p>
                    </div>
                </li>
            ))}
        </ul>
    )
}