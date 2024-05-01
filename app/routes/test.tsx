import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Form, Link, useLoaderData, useSearchParams } from "@remix-run/react";
import { url } from "inspector";
import MonthChange from "~/components/MonthChange";
import { getChecksByDateInterval, getChecksByMonth, groupCheckByDate } from "~/models/checks.server";
import { getMonthIndex, getMonthName } from "~/utility/helper";

export async function loader({ request }: LoaderFunctionArgs) {

    const url = new URL(request.url);
    const month = url.searchParams.get('month');
    const checks = await getChecksByMonth(month);
    return json(checks);
}

export default function Test() {

    const [searchParams, setSearchParams] = useSearchParams();
    const checks = useLoaderData<typeof loader>();

    let month = searchParams.get('month');
    if (!month) {
        let m = new Date().getMonth();
        month = getMonthName(m);
    }
    const days = getDays(month, checks);

    return (
        <div>
            <MonthChange/>
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
        </div>
    )
}



function getDays(month: string | null, checks: []) {
    const year = 2024;
    const today = new Date();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    const todayDay = today.getDate();

    let monthIndex;
    if (month === null) {
        monthIndex = todayMonth;
    }
    else {
        monthIndex = getMonthIndex(month);
    }

    console.log('days...', monthIndex)
    let daysCount = 30;
    const dates = [];

    // console.log('checks... ', checks.find(e => e.id === 10));



    if (monthIndex === 0 || monthIndex === 2 || monthIndex === 4 || monthIndex === 6 || monthIndex === 7 || monthIndex === 9 || monthIndex === 11)
        daysCount = 31;
    else if (monthIndex === 1 && year % 4 === 0)
        daysCount = 29;
    else if (monthIndex === 1 && year % 4 !== 0)
        daysCount = 28;


    const startWeekDay = new Date(year, monthIndex, 1).getDay();
    const endtWeekDay = new Date(year, monthIndex, daysCount).getDay();

    let daysBefore = 0;
    if (startWeekDay === 0)
        daysBefore = 6;
    else
        daysBefore = startWeekDay - 1;

    let daysAfter = 0;
    if (endtWeekDay === 0)
        daysAfter = 0;
    else
        daysAfter = 7 - endtWeekDay;

    for (let i = 1 - daysBefore; i <= daysCount + daysAfter; i++) {
        dates.push({
            date: new Date(year, monthIndex, i),
            isCurrentMonth: i > 0 && i <= daysCount,
            isToday: i === todayDay && monthIndex === todayMonth,
            events: checks.filter(e => e.day === i).map(e => ({ id: e.id, name: e.todo.title }))
        })
    }

    console.log('dates: ', dates);
    return dates;
}

function classNames(...classes: Array<String>) {
    return classes.filter(Boolean).join(' ')
}
