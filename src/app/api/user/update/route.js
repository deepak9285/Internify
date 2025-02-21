import User from '@/models/user.model';
import { connectDb } from '@/utils/connectDb';

const { NextResponse } = require('next/server');

export async function PUT(req) {
  await connectDb();
  
  try {
    const { userId, name, bio, skills, github_username } = await req.json();
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        name,
        'profile.bio': bio,
        'profile.skills': skills,
        'github_username': github_username
      },
      { new: true }
    );
    
    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Profile updated successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
