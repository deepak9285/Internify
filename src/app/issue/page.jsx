// app/issues/create/page.js
'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const CreateIssuePage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    issueCategory: '',
    user_id: '', // Will be set dynamically
    project_id: '', // Will be set dynamically
    task_id: '', // Optional, can be left empty
  });

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  // Fetch user ID from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const [userId, setUserId] = useState(user?._id || '');

  // Fetch projects assigned to the user
  const fetchProjects = async () => {
    try {
      if (!userId) {
        console.log("No user found");
        return;
      }
      const response = await axios.post("/api/projects/getUserAssignedProjects", {
        _id: userId,
      });
      setProjects(response.data.projects);
      if (response.data.projects.length > 0) {
        setSelectedProject(response.data.projects[0]._id); // Set the project ID
        setFormData(prev => ({
          ...prev,
          project_id: response.data.projects[0]._id, // Set the project ID in form data
        }));
      }
    } catch (error) {
      console.error("Error fetching projects:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProjects();
    }
  }, [userId]);
  useEffect(() => {
    if (userId) {
      setFormData(prev => ({
        ...prev,
        user_id: userId,
        task_id: "65f1c4e8f1a2b3c4d5e6f7a8"
      }));
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value) => {
    setFormData(prev => ({
      ...prev,
      issueCategory: value,
    }));
  };

  const handleProjectChange = (value) => {
    setSelectedProject(value);
    setFormData(prev => ({
      ...prev,
      project_id: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        console.log(formData);
      const response = await axios.post('/api/issue/createIssue', formData);
      if(response.status===201)  alert(response.message);
      router.refresh(); // Refresh the server components
    } catch (error) {
      console.error('Error creating issue:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={formAnimation}
        className="max-w-2xl mx-auto"
      >
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Create New Issue</CardTitle>
            <CardDescription>Fill in the details to create a new issue ticket</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter issue title"
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="desc">Description</Label>
                <Textarea
                  id="desc"
                  name="desc"
                  value={formData.desc}
                  onChange={handleChange}
                  placeholder="Describe the issue in detail"
                  className="min-h-32"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.issueCategory}
                  onValueChange={handleCategoryChange}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bug">Bug</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="improvement">Improvement</SelectItem>
                    <SelectItem value="documentation">Documentation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="project">Project</Label>
                <Select
                  value={selectedProject}
                  onValueChange={handleProjectChange}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project._id} value={project._id}>
                        {project.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating...' : 'Create Issue'}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CreateIssuePage;