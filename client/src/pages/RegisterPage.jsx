
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import serverApi from "../helper/serverApi"

export default function RegisterPage() {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const navigate = useNavigate()
    console.log(fullName, email, password, gender, phoneNumber);
    const handleRegister = async (e) => {
        e.preventDefault()
        try {

            console.log(fullName, email, password, gender, phoneNumber);
            let { data } = await serverApi({
                url: "/user-register",
                method: "POST",
                data: { fullName: fullName, email: email, password: password, gender: gender, phoneNumber: phoneNumber }
            })
            console.log(data);
            navigate('/login')
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message
            });
        }
    }
    return (
        <>
            <div className="md:flex justify-center items-center p-2 content-center">
                <div className="flex justify-center mr-2 basis-1/2">
                    <img
                        src="https://res.cloudinary.com/dmr6zqq1d/image/upload/v1720678794/YaruTime_Logo_Transparent_umherw.png"
                    />
                </div>
                <div className="ml-4 mr-4 basis-1/4">
                    <h3 className="text-4xl mb-3 ">Register Here</h3>
                    <form className="card" onSubmit={handleRegister}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input type="text" placeholder="full name" onChange={(e) => { setFullName(e.target.value) }} className="input input-bordered bg-orange-50" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" onChange={(e) => { setEmail(e.target.value) }} className="input input-bordered bg-orange-50" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" onChange={(e) => { setPassword(e.target.value) }} className="input input-bordered bg-orange-50" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Gender</span>
                            </label>
                            <input type="text" placeholder="gender" onChange={(e) => { setGender(e.target.value) }} className="input input-bordered bg-orange-50" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input type="tel" placeholder="phone number" onChange={(e) => { setPhoneNumber(e.target.value) }} className="input input-bordered bg-orange-50" required />
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Register</button>
                        </div>
                    </form>
                    <label className="w-full max-w-xs">
                        Already have an account?&nbsp;
                        <Link to={'/login'} className="text-blue-800 hover:underline">
                            Login here
                        </Link>
                    </label>
                </div>

            </div>


        </>
    )
}