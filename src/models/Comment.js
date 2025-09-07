import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",  
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false,  
  },
}, { timestamps: true });

export default mongoose.models.Comment || mongoose.model("Comment", commentSchema);
