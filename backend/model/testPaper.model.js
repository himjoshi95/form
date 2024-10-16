import mongoose from "mongoose";


// Define schema for multiple-choice questions (MCQ)
const MCQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: {
    type: [String],
    validate: [arrayLimit, '{PATH} must have 4 options'], // Ensures exactly 4 options
    required: true
  },
  correctAnswer: { type: String, required: true } // Correct answer from the options
});

// Define schema for short answer questions
const ShortAnswerSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
});

// Define schema for a single question, which can be either MCQ or Short Answer
const QuestionSchema = new mongoose.Schema({
  type: { type: String, enum: ['MCQ', 'ShortAnswer'], required: true }, // Question type (MCQ or ShortAnswer)
  mcq: MCQSchema, // Only used if type is 'MCQ'
  shortAnswer: ShortAnswerSchema // Only used if type is 'ShortAnswer'
});

// Define schema for a section, which can contain multiple questions
const SectionSchema = new mongoose.Schema({
  sectionTitle: { type: String, required: true }, // Example: "Section A" or "Section B"
  questions: [QuestionSchema] // Array of questions in this section
});

// Define schema for the test paper, which can have multiple sections
const TestPaperSchema = new mongoose.Schema({
//   title: { type: String, required: true }, // Title of the test paper
  training: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Master', // Reference to the Master schema (training)
    required: true
  },
  sections: [SectionSchema] // Array of sections, each containing multiple questions
}, { timestamps: true });

// Utility function to validate the number of MCQ options
function arrayLimit(val) {
  return val.length === 4;
}

// Create and export the Mongoose model
export const TestPaper = mongoose.model('TestPaper', TestPaperSchema);


