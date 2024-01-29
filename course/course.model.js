import mongoose from "mongoose";

// set rule
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 55,
  },
  price: {
    type: Number,
    required: true,
    minlength: 0,
  },
});
// create table
export const Course = mongoose.model("Course", courseSchema);
