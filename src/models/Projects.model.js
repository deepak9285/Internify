import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    documents: [
      {
        type: String,
      },
    ],
    repo: {
      name: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      owner:{
        type: String,
        required: true
      }
    },
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    skills_required: {
      type: [String],
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    assigned_students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TaskProgress",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
