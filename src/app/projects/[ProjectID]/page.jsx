'use client'
import React, { useEffect, useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  ExternalLink, 
  Github, 
  Calendar, 
  Users, 
  Clock,
  Building,
  Code,
  FileText,
  CheckCircle2
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useParams } from 'next/navigation';
import axios from 'axios';

const projectData = {
  title: "E-Commerce Platform Development",
  description: "A comprehensive e-commerce platform with advanced features including inventory management, order processing, and analytics dashboard.",
  industry: "Retail & E-commerce",
  documents: [
    "project-brief.pdf",
    "technical-requirements.pdf"
  ],
  repo: {
    name: "ecommerce-platform",
    url: "https://github.com/company/ecommerce-platform",
    owner: "TechCorp"
  },
  skills_required: [
    "React",
    "Node.js",
    "MongoDB",
    "AWS",
    "TypeScript"
  ],
  deadline: new Date("2024-05-01"),
  TotalteamMembersRequired: 5,
  RemainingMembers: 2,
  assigned_students: [],
  tasks: [],
  createdAt: new Date("2024-01-15"),
  updatedAt: new Date("2024-02-20")
};

const ProjectDetailPage = () => {
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  const params = useParams();
  const [projects, setProjects] = useState(projectData);
  const [projectId] = useState(params.ProjectID);

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const _id = projectId;
      const project = await axios.post("/api/projects/getProjectbyId", {_id});
      if(project.data.project === null){
        console.log("Project not found");
        setProjects(projectData);
      } else {
        setProjects(project.data.project);
      }
      console.log(project.data.project);
    } catch (error) {
      console.error(
        "Error fetching project:",
        error.response?.data || error.message
      );
    }
  }

  const handleApply = () => {
    setIsApplying(true);
    // Simulate API call
    setTimeout(() => {
      setIsApplying(false);
      setHasApplied(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="animate-in fade-in duration-500">
                {projects?.industry || "N/A"}
              </Badge>
              <Badge variant="secondary" className="animate-in fade-in duration-500 delay-100">
                {projects?.RemainingMembers || 0} positions left
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight animate-in slide-in-from-left duration-700">
              {projects?.title || "Project Title"}
            </h1>
            <div className="flex items-center space-x-4 text-muted-foreground animate-in fade-in duration-500 delay-200">
              <div className="flex items-center space-x-1">
                <Building className="w-4 h-4" />
                <span>{projects?.repo?.owner || "N/A"}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Due {projects?.deadline ? new Date(projects.deadline).toLocaleDateString() : "N/A"}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="lg"
              asChild
              className="animate-in slide-in-from-right duration-700"
            >
              <a 
                href={projects?.repo?.url || "#"} 
                className="inline-flex items-center space-x-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-4 h-4" />
                <span>View Repository</span>
              </a>
            </Button>
            <Button 
              size="lg"
              className="animate-in slide-in-from-right duration-700 delay-100"
              onClick={handleApply}
              disabled={isApplying || hasApplied}
            >
              {hasApplied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Applied
                </>
              ) : (
                <>
                  <Users className="w-4 h-4 mr-2" />
                  {isApplying ? "Applying..." : "Apply Now"}
                </>
              )}
            </Button>
          </div>
        </div>

        <Alert className="animate-in slide-in-from-bottom duration-700 bg-card">
          <Users className="h-4 w-4" />
          <AlertTitle>Team Formation Progress</AlertTitle>
          <AlertDescription className="mt-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>{(projects?.TotalteamMembersRequired || 0) - (projects?.RemainingMembers || 0)} of {projects?.TotalteamMembersRequired || 0} positions filled</span>
                <span className="font-medium">
  {Math.round(((projects?.TotalteamMembersRequired || 0) - (projects?.RemainingMembers || 0)) / (projects?.TotalteamMembersRequired || 1) * 100)}% complete
</span>
              </div>
              <Progress 
                value={((projects?.TotalteamMembersRequired || 0) - (projects?.RemainingMembers || 0)) / (projects?.TotalteamMembersRequired || 1) * 100} 
                className="h-2" 
              />
            </div>
          </AlertDescription>
        </Alert>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <Card className="animate-in slide-in-from-left duration-700">
            <CardHeader>
              <CardTitle className="text-xl">About the Project</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {projects?.description || "No description available."}
              </p>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card className="animate-in slide-in-from-left duration-700 delay-100">
            <CardHeader>
              <CardTitle className="text-xl">Project Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {projects?.documents?.map((doc, index) => (
                  <Button 
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    {doc}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Required Skills */}
          <Card className="animate-in slide-in-from-right duration-700">
            <CardHeader>
              <CardTitle className="text-xl">Required Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {projects?.skills_required?.map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary"
                    className="text-sm py-1 px-3"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="animate-in slide-in-from-right duration-700 delay-100">
            <CardHeader>
              <CardTitle className="text-xl">Project Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Start Date</span>
                  <span className="font-medium">{projects?.createdAt ? new Date(projects.createdAt).toLocaleDateString() : "N/A"}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Deadline</span>
                  <span className="font-medium">{projects?.deadline ? new Date(projects.deadline).toLocaleDateString() : "N/A"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Repository Info */}
          <Card className="animate-in slide-in-from-right duration-700 delay-200">
            <CardHeader>
              <CardTitle className="text-xl">Repository Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Owner</span>
                <span className="font-medium">{projects?.repo?.owner || "N/A"}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Repository</span>
                <span className="font-medium">{projects?.repo?.name || "N/A"}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
