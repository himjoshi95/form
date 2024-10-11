import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PDFGenerator from "../components/PDFGenerator";



function Certificate() {
    const {userId} = useParams();
    const [name,setName] = useState("");
    const [course,setCourse] = useState("");
    const [score,setScore] = useState("");

    const API_URL = "http://localhost:3000";

    useEffect(()=>{
        axios.get(`${API_URL}/api/user/certificate?userId=${userId}`)
        .then(response =>{
            // console.log(response.data);
            const participantName = `${response.data.userDetails.title.slice(0,1)}${response.data.userDetails.title.slice(1).toLowerCase()} ${response.data.userDetails.firstName} ${response.data.userDetails.lastName}`
            setName(participantName);
            setCourse(response.data.trainingDetails.name)
            // console.log("----------------")
            // console.log(JSON.stringify(response.data.percentile))
            const percentile = JSON.stringify(response.data.percentile);
            setScore(percentile)            
        }).catch(error=>{
            console.log(error);
        })
    },[userId])

    return (
        <div>
            <div className="flex justify-center border py-2 mt-2 shadow-lg">
                <h1 className="text-xl uppercase font-medium">Certificate</h1>
            </div>

            <div className="h-fit max-w-lg py-2 px-2 mt-2 mx-5 shadow-lg flex justify-between">
                <div>
                    <div className="flex gap-5 text-lg py-5 border-b">
                        <p>Name :</p>
                        <p>{name.length > 0 ? name : 'Loading....'}</p>
                    </div>
                    <div className="flex gap-5 text-lg py-5 border-b">
                        <p>Course :</p>
                        <p>{course.length > 0 ? course : 'Loading....'}</p>
                    </div>
                    <div className="flex gap-5 text-lg py-5 border-b">
                        <p>Percentile :</p>
                        <p>{score.length > 0 ? `${score} %` : 'Loading....'}</p>
                    </div>
                </div>
                <div>
                    {/* <button className="border px-2 py-1">Generate PDF</button> */}
                    <PDFGenerator userId={userId}/>
                </div>
            </div>
        </div>
    )
}


export default Certificate;