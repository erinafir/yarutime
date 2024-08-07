import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../store/fetch";
import { useEffect } from "react";
import Swal from "sweetalert2";
import serverApi from "../helper/serverApi";

export default function Task() {
    const dispatch = useDispatch()
    const task = useSelector(state => {
        // console.log(state, 'useselector');
        return state.fetch.tasks
    }
    )
    // console.log(task, '...component');

    const handleDelete = async (id) => {
        try {
            let { data } = await serverApi({
                url: `/task/${id}`,
                method: 'delete',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(fetchData())
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
        dispatch(fetchData())
    }, [])


    return (
        <>
            <div className="mockup-window h-screen bg-default border basis-full">
                <div className="bg-secondary flex justify-center px-4 py-10"><h1 className="text-4xl">Tasks</h1></div>
                <Link to={'/app/add'} className="ms-10 mt-3"><button className="btn btn-outline btn-neutral">Add Task</button></Link>
                <div className="overflow-x-auto p-10">
                    <table className="table bg-accent">
                        {/* head */}
                        <thead>
                            <tr className="text-lg">
                                <th>#</th>
                                <th>Title</th>
                                <th>Task</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {task?.map((el, idx) => {
                                return (
                                <tr className="hover text-base" key={el.id}>
                                    <th>{idx+1}</th>
                                    <td>{el.title}</td>
                                    <td>{el.task}</td>
                                    <td className="flex">
                                        <Link to={`/app/update/${el.id}`}><button className="btn btn-sm btn-outline btn-white me-1">Edit</button></Link>
                                        <button className="btn btn-sm btn-neutral me-1" onClick={()=>{handleDelete(el.id)}}>Delete</button>
                                    </td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}