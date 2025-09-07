import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  image: {
    type: String, 
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  isPublished: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
