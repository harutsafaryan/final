import { Outlet } from "@remix-run/react";

export default function DetailsPage() {
    return (
        <div>
            <p>Todo Detail page</p>
            <Outlet/>
        </div>
    )
}