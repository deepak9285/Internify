"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import { Bell, Calendar, CheckCircle, Clock, LogOut, Menu, MoreVertical, Settings } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const HomePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from local storage
        const storedUserData = JSON.parse(localStorage.getItem("user"));
        if (storedUserData) {
          setUserData({
            name: storedUserData.name || "User",
            email: storedUserData.email || "No email available",
            avatar: storedUserData.profile?.profile_picture || "/api/placeholder/100/100",
            bio: storedUserData.profile?.bio || "No bio available",
            skills: storedUserData.profile?.skills || ["No skills listed"],
            level: storedUserData.profile?.level || "Beginner",
            role: storedUserData.role || "User",
            tasks: storedUserData.tasks || [],
            joinDate: new Date(storedUserData.createdAt).toLocaleDateString(),
            efficiency: Math.floor(Math.random() * 100), // Randomized Efficiency (since it's missing)
            completedTasks: storedUserData.tasks.length || 0, 
            ongoingTasks: Math.floor(Math.random() * 5), // Dummy Data
            upcomingTasks: Math.floor(Math.random() * 3), // Dummy Data
          });
        } else {
          setUserData(null);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!userData) {
    return <div className="text-center mt-20 text-lg">No user data found.</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <h2 className="text-2xl font-bold text-primary">ScrumLord</h2>
          </div>

          <div className="ml-auto flex items-center gap-4">
            <Button onClick={()=>router.push("/projects")}>Projects</Button>
            <Button onClick={() => router.push("/dashboard")}>Dashboard</Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline font-medium">{userData.name}</span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto p-6 space-y-8">
        {/* User Profile Overview */}
        <motion.section variants={fadeIn} initial="initial" animate="animate" className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Welcome back, {userData.name}!</CardTitle>
              <CardDescription>{userData.bio}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <StatBox icon={<CheckCircle className="h-5 w-5 text-green-500" />} label="Completed" value={userData.completedTasks} />
                <StatBox icon={<Clock className="h-5 w-5 text-blue-500" />} label="Ongoing" value={userData.ongoingTasks} />
                <StatBox icon={<Calendar className="h-5 w-5 text-purple-500" />} label="Upcoming" value={userData.upcomingTasks} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Task Completion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ProgressBar label="Efficiency" value={userData.efficiency} />
              <ProgressBar label="Progress Rate" value={Math.floor(Math.random() * 100)} />
            </CardContent>
          </Card>
        </motion.section>

        {/* Task List */}
        <motion.section variants={fadeIn} initial="initial" animate="animate" className="grid gap-6 md:grid-cols-2">
          <TaskList title="Ongoing Tasks" tasks={userData.tasks} type="ongoing" />
          <TaskList title="Upcoming Tasks" tasks={userData.tasks} type="upcoming" />
        </motion.section>
      </main>
    </div>
  );
};

const StatBox = ({ icon, label, value }) => (
  <div className="flex flex-col gap-2 rounded-lg border p-4">
    <div className="flex items-center gap-2">{icon}<span className="font-medium">{label}</span></div>
    <span className="text-2xl font-bold">{value}</span>
  </div>
);

const ProgressBar = ({ label, value }) => (
  <div>
    <div className="flex justify-between mb-2">
      <span className="text-sm">{label}</span>
      <span className="text-sm font-medium">{value}%</span>
    </div>
    <Progress value={value} className="h-2" />
  </div>
);

const TaskList = ({ title, tasks, type }) => (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold">{title}</h3>
    <div className="space-y-4">
      {tasks.length > 0 ? tasks.map((task, index) => (
        <TaskCard key={index} task={task} type={type} />
      )) : <p className="text-muted-foreground">No tasks available</p>}
    </div>
  </div>
);

const TaskCard = ({ task }) => (
  <Card>
    <CardContent className="p-4">
      <h4 className="font-medium">{task.title || "Untitled Task"}</h4>
      <p className="text-sm text-muted-foreground">{task.description || "No description"}</p>
    </CardContent>
  </Card>
);

export default HomePage;
