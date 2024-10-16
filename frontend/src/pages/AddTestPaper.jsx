import { Link, useParams } from "react-router-dom";
import { ArrowLeftToLine } from "lucide-react";
import { useState } from "react";

import axios from "axios";

function AddTestPaper() {
    const { name, type } = useParams();

    const [section,setSection] = useState("Select Here");
    const [questionType,setQuestionType] = useState("Select Here");

    const [sectionsArray, setSectionsArray] = useState([
        {
            sectionTitle: "",
            questions: []
        }
    
    ]);

    const [mcq,setMcq] = useState({
        type: "MCQ",
        mcq:{
            question:"",
            options: [],
            correctAnswer: ""
        }
    })

    const [optionA,setOptionA] = useState("");
    const [optionB,setOptionB] = useState("");
    const [optionC,setOptionC] = useState("");
    const [optionD,setOptionD] = useState("");
    

    const [shortAnswer, setShortAnswer] = useState({
        type:"ShortAnswer",
        shortAnswer:{
            question: ""                       
        }
    })

    const API_URL = "http://localhost:3000";


    const handleAdd = async (e) => {
        e.preventDefault();
        const submit = confirm("Are you sure you want to add ?")
        if (submit) {
            console.log(submit)
        } else {
            console.log(submit)
        }
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const submit = confirm("Are you sure you want to post the Question Paper ?")
        if (submit){
            const response = await axios.post(`${API_URL}/api/testPaper`,{type})
            console.log(response.data);
        } 
    }
    
    return (
        <div>
            <div className="flex justify-center border py-5 mt-2 shadow-lg">
                <h1 className="text-md font-medium">{name.toUpperCase()} - ADD TEST PAPER</h1>
                
                <div>
                    {/* {JSON.stringify(options)} */}
                    {/* {JSON.stringify(mcq)} */}
                </div>
            </div>

            <div className="h-[32rem] border shadow-lg mt-5 mx-5 p-10">
                <div className="pb-5">
                    <Link to={`/dashboard`} className="text-blue-500 flex items-center"><ArrowLeftToLine /><span className="text-lg">DASHBOARD</span></Link>
                </div>

                <div className="py-5 px-10 shadow-sm">
                    <form  >

                        {/* Form row 1 */}
                        <div className="grid grid-cols-2">
                            <div className="flex gap-5 items-center">
                                <label className="font-bold">Section</label>
                                <select 
                                    className="w-[200px] px-10 py-1 border rounded-full border-blue-500"
                                    value = {section}
                                    onChange = {(e)=> {
                                        setSection(e.target.value)                                        
                                    }}    
                                >
                                    <option disabled>Select Here</option>
                                    <option value="Section A">Section A</option>
                                    <option value="Section B">Section B</option>
                                    <option value="Section C">Section C</option>
                                    <option value="Section D">Section D</option>
                                    <option value="Section E">Section E</option>
                                </select>
                            </div>

                            <div className="flex gap-5 items-center">
                                <label className="font-bold">Question Type</label>
                                <select 
                                    className="w-[200px] px-10 py-1 border rounded-full border-blue-500"
                                    value = {questionType}
                                    onChange={(e)=> setQuestionType(e.target.value)}
                                >
                                    <option disabled>Select Here</option>
                                    <option value="MCQ">MCQ</option>
                                    <option value="ShortAnswer">Short Answer</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-10">
                            {/* form row 2 */}
                            <div className="flex flex-row">
                                <label className="font-bold basis-1/5">Question</label>
                                <input 
                                    type="text" 
                                    className="border-2 basis-4/5 focus:outline-none focus:border-blue-500 px-1"                                    
                                />
                            </div>

                            {/* Conditional rendering MCQ*/}
                            { questionType === "MCQ" 
                                && 
                                <div className="mt-10">
                                <div className="flex flex-row">
                                    <label className="font-bold basis-1/5">Options</label>
                                    <div className="basis-4/5 max-w-sm">
                                        <div className="grid grid-cols-2 gap-2">
                                            <label>A</label>
                                            <input 
                                                type="text" 
                                                className="border-2 focus:outline-none focus:border-blue-500"                                                 
                                            ></input>
                                            <label>B</label>
                                            <input 
                                                type="text" 
                                                className="border-2 focus:outline-none focus:border-blue-500"                                                     
                                            ></input>
                                            <label>C</label>
                                            <input 
                                                type="text" 
                                                className="border-2 focus:outline-none focus:border-blue-500"                                                    
                                            ></input>
                                            <label>D</label>
                                            <input 
                                                type="text" 
                                                className="border-2 focus:outline-none focus:border-blue-500"                                                   
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-10 flex flex-row">
                                    <label className="font-bold basis-1/5">Correct Answer</label>
                                    <input 
                                        type="text" 
                                        className="border-2 focus:outline-none focus:border-blue-500 basis-4/5"                                        
                                    />
                                </div>
                            </div>                           
                            }
                            
                        </div>
                        <div className="mt-5 flex justify-end gap-2">
                            <button onClick={handleAdd} className="border px-5 py-1 text-white bg-red-500 rounded-full">Add</button>
                            <button onClick={handleSubmit} className="border px-5 py-1 text-white bg-blue-500 rounded-full">Post</button>
                        </div>
                    </form>
                </div>

            </div>

        </div>
    )
}

export default AddTestPaper;