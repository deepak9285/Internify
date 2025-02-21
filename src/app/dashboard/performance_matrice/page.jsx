"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, Cell 
} from 'recharts';
import { 
  Github, Award, TrendingUp, Code, Calendar, MessageCircle, 
  CheckCircle, AlertCircle, Clock, Star, Users, GitBranch
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const UserPerformanceDashboard = () => {
  // State for user data
  const [userData, setUserData] = useState({
    name: "Jane Developer",
    role: "Full Stack Developer",
    photoUrl: "/api/placeholder/100/100",
    gitHubUsername: "jane-dev",
    loading: true
  });
  
  // State for metrics data
  const [metrics, setMetrics] = useState({
    commitActivity: [],
    codeQuality: 0,
    contributionScore: 0,
    responseTime: 0,
    projectCompletion: 0,
    feedbackScore: 0,
    topSkills: [],
    recentFeedback: [],
    activeProjects: []
  });

  // State for time period filter
  const [timePeriod, setTimePeriod] = useState('30d');

  // Simulate data fetching
  useEffect(() => {
    // This would be replaced with actual API calls to GitHub API and your backend
    const fetchData = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock commit activity data
      const commitData = generateMockCommitData();
      
      // Mock top skills data
      const skillsData = [
        { name: 'React.js', value: 92, color: '#61DAFB' },
        { name: 'TypeScript', value: 87, color: '#3178C6' },
        { name: 'Node.js', value: 84, color: '#339933' },
        { name: 'Python', value: 78, color: '#3776AB' },
        { name: 'MongoDB', value: 71, color: '#47A248' },
      ];
      
      // Mock AI feedback data
      const feedbackData = [
        {
          id: 1,
          project: "E-commerce Platform",
          date: "2025-02-10",
          message: "Excellent work on the payment integration. Your code is well-structured and follows best practices.",
          type: "positive",
          skills: ["React.js", "Payment APIs"]
        },
        {
          id: 2,
          project: "Analytics Dashboard",
          date: "2025-02-15",
          message: "Consider improving the error handling in your data fetching logic. The current implementation might lead to silent failures.",
          type: "improvement",
          skills: ["Error Handling", "API Integration"]
        },
        {
          id: 3,
          project: "Mobile App Backend",
          date: "2025-02-18",
          message: "Your API authentication implementation is robust and secure. Great attention to detail on security considerations.",
          type: "positive",
          skills: ["Authentication", "Security"]
        }
      ];
      
      // Mock active projects
      const activeProjectsData = [
        {
          id: 1,
          name: "E-commerce Platform",
          progress: 78,
          role: "Frontend Lead",
          deadline: "2025-03-15",
          tasks: { completed: 18, total: 24 }
        },
        {
          id: 2,
          name: "Analytics Dashboard",
          progress: 42,
          role: "Full Stack Developer",
          deadline: "2025-04-10",
          tasks: { completed: 8, total: 16 }
        },
        {
          id: 3,
          name: "Mobile App Backend",
          progress: 91,
          role: "Backend Developer",
          deadline: "2025-03-01",
          tasks: { completed: 14, total: 15 }
        }
      ];
      
      // Update state with fetched data
      setMetrics({
        commitActivity: commitData,
        codeQuality: 87,
        contributionScore: 92,
        responseTime: 78,
        projectCompletion: 84,
        feedbackScore: 90,
        topSkills: skillsData,
        recentFeedback: feedbackData,
        activeProjects: activeProjectsData
      });
      
      setUserData(prev => ({
        ...prev,
        loading: false
      }));
    };
    
    fetchData();
  }, [timePeriod]);
  
  // Helper function to generate mock commit data
  const generateMockCommitData = () => {
    const data = [];
    const days = timePeriod === '7d' ? 7 : timePeriod === '30d' ? 30 : 90;
    const today = new Date();
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Generate some realistic patterns
      let commits = Math.floor(Math.random() * 8) + 1;
      
      // Weekend pattern - fewer commits
      if (date.getDay() === 0 || date.getDay() === 6) {
        commits = Math.floor(commits * 0.6);
      }
      
      // Some spikes for project milestones
      if (i === Math.floor(days * 0.25) || i === Math.floor(days * 0.75)) {
        commits = Math.floor(Math.random() * 10) + 8;
      }
      
      data.push({
        date: date.toISOString().split('T')[0],
        commits: commits,
        additions: commits * (Math.floor(Math.random() * 20) + 10),
        deletions: commits * (Math.floor(Math.random() * 15) + 5)
      });
    }
    
    return data;
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  // Custom tooltip for the charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-3 rounded-md shadow-md">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-muted-foreground">
            <span className="text-green-500 font-medium">{payload[0].value}</span> commits
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="text-blue-500 font-medium">{payload[1]?.value || 0}</span> additions
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="text-red-500 font-medium">{payload[2]?.value || 0}</span> deletions
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* User Profile and Summary Section */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4 mb-8">
          <Card className="w-full md:w-1/3">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20 border-2 border-primary">
                    <AvatarImage src={userData.photoUrl} alt={userData.name} />
                    <AvatarFallback>{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold">{userData.name}</h2>
                    <p className="text-muted-foreground">{userData.role}</p>
                    <div className="flex items-center mt-2 text-sm">
                      <Github className="h-4 w-4 mr-1" />
                      <span>{userData.gitHubUsername}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex flex-col items-center p-2 bg-muted/40 rounded-lg">
                  <Award className="h-6 w-6 text-primary mb-1" />
                  <span className="text-sm font-medium">Performance Score</span>
                  <span className="text-2xl font-bold">{metrics.contributionScore}%</span>
                </div>
                <div className="flex flex-col items-center p-2 bg-muted/40 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-primary mb-1" />
                  <span className="text-sm font-medium">Feedback Score</span>
                  <span className="text-2xl font-bold">{metrics.feedbackScore}%</span>
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="outline" className="w-full">Update Profile</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="w-full md:w-2/3">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Performance Overview</CardTitle>
                <div className="flex space-x-2">
                  <Button 
                    variant={timePeriod === '7d' ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setTimePeriod('7d')}
                  >
                    7 Days
                  </Button>
                  <Button 
                    variant={timePeriod === '30d' ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setTimePeriod('30d')}
                  >
                    30 Days
                  </Button>
                  <Button 
                    variant={timePeriod === '90d' ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setTimePeriod('90d')}
                  >
                    90 Days
                  </Button>
                </div>
              </div>
              <CardDescription>
                Your GitHub activity and performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              {userData.loading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="h-6 w-6 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={metrics.commitActivity}
                      margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(date) => {
                          const d = new Date(date);
                          return `${d.getMonth() + 1}/${d.getDate()}`;
                        }}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line 
                        type="monotone" 
                        dataKey="commits" 
                        stroke="#10b981" 
                        strokeWidth={2} 
                        activeDot={{ r: 6 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="additions" 
                        stroke="#3b82f6" 
                        strokeWidth={1.5}
                        dot={false}
                        strokeDasharray="3 3"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="deletions" 
                        stroke="#ef4444" 
                        strokeWidth={1.5}
                        dot={false}
                        strokeDasharray="3 3"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-muted-foreground">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span>Commits</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span>Additions</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <span>Deletions</span>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
        
        {/* Performance Metrics */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-4">Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Code className="h-4 w-4 mr-2" />
                  Code Quality
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">{metrics.codeQuality}%</div>
                <Progress value={metrics.codeQuality} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Based on code reviews and static analysis
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Contribution Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">{metrics.contributionScore}%</div>
                <Progress value={metrics.contributionScore} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Based on commit frequency and impact
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">{metrics.responseTime}%</div>
                <Progress value={metrics.responseTime} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Average time to respond to reviews and issues
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Project Completion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">{metrics.projectCompletion}%</div>
                <Progress value={metrics.projectCompletion} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Percent of tasks completed on schedule
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
        
        {/* Top Skills and Feedback Tabs */}
        <motion.div variants={itemVariants}>
          <Tabs defaultValue="skills" className="w-full">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="skills" className="w-1/2">Top Skills</TabsTrigger>
              <TabsTrigger value="feedback" className="w-1/2">AI Project Manager Feedback</TabsTrigger>
            </TabsList>
            
            <TabsContent value="skills">
              <Card>
                <CardHeader>
                  <CardTitle>Your Top Skills</CardTitle>
                  <CardDescription>Based on GitHub repositories and project contributions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      {metrics.topSkills.map((skill, index) => (
                        <div key={skill.name} className="mb-4">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">{skill.name}</span>
                            <span>{skill.value}%</span>
                          </div>
                          <Progress value={skill.value} className="h-2" 
                            style={{ '--tw-progress-color': skill.color }} 
                          />
                        </div>
                      ))}
                    </div>
                    
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={metrics.topSkills}
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis type="number" domain={[0, 100]} />
                          <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} />
                          <Tooltip />
                          <Bar dataKey="value" barSize={20} radius={[0, 4, 4, 0]}>
                            {metrics.topSkills.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Skill Development Plan</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="feedback">
              <Card>
                <CardHeader>
                  <CardTitle>AI Project Manager Feedback</CardTitle>
                  <CardDescription>Recent feedback on your code and contributions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {metrics.recentFeedback.map(feedback => (
                      <div key={feedback.id} className="border rounded-lg p-4 bg-card">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3">
                            {feedback.type === 'positive' ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-amber-500 mt-1" />
                            )}
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold">{feedback.project}</h4>
                                <Badge variant={feedback.type === 'positive' ? "success" : "warning"}>
                                  {feedback.type === 'positive' ? 'Positive' : 'For Improvement'}
                                </Badge>
                              </div>
                              <p className="mt-1 text-muted-foreground">{feedback.message}</p>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {feedback.skills.map(skill => (
                                  <Badge key={skill} variant="outline" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(feedback.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All Feedback</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
        
        {/* Active Projects Section */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-4">Active Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.activeProjects.map(project => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{project.name}</span>
                    <Badge 
                      variant={
                        project.progress > 80 ? "success" :
                        project.progress > 40 ? "warning" : "destructive"
                      }
                    >
                      {project.progress}%
                    </Badge>
                  </CardTitle>
                  <CardDescription>Role: {project.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={project.progress} className="h-2" />
                  
                  <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-muted-foreground" />
                      <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-muted-foreground" />
                      <span>Tasks: {project.tasks.completed}/{project.tasks.total}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm" className="gap-1">
                    <GitBranch size={16} />
                    <span>Repository</span>
                  </Button>
                  <Button variant="outline" size="sm">View Project</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UserPerformanceDashboard;