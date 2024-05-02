import { Form, Link, useSearchParams, useSubmit } from "@remix-run/react";
import { useState } from "react";

export default function MonthChange2() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const years = ['2023', '2024', '2025', '2026', '2027', '2028'];

    const [searchParams, setSearchParams] = useSearchParams();

    const [m, setM] = useState('June');
    const [y, sety] = useState('2023');

    const checked = searchParams.get('month');

    return (
        <div className="mb-3">
            {months.map((month) =>
                <Link to={`?month=${month}&year=${y}`}
                    type="button"
                    className={`rounded-full ${month === checked ? 'bg-sky-200' : 'bg-white drop-shadow shadow-black'} m-2 px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-sky-100`}
                >
                    {month}
                </Link>)}

            <button onClick={() => sety('2023')} className="m-2">2023</button>
            <button onClick={() => sety('2024')} className="m-2">2024</button>
            <button onClick={() => sety('2025')} className="m-2">2025</button>

            {months.map(month => (
                <button
                    onClick={() => {
                        setSearchParams((searchParams) => {
                            searchParams.set('month', month);
                            return searchParams;
                        })
                    }}
                    className={`rounded-full ${month === checked ? 'bg-sky-200' : 'bg-white drop-shadow shadow-black'} m-2 px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-sky-100`}
                >
                    {month}
                </button>
            ))}
        </div>

    )
}