"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  LogOut,
  Menu,
  MoreVertical,
  Settings,
  User
} from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const HomePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      setUserData({
        name: "Jane Developer",
        role: "Senior Full Stack Developer",
        email: "jane@acme.com",
        avatar: "/api/placeholder/100/100",
        department: "Engineering",
        joinDate: "2024-01-15",
        completedTasks: 45,
        ongoingTasks: 3,
        upcomingTasks: 5,
        taskStats: {
          completed: 87,
          inProgress: 76,
          efficiency: 92
        },
        tasks: {
          completed: [
            {
              id: 1,
              title: "API Integration",
              description: "Implement payment gateway API integration",
              completedDate: "2025-02-20",
              priority: "high",
              tags: ["Backend", "API"]
            },
            {
              id: 2,
              title: "Dashboard UI",
              description: "Create responsive dashboard interface",
              completedDate: "2025-02-18",
              priority: "medium",
              tags: ["Frontend", "UI/UX"]
            }
          ],
          ongoing: [
            {
              id: 3,
              title: "User Authentication",
              description: "Implement OAuth 2.0 authentication system",
              dueDate: "2025-03-01",
              progress: 75,
              priority: "high",
              tags: ["Security", "Backend"]
            },
            {
              id: 4,
              title: "Performance Optimization",
              description: "Optimize database queries and frontend rendering",
              dueDate: "2025-02-28",
              progress: 40,
              priority: "medium",
              tags: ["Performance", "Full Stack"]
            }
          ],
          upcoming: [
            {
              id: 5,
              title: "Mobile App Development",
              description: "Start development of mobile application",
              startDate: "2025-03-05",
              priority: "high",
              tags: ["Mobile", "React Native"]
            },
            {
              id: 6,
              title: "Documentation Update",
              description: "Update API documentation and user guides",
              startDate: "2025-03-10",
              priority: "low",
              tags: ["Documentation"]
            }
          ]
        }
      });
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading || !userData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />5
            </Button>
            <h2 className="text-2xl font-bold text-primary">ScrumLord</h2>
          </div>
          
          <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback>{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline font-medium">{userData.name}</span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto p-6 space-y-8">
        {/* User Profile Overview */}
        <motion.section
          variants={fadeIn}
          initial="initial"
          animate="animate"
          className="grid gap-6 md:grid-cols-3"
        >
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Welcome back, {userData.name}!</CardTitle>
              <CardDescription>Here's your task overview for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex flex-col gap-2 rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium">Completed</span>
                  </div>
                  <span className="text-2xl font-bold">{userData.completedTasks}</span>
                </div>
                <div className="flex flex-col gap-2 rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">Ongoing</span>
                  </div>
                  <span className="text-2xl font-bold">{userData.ongoingTasks}</span>
                </div>
                <div className="flex flex-col gap-2 rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-purple-500" />
                    <span className="font-medium">Upcoming</span>
                  </div>
                  <span className="text-2xl font-bold">{userData.upcomingTasks}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Task Completion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Completion Rate</span>
                  <span className="text-sm font-medium">{userData.taskStats.completed}%</span>
                </div>
                <Progress value={userData.taskStats.completed} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Progress Rate</span>
                  <span className="text-sm font-medium">{userData.taskStats.inProgress}%</span>
                </div>
                <Progress value={userData.taskStats.inProgress} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Efficiency</span>
                  <span className="text-sm font-medium">{userData.taskStats.efficiency}%</span>
                </div>
                <Progress value={userData.taskStats.efficiency} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Tasks Section */}
        <motion.section 
          variants={fadeIn}
          initial="initial"
          animate="animate"
          className="grid gap-6 md:grid-cols-2"
        >
          {/* Completed & Ongoing Tasks */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Completed & Ongoing Tasks</h3>
            <div className="space-y-4">
              {userData.tasks.completed.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  type="completed"
                />
              ))}
              {userData.tasks.ongoing.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  type="ongoing"
                />
              ))}
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Upcoming Tasks</h3>
            <div className="space-y-4">
              {userData.tasks.upcoming.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  type="upcoming"
                />
              ))}
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

const TaskCard = ({ task, type }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="font-medium">{task.title}</h4>
              <div className={`h-2 w-2 rounded-full ${getPriorityColor(task.priority)}`} />
            </div>
            <p className="text-sm text-muted-foreground">{task.description}</p>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {task.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm">
          {type === 'completed' && (
            <span className="text-muted-foreground">
              Completed on {new Date(task.completedDate).toLocaleDateString()}
            </span>
          )}
          {type === 'ongoing' && (
            <>
              <span className="text-muted-foreground">
                Due {new Date(task.dueDate).toLocaleDateString()}
              </span>
              <div className="flex items-center gap-2">
                <Progress value={task.progress} className="h-2 w-20" />
                <span>{task.progress}%</span>
              </div>
            </>
          )}
          {type === 'upcoming' && (
            <span className="text-muted-foreground">
              Starts {new Date(task.startDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HomePage;