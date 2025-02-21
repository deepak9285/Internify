import { NextResponse } from "next/server";
import { connectDB } from "@/utils/connectDb";
import ProjectsModel from "@/models/Projects.model";


export async function POST(req) {
  try {
    await connectDB();

    const { _id } = req.body;

    // // Validate ObjectId
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return NextResponse.json(
    //     { error: "Invalid project ID" },
    //     { status: 400 }
    //   );
    // }

    console.log(_id);

    // Find project and populate references
    const project = await ProjectsModel.findOne(_id)

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}