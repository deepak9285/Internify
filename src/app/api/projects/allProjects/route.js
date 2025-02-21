import { NextResponse } from "next/server";
import ProjectsModel from "@/models/Projects.model";
import { connectDB } from "@/utils/connectDb";
export async function GET() {
    await connectDB();
    
    try {

      
      const projects = await ProjectsModel.find()
    
      console.log(projects);
      
      if (!projects) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
      }
      
      return NextResponse.json({projects} ,{ status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }