import { LiaSpotify } from "react-icons/lia";
import { LiaHomeSolid } from "react-icons/lia";
import { LiaHeart } from "react-icons/lia";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { LiaEllipsisHSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { RiOpenaiFill } from "react-icons/ri";
import serverApi from "../helper/serverApi";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


export default function Sidebar() {
    const [userData, setUserData] = useState({})

    const readDataById = async () => {
        try {
            let { data } = await serverApi({
                url: `/user-detail`,
                method: 'get',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            setUserData(data)
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message
            });
        }
    }

    useEffect(() => {
        readDataById()
    }, [])

    return (
        <>
            <div className="group/sidebar flex flex-col h-screen p-3 w-60 dark:bg-gray-50 dark:text-gray-800">
                <div className="space-y-3">
                    <div className="flex items-center justify-start ms-3">
                        <LiaEllipsisHSolid />
                        <h2 className="ms-3">Dashboard</h2>
                    </div>
                    <div className="flex items-center p-2 mt-12 space-x-4 justify-self-end">
                        <img src="https://i.pinimg.com/750x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg" alt="" className="w-12 h-12 rounded-lg dark:bg-gray-500" />
                        <div>
                            <h2 className="text-lg font-semibold">{userData.fullName}</h2>
                            <span className="flex items-center space-x-1">
                                <Link to={`/app/user-update/${userData.id}`} className="text-xs hover:underline dark:text-gray-600">View profile</Link>
                            </span>
                        </div>
                    </div>
                    <div className="flex-1">
                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                            <li className="rounded-sm">
                                <Link to={'/app'} className="flex items-center p-2 space-x-3 rounded-md">
                                    <LiaHomeSolid size={24} />
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li className="rounded-sm">
                               <Link to={'/app/spotify'} className="flex items-center p-2 space-x-3 rounded-md">
                                    <LiaSpotify size={24} />
                                    <span>Spotify</span>
                                </Link>
                            </li>
                            <li className="rounded-sm">
                               <Link to={'/app/openAI'} className="flex items-center p-2 space-x-3 rounded-md">
                                    <RiOpenaiFill size={24} />
                                    <span>OpenAI</span>
                                </Link>
                            </li>
                            <li className="rounded-sm">
                                <Link to={'/login'} className="flex items-center p-2 space-x-3 rounded-md" onClick={() => { localStorage.clear() }}>
                                    <LiaSignOutAltSolid size={24} />
                                    <span>Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </>
    )
}