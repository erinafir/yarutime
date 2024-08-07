import { useState } from "react"
import serverApi from "../helper/serverApi"
import Swal from "sweetalert2"

export default function OpenAi() {
    const [prompt, setPrompt] = useState('')
    const [response, setResponse] = useState('')

    const handleInput = async () => {
        try {
            let { data } = await serverApi({
                url: '/chat-openAi',
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`

                },
                data: { prompt: prompt }
            })
            setResponse(data)
            setPrompt('')
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

    return (
        <>
            <div className="mockup-window bg-default border h-screen basis-full">
                <div className="bg-accent text-white flex justify-center px-4 py-10"><h1 className="text-4xl">OpenAi</h1></div>


                <div className="h-screen flex justify-center items-end p-5">
                    <div className=" w-1/2 px-4 py-2">
                        <div className="chat chat-start">
                            <div className="chat-bubble chat-bubble-primary">
                                {prompt}
                            </div>
                        </div>
                        <div className="chat chat-end">
                            <div className="chat-bubble chat-bubble-secondary">{response}</div>
                        </div>
                        <div className="flex">
                            <input
                                className="w-full border rounded-full py-2 px-4 mr-2"
                                type="text"
                                placeholder="Type your message..."
                                onChange={(e) => { setPrompt(e.target.value) }}
                            />
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full" onClick={() => handleInput()}>
                                Send
                            </button>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}