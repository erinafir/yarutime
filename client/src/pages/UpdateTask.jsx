import { useEffect, useState } from "react";
import serverApi from "../helper/serverApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function UpdateTask() {
    const [detail, setDetail] = useState({})
    const [title, setTitle] = useState('')
    const [task, setTask] = useState('')
    const { id } = useParams()
    const navigate = useNavigate()
    console.log(id, typeof id);

    const readDataById = async () => {
        try {
            let { data } = await serverApi({
                url: `/task/${id}`,
                method: 'get',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(data);
            setDetail(data)
            setTitle(data.title)
            setTask(data.task)
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message
            });
        }
    }

    const handleUpdate = async () => {
        try {
            let { data } = await serverApi({
                url: `/task/${id}`,
                method: 'put',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                data: {
                    title: title, task: task
                }
            })
            console.log(data);
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
                        Update Your Task
                    </h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                        Whatever task you need to do now
                    </p>
                </div>
                <div className="w-3/4 mx-auto">
                    <div className="flex flex-wrap -m-2">
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                                    Title
                                </label>
                                <input
                                    value={title}
                                    type="text"
                                    id="name"
                                    name="title"
                                    className="w-full bg-white bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    onChange={(e) => { setTitle(e.target.value) }}
                                />
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label
                                    htmlFor="message"
                                    className="leading-7 text-sm text-gray-600"
                                >
                                    Task
                                </label>
                                <textarea
                                    value={task}
                                    id="message"
                                    name="task"
                                    className="w-full bg-white bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                                    onChange={(e) => { setTask(e.target.value) }}
                                />
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <button className="flex mx-auto text-neutral bg-secondary border-0 py-2 px-5 focus:outline-none hover:bg-secondary rounded text-lg my-1" onClick={handleUpdate}>
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