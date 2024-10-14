import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function Feedback() {

    const { userId } = useParams();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');

    const [feedback,setFeedback] = useState('');
    

    const API_URL = "http://localhost:3000";

    useEffect(() => {
        axios.get(`${API_URL}/api/user/userDetails?filter=${userId}`)
            .then(response => {
                // console.log(response.data)
                setFirstName(response.data.desiredUser.firstName)
            }).catch(err => console.log(err))
    }, []);

    async function SubmitFeedback(){
        
        if(feedback === ''){
            toast.error('Feedback Field is required');
        }else{
            const submit = confirm("Are you sure you want to submit the feedback ?")
            // console.log(submit);
            // console.log("Feedback",feedback);

            const response = await axios.post(`${API_URL}/api/user/submitFeedback`,{
                userId,
                feedback
            })

            console.log(response.data)
            
            toast.success("Feedback Posted");
            setFeedback("");

            await new Promise(r => setTimeout(r,1000));
            navigate(`/certificate/${userId}`);
        }     
    }

    return (
        <div>
            <div className="flex justify-center border py-2 mt-2 shadow-lg">
                <h1 className="text-md font-medium">FeedBack - {firstName.length > 0 && firstName}</h1>
            </div>

            <div className="mx-5 mt-5 shadow-lg px-2 flex justify-center pb-1">
                <div>                    
                    <textarea placeholder="Feedback here...." onChange={(e)=> setFeedback(e.target.value)}
                    className="px-2 py-1 w-[500px] h-[300px] focus:outline-none border bg-slate-100"
                    value={feedback}></textarea>

                    <div className="pt-2">
                        <button onClick={SubmitFeedback} className="w-full border bg-red-500 text-white py-1 rounded-md">Submit Feedback</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feedback;