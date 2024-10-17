import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import  toast from "react-hot-toast";

function AddTestPaperTwo() {
    // Initial state for sections and questions
    const { type } = useParams();
  const [sectionsArray, setSectionsArray] = useState([
    {
      sectionTitle: "", // Section title (e.g., Section A)
      questions: [],    // Array of questions within this section
    },
  ]);

  const API_URL = "http://localhost:3000";

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
      },
    //   shortAnswer: {
    //     question: "",
    //     answer: "",
    //   },
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
        };
      } else if (value === "ShortAnswer") {
        delete question.mcq;
        question.shortAnswer = {
          question: "",
          answer: "",
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
      <h1 className="text-md font-medium">Add Test Paper</h1>

      {/* Section Form */}
      {sectionsArray.map((section, sectionIndex) => (
        <div key={sectionIndex} className="border p-5 mt-5">
          <div className="flex gap-5 items-center">
            <label className="font-bold">Section Title:</label>
            <input
              type="text"
              value={section.sectionTitle}
              onChange={(e) => handleSectionTitleChange(sectionIndex, e.target.value)}
              className="border px-2 py-1"
              placeholder="Section Title (e.g., Section A)"
            />
            <button
              onClick={() => removeSection(sectionIndex)}
              className="border px-2 py-1 text-white bg-red-500 rounded"
            >
              Remove Section
            </button>
          </div>

          {/* Questions for this section */}
          {section.questions.map((question, questionIndex) => (
            <div key={questionIndex} className="mt-5">
              {/* Question Type Selector */}
              <div className="flex gap-5 items-center">
                <label className="font-bold">Question Type:</label>
                <select
                  value={question.type}
                  onChange={(e) => handleQuestionChange(sectionIndex, questionIndex, "type", e.target.value)}
                  className="border px-2 py-1"
                >
                  <option value="MCQ">MCQ</option>
                  <option value="ShortAnswer">Short Answer</option>
                </select>
                <button
                  onClick={() => removeQuestion(sectionIndex, questionIndex)}
                  className="border px-2 py-1 text-white bg-red-500 rounded"
                >
                  Remove Question
                </button>
              </div>

              {/* MCQ Input Fields */}
              {question.type === "MCQ" && (
                <div className="mt-5">
                  <div className="flex gap-5 items-center">
                    <label className="font-bold">Question:</label>
                    <input
                      type="text"
                      value={question.mcq.question}
                      onChange={(e) => handleQuestionChange(sectionIndex, questionIndex, "mcqQuestion", e.target.value)}
                      className="border px-2 py-1"
                      placeholder="Enter MCQ question"
                    />
                  </div>

                  {/* MCQ Options */}
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    {["option1", "option2", "option3", "option4"].map((option, i) => (
                      <div key={i}>
                        <label className="font-bold">Option {i + 1}:</label>
                        <input
                          type="text"
                          value={question.mcq.options[i]}
                          onChange={(e) => handleQuestionChange(sectionIndex, questionIndex, option, e.target.value)}
                          className="border px-2 py-1"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Correct Answer */}
                  <div className="mt-3">
                    <label className="font-bold">Correct Answer:</label>
                    <input
                      type="text"
                      value={question.mcq.correctAnswer}
                      onChange={(e) => handleQuestionChange(sectionIndex, questionIndex, "correctAnswer", e.target.value)}
                      className="border px-2 py-1"
                      placeholder="Enter correct answer"
                    />
                  </div>
                </div>
              )}

              {/* Short Answer Input Field */}
              {question.type === "ShortAnswer" && (
                <div className="mt-5">
                  <div className="flex gap-5 items-center">
                    <label className="font-bold">Question:</label>
                    <input
                      type="text"
                      value={question.shortAnswer.question}
                      onChange={(e) => handleQuestionChange(sectionIndex, questionIndex, "shortAnswerQuestion", e.target.value)}
                      className="border px-2 py-1"
                      placeholder="Enter short answer question"
                    />
                  </div>

                  <div className="mt-3">
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
            className="border px-5 py-1 mt-5 text-white bg-blue-500 rounded"
          >
            Add Question
          </button>
        </div>
      ))}

      <button
        onClick={addNewSection}
        className="border px-5 py-1 mt-5 text-white bg-green-500 rounded"
      >
        Add Section
      </button>

      <button
        onClick={handleSubmit}
        className="border px-5 py-1 mt-5 text-white bg-red-500 rounded"
      >
        Submit Test Paper
      </button>
    </div>
  );
}

export default AddTestPaperTwo;