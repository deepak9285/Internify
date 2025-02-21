import User from "@/models/user.model";
import { connectDB } from "@/utils/connectDb";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
// import Otp from "@/models/otp.model";
// import { encrypt, decrypt } from "@/utils/cryptoUtils";

export async function POST(request) {
  connectDB();


  try {
    const req = await request.json();
    // const reqBody = decrypt(req?.data);
    const { name, email, password, mobile, github_username, role,  skills, level, profile_picture, bio } = req;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        encrypt({ error: "User already exists" }),
        { status: 400 }
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      mobile,
      role : role,
      github_username,
      profile: {
        bio: bio,
        profile_picture: profile_picture,
        skills: skills,
        level: level,
      },
    });
    const savedUser = await newUser.save();

    // const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    // const hashedOtp = await bcryptjs.hash(otp, 12);
    // await new Otp({ email, otp: hashedOtp }).save();

    // await transporter.sendMail({
    //   from: {
    //     name: "Scrumlord",
    //     address: process.env.AUTH_EMAIL || "",
    //   },
    //   to: email,
    //   subject: "Verify your Email | Scrumlord",
    //   html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete your signup</p><p>This OTP expires in 10 minutes.</p>`,
    // });

    return NextResponse.json({
      message: "User created successfully, verify email to login", success: true, savedUser })
  
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
