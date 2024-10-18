import { Link, useParams } from "react-router-dom";
import { ArrowLeftToLine, Trash2, SquarePlus } from "lucide-react";
import { useState, useRef } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Styles for the editor

function RichAddTestPaper() {
  const { name, type } = useParams();
  const API_URL = "http://localhost:3000";

  const [sectionsArray, setSectionsArray] = useState([
    {
      sectionTitle: "",
      questions: [],
    },
  ]);

  // Rich Text Editor state
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [editorContent, setEditorContent] = useState(""); // Editor content
  const [focusedField, setFocusedField] = useState(null); // Track which field is focused

  const editorRef = useRef(null); // Ref to access editor content

  // Function to handle adding a new section
  const addNewSection = () => {
    setSectionsArray([
      ...sectionsArray,
      { sectionTitle: "", questions: [] }, // Empty new section
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
      type: "MCQ", // Default type is MCQ
      mcq: {
        question: "",
        options: ["", "", "", ""], // 4 empty options
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
      question.maxMarks = value; // Set maxMarks
    } else if (field === "mcqMaxMarks") {
      question.mcq.maxMarks = value;
    } else if (field === "shortAnswerMaxMarks") {
      question.shortAnswer.maxMarks = value;
    }

    setSectionsArray(newSections);
  };

  // Open editor in iframe for a specific field and set its current value
  const handleFocus = (sectionIndex, questionIndex, field) => {
    const currentQuestion = sectionsArray[sectionIndex].questions[questionIndex];

    let fieldContent = "";
    if (field === "mcqQuestion") {
      fieldContent = currentQuestion.mcq.question;
    } else if (field === "shortAnswerQuestion") {
      fieldContent = currentQuestion.shortAnswer.question;
    }

    setFocusedField({ sectionIndex, questionIndex, field });
    setIsEditorVisible(true);
    setEditorContent(fieldContent); // Set the current content of the input to the editor
  };

  // Submit rich text content to the corresponding field
  const handleEditorSubmit = () => {
    const { sectionIndex, questionIndex, field } = focusedField;

    // Get plain text from the editor (strips out HTML)
    const plainText = editorRef.current.getEditor().getText().trim(); 
    handleQuestionChange(sectionIndex, questionIndex, field, plainText);

    setIsEditorVisible(false);
  };

  // Handle submitting the test paper to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const section of sectionsArray) {
      if (!section.sectionTitle.trim()) {
        toast.error("Section title cannot be empty");
        return; // Stop submission if any section title is empty
      }

      for (const question of section.questions) {
        if (question.type === "MCQ") {
          if (!question.mcq.question.trim()) {
            toast.error("MCQ question cannot be empty");
            return;
          }
          if (question.mcq.options.some((option) => !option.trim())) {
            toast.error("All MCQ options must be filled");
            return;
          }
          if (!question.mcq.correctAnswer.trim()) {
            toast.error("Correct answer must be selected");
            return;
          }
          if (!question.mcq.maxMarks) {
            toast.error("Max marks for MCQ cannot be empty");
            return;
          }
        } else if (question.type === "ShortAnswer") {
          if (!question.shortAnswer.question.trim()) {
            toast.error("Short answer question cannot be empty");
            return;
          }
          if (!question.shortAnswer.maxMarks) {
            toast.error("Max marks for short answer cannot be empty");
            return;
          }
        }
      }
    }

    if (sectionsArray.length === 0) {
      toast.error("Please Add a Section");
      return;
    }

    const submit = confirm("Are you sure you want to post the Question Paper?");
    if (submit) {
      try {
        const response = await axios.post(`${API_URL}/api/testPaper`, {
          type,
          sections: sectionsArray, // Send sectionsArray in the correct format
        });
        toast.success("Succesfully added Test Paper");
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
          <Link to={`/dashboard`} className="text-blue-500 flex items-center">
            <ArrowLeftToLine />
            <span className="text-lg">DASHBOARD</span>
          </Link>
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
                <button onClick={() => removeSection(sectionIndex)} className="px-2 py-1 text-red-500">
                  <Trash2 />
                </button>
              </div>
            </div>

            {section.questions.map((question, questionIndex) => (
              <div key={questionIndex} className="border-2 px-4 py-3 mt-5 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex flex-row">
                    <label className="font-bold">Question {questionIndex + 1}:</label>
                    <select
                      value={question.type}
                      onChange={(e) => handleQuestionChange(sectionIndex, questionIndex, "type", e.target.value)}
                      className="ml-2 border px-2 py-1 rounded focus:outline-none"
                    >
                      <option value="MCQ">MCQ</option>
                      <option value="ShortAnswer">Short Answer</option>
                    </select>
                  </div>

                  <button onClick={() => removeQuestion(sectionIndex, questionIndex)} className="px-2 py-1 text-red-500">
                    <Trash2 />
                  </button>
                </div>

                {/* MCQ Fields */}
                {question.type === "MCQ" && (
                  <div className="mt-2">
                    <input
                      type="text"
                      value={question.mcq.question}
                      onFocus={() => handleFocus(sectionIndex, questionIndex, "mcqQuestion")}
                      readOnly
                      className="border px-2 py-1 w-full rounded focus:outline-none"
                      placeholder="Click to add MCQ question"
                    />
                    {question.mcq.options.map((option, optionIndex) => (
                      <input
                        key={optionIndex}
                        type="text"
                        value={option}
                        onChange={(e) => handleQuestionChange(sectionIndex, questionIndex, `option${optionIndex + 1}`, e.target.value)}
                        className="border mt-2 px-2 py-1 w-full rounded focus:outline-none"
                        placeholder={`Option ${optionIndex + 1}`}
                      />
                    ))}
                    <input
                      type="text"
                      value={question.mcq.correctAnswer}
                      onChange={(e) => handleQuestionChange(sectionIndex, questionIndex, "correctAnswer", e.target.value)}
                      className="border mt-2 px-2 py-1 w-full rounded focus:outline-none"
                      placeholder="Correct Answer"
                    />
                    <input
                      type="number"
                      value={question.mcq.maxMarks}
                      onChange={(e) => handleQuestionChange(sectionIndex, questionIndex, "mcqMaxMarks", e.target.value)}
                      className="border mt-2 px-2 py-1 w-full rounded focus:outline-none"
                      placeholder="Max Marks"
                    />
                  </div>
                )}

                {/* Short Answer Fields */}
                {question.type === "ShortAnswer" && (
                  <div className="mt-2">
                    <input
                      type="text"
                      value={question.shortAnswer.question}
                      onFocus={() => handleFocus(sectionIndex, questionIndex, "shortAnswerQuestion")}
                      readOnly
                      className="border px-2 py-1 w-full rounded focus:outline-none"
                      placeholder="Click to add Short Answer question"
                    />
                    <input
                      type="text"
                      value={question.shortAnswer.answer}
                      onChange={(e) => handleQuestionChange(sectionIndex, questionIndex, "shortAnswer", e.target.value)}
                      className="border mt-2 px-2 py-1 w-full rounded focus:outline-none"
                      placeholder="Answer"
                    />
                    <input
                      type="number"
                      value={question.shortAnswer.maxMarks}
                      onChange={(e) => handleQuestionChange(sectionIndex, questionIndex, "shortAnswerMaxMarks", e.target.value)}
                      className="border mt-2 px-2 py-1 w-full rounded focus:outline-none"
                      placeholder="Max Marks"
                    />
                  </div>
                )}
              </div>
            ))}

            {/* Add Question Button */}
            <div className="flex justify-end">
              <button
                onClick={() => addNewQuestion(sectionIndex)}
                className="px-3 py-2 bg-green-500 text-white rounded flex items-center gap-2"
              >
                <SquarePlus />
                Add New Question
              </button>
            </div>
          </div>
        ))}

        {/* Add Section Button */}
        <div className="mt-5">
          <button onClick={addNewSection} className="bg-blue-500 text-white px-3 py-2 rounded-lg">
            Add New Section
          </button>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-10">
          <button onClick={handleSubmit} className="bg-green-600 text-white px-5 py-2 rounded-lg">
            Submit Test Paper
          </button>
        </div>
      </div>

      {/* Rich Text Editor Modal */}
      {isEditorVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <ReactQuill theme="snow" value={editorContent} onChange={setEditorContent} ref={editorRef} />
            <div className="flex justify-end mt-3 gap-3">
              <button
                onClick={handleEditorSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
              <button
                onClick={() => setIsEditorVisible(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RichAddTestPaper;
