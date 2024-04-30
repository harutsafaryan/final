import { useState } from "react"

export default function MonthChange({ checked }) {
    const [selected, setSelected] = useState();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    return (
        <div>
            {months.map(month => (
                <button type="button"
                    className="rounded-full  bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    disabled={month === checked}
                >
                    {month}
                </button>
            ))}
        </div>
    )
}