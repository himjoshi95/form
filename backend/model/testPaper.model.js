import mongoose from "mongoose";



const MCQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: {
    type: [String],
    validate: [arrayLimit, '{PATH} must have 4 options'], 
    required: true
  },
  correctAnswer: { type: String, required: true },
  maxMarks: {type:Number, required:true, min:0}     
});


const ShortAnswerSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String },
  maxMarks: {type:Number,required:true, min:0}
});


const QuestionSchema = new mongoose.Schema({
  type: { type: String, enum: ['MCQ', 'ShortAnswer'], required: true }, 
  mcq: MCQSchema, 
  shortAnswer: ShortAnswerSchema 
});


const SectionSchema = new mongoose.Schema({
  sectionTitle: { type: String, required: true }, 
  questions: [QuestionSchema] 
});


const TestPaperSchema = new mongoose.Schema({
//   title: { type: String, required: true }, // Title of the test paper
  training: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Master', 
    required: true
  },
  sections: [SectionSchema], 
  isPublished: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });


function arrayLimit(val) {
  return val.length === 4;
}

export const TestPaper = mongoose.model('TestPaper', TestPaperSchema);


