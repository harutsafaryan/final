import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Form, Link, useLoaderData, useSearchParams } from "@remix-run/react";
import { url } from "inspector";
import { useEffect } from "react";
import MonthChange from "~/components/MonthChange";
import MonthChange2 from "~/components/MonthChange2";
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

    const month = searchParams.get('month');
    const year = searchParams.get('year');
    const days = getDays(month, Number(year), checks);

    useEffect(() => {
        const month = searchParams.get('month');
        const year = searchParams.get('year');
        const yearToday = new Date().getFullYear().toString();
        const monthTodayIndex = new Date().getMonth();
        const monthTodayName = getMonthName(monthTodayIndex);

        if (!month)
            setSearchParams((prev) => {
                prev.set('month', monthTodayName);
                return prev;
            })

        if (!year) {
            setSearchParams((prev) => {
                prev.set('year', yearToday);
                return prev;
            })
        }

    }, [searchParams])

    return (
        <div>
            <MonthChange2 />
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
                                key={day.date.toString()}
                                className={classNames(
                                    day.isCurrentMonth ? 'bg-white' : 'bg-gray-100 text-gray-500',
                                    'relative px-3 py-2'
                                )}
                            >
                                <time
                                    dateTime={day.date.toString()}
                                    className={
                                        day.isToday
                                            ? 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white'
                                            : undefined
                                    }
                                >
                                    {day.date.getDate()}
                                </time>
                                {day.checks.length > 0 && (
                                    <ol className="mt-1">
                                        {day.checks.slice(0, 2).map((check) => (
                                            <li key={check.id}>
                                                <div className="group flex">
                                                    <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                                                        {check.name}
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                        {day.checks.length > 2 && <li className="text-gray-500">+ {day.checks.length - 2} more</li>}
                                    </ol>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}



function getDays(month: string | null, year : number, checks: []) {
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
            checks: checks.filter(e => e.day === i).map(e => ({ id: e.id, name: e.todo.title }))
        })
    }

    console.log('dates: ', dates);
    return dates;
}

function classNames(...classes: Array<String>) {
    return classes.filter(Boolean).join(' ')
}