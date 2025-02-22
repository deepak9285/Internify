import User from "@/models/user.model";
import Project from "@/models/Projects.model";
import { connectDB } from "@/utils/connectDb";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

export async function POST(req) {
    await connectDB();

    try {
        // Parse the request body
        const body = await req.json();
        const { _id } = body;

        console.log(_id);

        // Check if _id is provided and is a valid ObjectId
        if (!_id || !Types.ObjectId.isValid(_id)) {
            return NextResponse.json({ error: 'Valid User ID is required' }, { status: 400 });
        }

        // Find the user and populate the projects
        const user = await User.findById(_id).populate('projects');

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Return the projects
        return NextResponse.json({ projects: user.projects }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}