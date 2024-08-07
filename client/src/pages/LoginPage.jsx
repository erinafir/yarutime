import axios from 'axios'
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2";
import serverApi from '../helper/serverApi';

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            let { data } = await serverApi({
                url: "/user-login",
                method: "POST",
                data: { email: email, password: password }
            })
            localStorage.setItem("token", data.access_token)
            navigate('/app')
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message
            });
        }
    }

    async function handleCredentialResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        const googleToken = response.credential;
        try {
            const {data} = await axios({
                url: "https://server-yarutime.rinafira.my.id/user-login/google",
                method: "POST",
                data: { googleToken }
            })
            localStorage.setItem("token", data.access_token)
            navigate('/app')
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        window.google.accounts.id.initialize({
            client_id: "375929147115-5ha3641k9dgum5vu3vsegpidsefnm9ml.apps.googleusercontent.com",
            callback: handleCredentialResponse
        });
        window.google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { theme: "outline", size: "large" }  // customization attributes
        );
        window.google.accounts.id.prompt(); // also display the One Tap dialog
    }, [])

    return (
        <>
            <div className="md:flex justify-center items-center p-2 content-center">
                <div className="flex justify-center mr-2 basis-1/2">
                    <img
                        src="https://res.cloudinary.com/dmr6zqq1d/image/upload/v1720678794/YaruTime_Logo_Transparent_umherw.png"
                        className="size"
                    />
                </div>
                <div className="ml-4 mr-4 basis-1/4">
                    <h3 className="text-4xl mb-3 ">Login Here</h3>
                    <form className="" onSubmit={handleLogin}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" onChange={(e)=>{setEmail(e.target.value)}} className="input input-bordered bg-orange-50" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" onChange={(e)=>{setPassword(e.target.value)}} className="input input-bordered bg-orange-50" required />
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-secondary">Login</button>
                        </div>
                    </form>
                    <label className="w-full max-w-xs mt-2">
                        Already have an account?&nbsp;
                        <Link to={'/register'} className="text-blue-800 hover:underline">
                            Register here
                        </Link>
                    </label>
                    <div className="mt-2 pt-2 flex justify-center border-t-2 border-stone-600" id="buttonDiv">

                    </div>
                </div>
            </div>


        </>
    )
}