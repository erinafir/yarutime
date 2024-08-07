import { useEffect, useState } from "react";
import serverApi from "../helper/serverApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function UpdateProfile() {
    const [detail, setDetail] = useState({})
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const { id } = useParams()
    const navigate = useNavigate()

    const readDataById = async () => {
        try {
            let { data } = await serverApi({
                url: `/user-detail`,
                method: 'get',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(data);
            setDetail(data)
            setFullName(data.fullName)
            setEmail(data.email)
            setGender(data.gender)
            setPhoneNumber(data.phoneNumber)
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message
            });
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            let { data } = await serverApi({
                url: `/user-update/${id}`,
                method: 'put',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                data: { fullName: fullName, email: email, gender: gender, phoneNumber: phoneNumber }
            })
            console.log(data);
            navigate('/app')
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
            {/* <section className="text-gray-600 body-font relative"> */}
            <div className="px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                        Update Your Profile
                    </h1>
                </div>
                <div className="w-3/4 mx-auto">
                    <div className="flex flex-wrap -m-2">
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                                    full name
                                </label>
                                <input
                                    value={fullName}
                                    type="text"
                                    id="name"
                                    name="title"
                                    className="w-full bg-white bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    onChange={(e) => { setFullName(e.target.value) }}
                                />
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                                    email
                                </label>
                                <input
                                    value={email}
                                    type="text"
                                    id="name"
                                    name="title"
                                    className="w-full bg-white bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    onChange={(e) => { setEmail(e.target.value) }}
                                />
                            </div>
                        </div>
                        
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                                    gender
                                </label>
                                <input
                                    value={gender}
                                    type="text"
                                    id="name"
                                    name="title"
                                    className="w-full bg-white bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    onChange={(e) => { setGender(e.target.value) }}
                                />
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                                    phone number
                                </label>
                                <input
                                    value={phoneNumber}
                                    type="text"
                                    id="name"
                                    name="title"
                                    className="w-full bg-white bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    onChange={(e) => { setPhoneNumber(e.target.value) }}
                                />
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <button className="flex mx-auto text-neutral bg-secondary border-0 py-2 px-5 focus:outline-none hover:bg-secondary rounded text-lg my-1" onClick={() => handleUpdate()}>
                                Update
                            </button>
                            <Link to={'/app'}><button className="flex mx-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg my-1">
                                Cancel
                            </button></Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* </section> */}
        </>
    )
}