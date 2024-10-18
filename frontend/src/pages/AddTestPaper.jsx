import { Link, useParams } from "react-router-dom";
import { ArrowLeftToLine, BookMarked, SquarePlus, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import axios from "axios";

function AddTestPaper() {
    const { name, type } = useParams();

    const API_URL = "http://localhost:3000";

    const [sectionsArray, setSectionsArray] = useState([
        {
            sectionTitle: "",
            questions: [],
        },
    ]);

    // Function to handle adding a new section
    const addNewSection = () => {
        setSectionsArray([
            ...sectionsArray,
            { sectionTitle: "", questions: [] },  // Empty new section
        ]);
    };

    // Function to remove a section by index
    const removeSection = (sectionIndex) => {
        const newSections = sectionsArray.filter((_, index) => index !== sectionIndex);
        setSectionsArray(newSections);
    };

    // Function to handle adding a new question to a specific section
    const addNewQuestion = (sectionIndex) => {
        const newSections = [...sectionsArray];
        newSections[sectionIndex].questions.push({
            type: "MCQ",  // Default type is MCQ
            mcq: {
                question: "",
                options: ["", "", "", ""],  // 4 empty options
                correctAnswer: "",
                maxMarks: "",
            },
           
        });
        setSectionsArray(newSections);
    };

    // Function to remove a question from a specific section
    const removeQuestion = (sectionIndex, questionIndex) => {
        const newSections = [...sectionsArray];
        newSections[sectionIndex].questions = newSections[sectionIndex].questions.filter(
            (_, index) => index !== questionIndex
        );
        setSectionsArray(newSections);
    };

    // Function to handle changes to the section title
    const handleSectionTitleChange = (index, value) => {
        const newSections = [...sectionsArray];
        newSections[index].sectionTitle = value;
        setSectionsArray(newSections);
    };

    // Function to handle changes to a question's fields
    const handleQuestionChange = (sectionIndex, questionIndex, field, value) => {
        const newSections = [...sectionsArray];
        const question = newSections[sectionIndex].questions[questionIndex];

        // Handle question type change
        if (field === "type") {
            question.type = value;

            // Remove irrelevant fields based on question type
            if (value === "MCQ") {
                delete question.shortAnswer;
                question.mcq = {
                    question: "",
                    options: ["", "", "", ""],
                    correctAnswer: "",
                    maxMarks: "",
                };
            } else if (value === "ShortAnswer") {
                delete question.mcq;
                question.shortAnswer = {
                    question: "",
                    answer: "",
                    maxMarks: "",
                };
            }
        } else if (field === "mcqQuestion") {
            question.mcq.question = value;
        } else if (field.startsWith("option")) {
            const optionIndex = parseInt(field.replace("option", "")) - 1;
            question.mcq.options[optionIndex] = value;
        } else if (field === "correctAnswer") {
            question.mcq.correctAnswer = value;
        } else if (field === "shortAnswerQuestion") {
            question.shortAnswer.question = value;
        } else if (field === "shortAnswer") {
            question.shortAnswer.answer = value;
        } else if (field === "maxMarks") {
            question.maxMarks = value;  // Set maxMarks
        }else if (field === "mcqMaxMarks") {
            question.mcq.maxMarks = value;
        } else if (field === "shortAnswerMaxMarks") {
            question.shortAnswer.maxMarks = value;
        }

        setSectionsArray(newSections);
    };

    // Handle submitting the test paper to the backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        const submit = confirm("Are you sure you want to post the Question Paper?");
        if (submit) {
            try {
                const response = await axios.post(`${API_URL}/api/testPaper`, {
                    type,
                    sections: sectionsArray,  // Send sectionsArray in the correct format
                });
                console.log(response.data);
                toast.success("Succesfully added Test Paper")
            } catch (error) {
                console.error("Error submitting the test paper:", error);
            }
        }
    };


    return (
        <div>
            <div className="flex justify-center border py-5 mt-2 shadow-lg">
                <h1 className="text-md font-medium">{name.toUpperCase()} - ADD TEST PAPER</h1>
            </div>

            <div className="h-fit border shadow-lg mt-5 mx-5 p-10">
                <div className="pb-5">
                    <Link to={`/dashboard`} className="text-blue-500 flex items-center"><ArrowLeftToLine /><span className="text-lg">DASHBOARD</span></Link>
                </div>

                {/* Section Form */}
                {sectionsArray.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="border border-blue-300 p-5 mt-5 rounded-lg">
                        <div className="flex flex-row">
                            <label className="font-bold basis-1/4">Section Title:</label>
                            <div className="basis-1/2">
                                <input
                                    type="text"
                                    value={section.sectionTitle}
                                    onChange={(e) => handleSectionTitleChange(sectionIndex, e.target.value)}
                                    className="border-2 px-2 py-1 w-full rounded-md focus:outline-none focus:border-blue-500"
                                    placeholder="Section Title (e.g., Section A, Section B)"
                                />
                            </div>
                            <div className="basis-1/4 px-2">
                                <button
                                    onClick={() => removeSection(sectionIndex)}
                                    className="px-2 py-1 text-red-500"
                                >
                                    <Trash2 />
                                </button>
                            </div>
                        </div>

                        {/* Questions for this section */}
                        {section.questions.map((question, questionIndex) => (
                            <div key={questionIndex} className="mt-5 border-2 border-green-300 p-2 py-5 rounded-md">
                                {/* Question Type Selector */}
                                <div className="flex flex-row">
                                    <label className="font-bold basis-1/4">Question Type:</label>
                                    <div className="basis-1/2">
                                        <select
                                            value={question.type}
                                            onChange={(e) => handleQuestionChange(sectionIndex, questionIndex, "type", e.target.value)}
                                            className="border-2 px-2 py-1 w-full focus:outline-none focus:border-blue-500 rounded"
                                        >
                                            <option value="MCQ">MCQ</option>
                                            <option value="ShortAnswer">Short Answer</option>
                                        </select>
                                    </div>
                                    <div className="basis-1/4 px-2">
                                        <button
                                            onClick={() => removeQuestion(sectionIndex, questionIndex)}
                                            className="px-2 py-1 text-red-500"
                                        >
                                            <Trash2 />
                                        </button>
                                    </div>
                                </div>

                                {/* MCQ Input Fields */}
                                {question.type === "MCQ" && (
                                    <div className="mt-5">
                                        <div className="flex flex-row">
                                            <label className="font-bold basis-1/4">Question {questionIndex + 1}:</label>
                                            <div className="basis-3/4">
                                                <input
                                                    type="text"
                                                    value={question.mcq.question}
                                                    onChange={(e) => handleQuestionChange(sectionIndex, questionIndex, "mcqQuestion", e.target.value)}
                                                    className="border-2 px-2 py-1 w-full focus:outline-none rounded focus:border-blue-500"
                                                    placeholder="Enter MCQ question"
                                                />
                                            </div>
                                        </div>

                                        {/* MCQ Options */}
                                        <div className="grid grid-cols-2 gap-4 mt-5">
                                            {["option1", "option2", "option3", "option4"].map((option, i) => (
                                                <div key={i}>
                                                    <label className="font-bold">Option {i + 1}:</label>
                                                    <input
                                                        type="text"
                                                        value={question.mcq.options[i]}
                                                        onChange={(e) => handleQuestionChange(sectionIndex, questionIndex, option, e.target.value)}
                                                        className="border-2 px-2 py-1 w-full rounded focus:outline-none focus:border-blue-500"
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        {/* Correct Answer 1
                                        <div className="mt-5 flex flex-row">
                                            <label className="font-bold basis-1/4">Correct Answer:</label>
                                            <div className="basis-3/4">
                                                <input
                                                    type="text"
                                                    value={question.mcq.correctAnswer}
                                                    onChange={(e) => handleQuestionChange(sectionIndex, questionIndex, "correctAnswer", e.target.value)}
                                                    className="border-2 px-2 py-1 w-full rounded focus:outline-none focus:border-blue-500"
                                                    placeholder="Enter correct answer"
                                                />
                                            </div>
                                        </div> */}
                                        
                                        {/* Correct Answer 2 */}
                                        <div className="mt-5 flex flex-row">
                                            <label className="font-bold basis-1/4">Correct Answer:</label>
                                            <div className="basis-3/4">
                                                <select
                                                    value={question.mcq.correctAnswer}
                                                    onChange={(e) => handleQuestionChange(sectionIndex, questionIndex, "correctAnswer", e.target.value)}
                                                    className="border-2 px-2 py-1 w-full focus:outline-none focus:border-blue-500 rounded"
                                                >   
                                                    <option>Please select Correct Answer</option>
                                                    <option value="Option 1">Option 1</option>
                                                    <option value="Option 2">Option 2</option>
                                                    <option value="Option 3">Option 3</option>
                                                    <option value="Option 4">Option 4</option>

                                                </select>
                                                
                                            </div>
                                        </div>

                                        {/* Max Marks for MCQ */}
                                        <div className="mt-5 flex flex-row">
                                            <label className="font-bold basis-1/4">Max Marks:</label>
                                            <div className="basis-3/4">
                                                <input
                                                    type="number"
                                                    value={question.maxMarks}
                                                    onChange={(e) => handleQuestionChange(sectionIndex, questionIndex, "mcqMaxMarks", e.target.value)}
                                                    className="border-2 px-2 py-1 w-full rounded focus:outline-none focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                    placeholder="Enter maximum marks"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Short Answer Input Field */}
                                {question.type === "ShortAnswer" && (
                                    <div className="mt-5">
                                        <div className="flex flex-row">
                                            <label className="font-bold basis-1/4">Question {questionIndex + 1}:</label>
                                            <div className="basis-3/4">
                                                <input
                                                    type="text"
                                                    value={question.shortAnswer.question}
                                                    onChange={(e) => handleQuestionChange(sectionIndex, questionIndex, "shortAnswerQuestion", e.target.value)}
                                                    className="border-2 px-2 py-1 w-full rounded focus:outline-none focus:border-blue-500"
                                                    placeholder="Enter short answer question"
                                                />
                                            </div>
                                        </div>

                                        {/* Max Marks for Short Answer */}
                                        <div className="mt-5 flex flex-row">
                                            <label className="font-bold basis-1/4">Max Marks:</label>
                                            <div className="basis-3/4">
                                                <input
                                                    type="number"
                                                    value={question.maxMarks}
                                                    onChange={(e) => handleQuestionChange(sectionIndex, questionIndex, "shortAnswerMaxMarks", e.target.value)}
                                                    className="border-2 px-2 py-1 w-full rounded focus:outline-none focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                    placeholder="Enter maximum marks"
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-3 hidden">
                                            <label className="font-bold">Answer:</label>
                                            <input
                                                type="text"
                                                value={question.shortAnswer.answer}
                                                onChange={(e) => handleQuestionChange(sectionIndex, questionIndex, "shortAnswer", e.target.value)}
                                                className="border px-2 py-1"
                                                placeholder="Enter answer"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        <button
                            onClick={() => addNewQuestion(sectionIndex)}
                            className="flex items-center gap-2 border-2 border-blue-500 px-5 py-1 mt-5 text-blue-500 rounded hover:bg-blue-500 hover:text-white duration-200"
                        >
                            Add Question <SquarePlus className="size-5" />
                        </button>



                    </div>
                ))}

                <div className="mt-10 flex justify-between">
                    <button
                        onClick={addNewSection}
                        className="border-2 flex gap-2 items-center px-5 py-1 mt-5 border-blue-500 text-blue-500 rounded hover:bg-blue-600 hover:text-white"
                    >
                        Add New Section <SquarePlus className="size-5" />
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="border-2 flex gap-2 items-center px-5 py-1 mt-5 border-blue-500 text-blue-500 rounded hover:bg-blue-600 hover:text-white"
                    >
                        Save Test Paper <BookMarked className="size-5" />
                    </button>

                </div>
            </div>


        </div>
    )
}

export default AddTestPaper;