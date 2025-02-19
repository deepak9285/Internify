import User from "@/models/user.model";
import { connectDb } from "@/utils/connectDb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    await connectDb();
    
    try {
      const { userId } = params;
      
      if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
      }
      
      const user = await User.findById(userId);
      
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      
      return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
}