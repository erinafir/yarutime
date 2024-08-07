import { Outlet } from "react-router-dom";
import Sidebar from "../component/Sidebar";

export default function HomePage() {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <Outlet />
            </div>
        </>
    )
}