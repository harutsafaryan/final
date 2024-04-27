function classNames(...classes: Array<String>) {
    return classes.filter(Boolean).join(' ')
}

export default function Test() {
    console.log('hello')
    const days = getDays();
    console.log('days: ', days);

    return (
        <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
            <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
                <div className="bg-white py-2">
                    M<span className="sr-only sm:not-sr-only">on</span>
                </div>
                <div className="bg-white py-2">
                    T<span className="sr-only sm:not-sr-only">ue</span>
                </div>
                <div className="bg-white py-2">
                    W<span className="sr-only sm:not-sr-only">ed</span>
                </div>
                <div className="bg-white py-2">
                    T<span className="sr-only sm:not-sr-only">hu</span>
                </div>
                <div className="bg-white py-2">
                    F<span className="sr-only sm:not-sr-only">ri</span>
                </div>
                <div className="bg-white py-2">
                    S<span className="sr-only sm:not-sr-only">at</span>
                </div>
                <div className="bg-white py-2">
                    S<span className="sr-only sm:not-sr-only">un</span>
                </div>
            </div>
            <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
                <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
                    {days.map((day) => (
                        <div
                            key={day.date}
                            className={classNames(
                                day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-500',
                                'relative px-3 py-2'
                            )}
                        >
                            <time
                                dateTime={day.date}
                                className={
                                    day.isToday
                                        ? 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white'
                                        : undefined
                                }
                            >
                                {/* {day.date.split('-').pop().replace(/^0/, '')} */}
                                {day.date.getDate()}
                            </time>
                            {day.events.length > 0 && (
                                <ol className="mt-2">
                                    {day.events.slice(0, 2).map((event) => (
                                        <li key={event.id}>
                                            <a href={event.href} className="group flex">
                                                <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                                                    {event.name}
                                                </p>
                                                <time
                                                    dateTime={event.datetime}
                                                    className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                                                >
                                                    {event.time}
                                                </time>
                                            </a>
                                        </li>
                                    ))}
                                    {day.events.length > 2 && <li className="text-gray-500">+ {day.events.length - 2} more</li>}
                                </ol>
                            )}
                        </div>
                    ))}
                </div>
                <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
                    {days.map((day) => (
                        <button
                            key={day.date}
                            type="button"
                            className={classNames(
                                day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                                (day.isSelected || day.isToday) && 'font-semibold',
                                day.isSelected && 'text-white',
                                !day.isSelected && day.isToday && 'text-indigo-600',
                                !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
                                !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-500',
                                'flex h-14 flex-col px-3 py-2 hover:bg-gray-100 focus:z-10'
                            )}
                        >
                            <time
                                dateTime={day.date}
                                className={classNames(
                                    day.isSelected && 'flex h-6 w-6 items-center justify-center rounded-full',
                                    day.isSelected && day.isToday && 'bg-indigo-600',
                                    day.isSelected && !day.isToday && 'bg-gray-900',
                                    'ml-auto'
                                )}
                            >
                                {/* {day.date.split('-').pop().replace(/^0/, '')} */}
                                {day.date.getDate()}
                            </time>
                            <span className="sr-only">{day.events.length} events</span>
                            {day.events.length > 0 && (
                                <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                                    {day.events.map((event) => (
                                        <span key={event.id} className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
                                    ))}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>


        </div>
    )
}



function getDays() {
    const today = new Date(2024, 2, 5);
    const month = today.getMonth();
    const year = today.getFullYear();

    const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
    const dates = [];

    switch (month) {
        case 0:
        case 2:
        case 4:
        case 6:
        case 7:
        case 9:
        case 11:
            days.push(31);
            break;
        case 1:
            (2024 % 4 === 0) ? days.pop() : days.splice(28, 2);
            break;
        default:
            break;
    }

    days.forEach((day) => dates.push({
        date: new Date(year, month, day),
        isCurrentMonth: true,
        isSelected: false,
        events: []
    }))

    const first = dates[0].date.getDay();
    const last = dates[dates.length - 1].date.getDay();

    console.log('first: ', first)

    if (first !== 1) {
        const newArr = []
        for (let i = 0; i < first-1; i++) {
            newArr.push({
                date: new Date(year, month, -i),
                isCurrentMonth: false,
                isSelected: false,
                events: []
            })
        }

        dates.unshift(...newArr)
    }

    // if (last !== 0) {
    //     for (let i = 1; i < 6; i++) {
    //         dates.push({
    //             date: new Date(year, month+1, i),
    //             isCurrentMonth: false,
    //             isSelected: false,
    //             events: []
    //         })
    //     }
    // }

    return dates;
}