const { connectDb } = require("@/utils/connectDb");
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {

    connectDb();


  try {
    const req = await request.json();
    const { email } = req;

    const user = await User.findOne({
      email
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      message: "User found",
      success: true,
      user,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
