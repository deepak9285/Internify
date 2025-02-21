"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Users,
  Calendar,
  AlertCircle,
  Plus,
  Check,
  // X,
  RefreshCcw,
} from "lucide-react";
import Link from "next/link";
import axios from "axios";

const AdminDashboard = () => {
  // const [activeTab, setActiveTab] = useState("overview");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const project = await axios.get("/api/projects/allProjects");
      setProjects(project.data.projects);
      console.log(project.data.projects);
      
      
    } catch (error) {
      console.error(
        "Error fetching project:",
        error.response?.data || error.message
      );
    }
  };

  // Sample data - in real app would come from API
  // const projects = [
  //   {
  //     id: 1,
  //     name: "Frontend Redesign",
  //     progress: 75,
  //     status: "active",
  //     tasks: 24,
  //     completedTasks: 18,
  //     teamSize: 8,
  //     deadline: "2025-03-15",
  //   },
  //   // Add more projects as needed
  // ];

  const issues = [
    {
      id: 1,
      title: "API Integration failing",
      priority: "high",
      assignee: "Sarah Chen",
      status: "open",
      project: "Frontend Redesign",
    },
    // Add more issues as needed
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button className="flex items-center gap-2 ">
          <Plus size={16} />
          <Link href="/projects/create">Create New Project</Link>
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-4 gap-4 bg-muted p-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Active Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{projects.length}</span>
                  <BarChart className="text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Team Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{4}</span>
                  <Users className="text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Open Issues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">7</span>
                  <AlertCircle className="text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Scheduled Meetings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">3</span>
                  <Calendar className="text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Project Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{project.title}</span>
                      <span className="text-muted-foreground">
                        {project.tasks.length}%
                      </span>
                    </div>
                    <Progress value={project.tasks.length} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{project.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {project.tasks.length}/{project.tasks.length} tasks
                          completed
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex -space-x-2">
                          {[...Array(3)].map((_, i) => (
                            <Avatar
                              key={i}
                              className="border-2 border-background"
                            >
                              <AvatarFallback>U{i + 1}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issues" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {issues.map((issue) => (
                  <div key={issue.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{issue.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {issue.project} • Assigned to {issue.assignee}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Check size={16} className="mr-1" />
                          Resolve
                        </Button>
                        <Button size="sm" variant="outline">
                          <RefreshCcw size={16} className="mr-1" />
                          Reassign
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meetings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Meetings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Sprint Planning</h3>
                      <p className="text-sm text-muted-foreground">
                        Today at 2:00 PM • Frontend Team
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Reschedule
                      </Button>
                      <Button size="sm" variant="outline">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
                {/* Add more meetings */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
