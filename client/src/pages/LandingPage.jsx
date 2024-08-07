import { Link } from "react-router-dom";

export default function Landing() {
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: "url(https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FmZXxlbnwwfHwwfHx8MA%3D%3D)",
            }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Hello there!</h1>
                    <h3 className="mb-5 text-3xl">Welcome to Yaru!Time</h3>
                    <p className="mb-5">
                        In Japanese, Yaru(やる) is the English verb equivalent of "doing". Yaru!Time is designed to help you do your task efficiently without pressure. It's now Yaru time!
                    </p>
                    <Link to={'/register'}><button className="btn btn-primary text-center m-1">Get Started</button></Link>
                    <Link to={'/login'}><button className="btn btn-secondary text-center m-1">Login Here</button></Link>
                </div>
            </div>
        </div>
    )
}