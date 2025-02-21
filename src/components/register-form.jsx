'use client'
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from 'axios';
import { useState } from 'react';

export function RegisterForm({
  className,
  ...props
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    github_username: '',
    bio: '',
    profile_picture: '',
    skills: '',
    level: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSelectChange = (value) => {
    setFormData(prevState => ({
      ...prevState,
      level: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Creating user:', formData);
      const response = await axios.post('/api/user/register', formData);
      console.log('User created successfully:', response.data);
      // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error('Error creating user:', error.response ? error.response.data : error.message);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Create Your Account</h1>
                <p className="text-balance text-muted-foreground">
                  Join our community to explore more features.
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" placeholder="John Doe" required value={formData.name} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required value={formData.email} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required value={formData.password} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input id="mobile" type="tel" placeholder="123-456-7890" required value={formData.mobile} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="github_username">GitHub Username</Label>
                <Input id="github_username" type="text" placeholder="johndoe" value={formData.github_username} onChange={handleChange} />
              </div>
              {/* <div className="grid gap-2">
                <Label htmlFor="college_id">College ID</Label>
                <Input id="college_id" type="text" value={formData.college_id} onChange={handleChange} />
              </div> */}
              {/* <div className="grid gap-2">
                <Label htmlFor="company_id">Company ID</Label>
                <Input id="company_id" type="text" value={formData.company_id} onChange={handleChange} />
              </div> */}
              <div className="grid gap-2">
                <Label htmlFor="bio">Bio</Label>
                <Input id="bio" type="text" placeholder="A bit about yourself..." value={formData.bio} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="profile_picture">Profile Picture URL</Label>
                <Input id="profile_picture" type="url" placeholder="https://example.com/profile.jpg" value={formData.profile_picture} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="skills">Skills (comma separated)</Label>
                <Input id="skills" type="text" placeholder="JavaScript, React, Node.js" value={formData.skills} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="level">Skill Level</Label>
                <Select onValueChange={handleSelectChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/signUpPic.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}