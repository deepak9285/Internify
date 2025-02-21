'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, Calendar, Code, FileText, LayoutDashboard, Zap, 
  MessageSquare, Settings, Users, PieChart, Search, 
  ChevronDown, Plus, Activity 
} from 'lucide-react';

// Shadcn component imports
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Animation variants
const animations = {
  container: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  },
  item: {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  },
  sidebar: {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } }
  }
};

// Component for nav items to reduce repetition
const NavItem = ({ icon: Icon, label, onClick, active }) => (
  <Button 
    variant="ghost" 
    className={`w-full justify-start ${active ? 'bg-slate-100 dark:bg-slate-800' : ''}`} 
    onClick={onClick}
  >
    <Icon className="mr-2 h-4 w-4" />
    {label}
  </Button>
);

// Task item component
const TaskItem = ({ title, priority, status, variant = "solid" }) => (
  <div className="flex justify-between items-start">
    <div>
      <p className="font-medium">{title}</p>
      <p className="text-sm text-slate-500">{priority} Priority</p>
    </div>
    <Badge variant={variant}>{status}</Badge>
  </div>
);

// Activity item component
const ActivityItem = ({ icon: Icon, user, action, target, time }) => (
  <div className="flex gap-3">
    <Icon className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
    <div>
      <p className="text-sm">
        <span className="font-medium">{user}</span> {action} <span className="text-indigo-500">{target}</span>
      </p>
      <p className="text-xs text-slate-500">{time}</p>
    </div>
  </div>
);

// Milestone item component
const MilestoneItem = ({ title, date, daysLeft, assignees, status }) => (
  <div>
    <div className="flex justify-between">
      <p className="font-medium">{title}</p>
      <Badge 
        variant="outline" 
        className={`${
          status === 'soon' 
            ? 'bg-amber-50 text-amber-700 hover:bg-amber-50' 
            : 'bg-green-50 text-green-700 hover:bg-green-50'
        }`}
      >
        {daysLeft} days
      </Badge>
    </div>
    <p className="text-sm text-slate-500">{date}</p>
    <div className="mt-2 flex gap-1">
      {assignees.map((assignee, index) => (
        <Avatar className="h-6 w-6" key={index}>
          <AvatarFallback className="text-xs">{assignee}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  </div>
);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Nav items data for cleaner rendering
  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', value: 'overview' },
    { icon: FileText, label: 'My Tasks', value: 'tasks' },
    { icon: Code, label: 'Code Reviews', value: 'reviews' },
    { icon: Calendar, label: 'Timeline', value: null },
    { icon: MessageSquare, label: 'Messages', value: null },
    { icon: Users, label: 'Team', value: null },
    { icon: PieChart, label: 'Metrics', value: 'metrics' }
  ];
  
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      {/* Sidebar */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={animations.sidebar}
        className="w-64 border-r border-slate-200 dark:border-slate-800 p-4 flex flex-col"
      >
        <div className="flex items-center gap-2 mb-8">
          <Zap className="h-6 w-6 text-indigo-500" />
          <h1 className="font-bold text-xl">AutoPM</h1>
        </div>
        
        <nav className="space-y-1 flex-1">
          {navItems.map((item) => (
            <NavItem 
              key={item.label}
              icon={item.icon} 
              label={item.label} 
              active={activeTab === item.value}
              onClick={() => item.value && setActiveTab(item.value)} 
            />
          ))}
        </nav>
        
        <div className="mt-auto">
          <NavItem icon={Settings} label="Settings" />
          <div className="flex items-center gap-3 mt-4 p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
            <Avatar>
              <AvatarImage src="/api/placeholder/40/40" alt="Profile" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-medium">Sophia Chen</p>
              <p className="text-xs text-slate-500">Developer</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input type="search" placeholder="Search..." className="w-64 pl-8" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1">
                  Frontend Redesign <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>API Integration</DropdownMenuItem>
                <DropdownMenuItem>Mobile App</DropdownMenuItem>
                <DropdownMenuItem>Dashboard Redesign</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" /> New Task
            </Button>
            <Button size="sm">AI Assistant</Button>
          </div>
        </header>
        
        {/* Dashboard content */}
        <main className="p-6">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="tasks">My Tasks</TabsTrigger>
                <TabsTrigger value="reviews">Code Reviews</TabsTrigger>
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
              </TabsList>
              
              <Button variant="outline" size="sm">
                This Week <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </div>
            
            <TabsContent value="overview">
              <motion.div
                variants={animations.container}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {/* Project Status Card */}
                <motion.div variants={animations.item}>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Project Status</CardTitle>
                      <CardDescription>Frontend Redesign</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Sprint Progress</span>
                            <span className="text-sm font-medium">68%</span>
                          </div>
                          <Progress value={68} className="h-2" />
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <div>
                            <p className="text-slate-500">Timeline</p>
                            <p className="font-medium">Oct 10 - Nov 4</p>
                          </div>
                          <div className="text-right">
                            <p className="text-slate-500">Sprint</p>
                            <p className="font-medium">3 of 5</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                
                {/* My Tasks Card */}
                <motion.div variants={animations.item}>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>My Tasks</CardTitle>
                      <CardDescription>3 due today</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <TaskItem 
                          title="Implement Auth UI" 
                          priority="High" 
                          status="Due Today" 
                        />
                        <TaskItem 
                          title="Fix Navigation Bug" 
                          priority="Medium" 
                          status="Tomorrow" 
                          variant="outline" 
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="w-full" size="sm">View All Tasks</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
                
                {/* Code Reviews Card */}
                <motion.div variants={animations.item}>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Code Reviews</CardTitle>
                      <CardDescription>Awaiting your feedback</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <p className="font-medium">API Integration Layer</p>
                              <Badge variant="secondary">3 files</Badge>
                            </div>
                            <p className="text-sm text-slate-500">Requested 2h ago by Jason</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>AL</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <p className="font-medium">Component Library Updates</p>
                              <Badge variant="secondary">7 files</Badge>
                            </div>
                            <p className="text-sm text-slate-500">Requested 4h ago by Aisha</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="w-full" size="sm">View All Reviews</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
                
                {/* Team Activity Card */}
                <motion.div variants={animations.item}>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Team Activity</CardTitle>
                      <CardDescription>Recent updates</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <ActivityItem 
                          icon={Activity}
                          user="Marcus"
                          action="merged PR"
                          target="#234"
                          time="20 minutes ago"
                        />
                        <ActivityItem 
                          icon={Activity}
                          user="Elena"
                          action="completed"
                          target="User Flow Designs"
                          time="1 hour ago"
                        />
                        <ActivityItem 
                          icon={Activity}
                          user="Raj"
                          action="scheduled"
                          target="Demo Meeting"
                          time="2 hours ago"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                
                {/* AI Insights Card */}
                <motion.div variants={animations.item}>
                  <Card className="bg-gradient-to-br from-indigo-50 to-sky-50 dark:from-indigo-950/50 dark:to-sky-950/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-indigo-500" />
                        AI Insights
                      </CardTitle>
                      <CardDescription>Automated recommendations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="bg-white dark:bg-slate-900 p-3 rounded-lg text-sm shadow-sm">
                          <p className="font-medium mb-1">Risk detected in Auth Module</p>
                          <p className="text-slate-500">Several components have high coupling which may affect the upcoming integration.</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-3 rounded-lg text-sm shadow-sm">
                          <p className="font-medium mb-1">Resource reallocation suggested</p>
                          <p className="text-slate-500">Frontend team is ahead of schedule. Consider shifting focus to API integration.</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full bg-white/50 dark:bg-slate-900/50" size="sm">
                        View All Insights
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
                
                {/* Upcoming Milestones Card */}
                <motion.div variants={animations.item}>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Upcoming Milestones</CardTitle>
                      <CardDescription>Next 14 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <MilestoneItem
                          title="UX Handoff to Development"
                          date="Oct 24, 2024"
                          daysLeft={3}
                          assignees={['EL', 'JW']}
                          status="soon"
                        />
                        <MilestoneItem
                          title="Internal Demo"
                          date="Oct 29, 2024"
                          daysLeft={8}
                          assignees={['SC', 'RJ', '+3']}
                          status="upcoming"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="tasks">
              <div className="p-8 text-center text-slate-500">
                Task details would display here
              </div>
            </TabsContent>
            
            <TabsContent value="reviews">
              <div className="p-8 text-center text-slate-500">
                Code review details would display here
              </div>
            </TabsContent>
            
            <TabsContent value="metrics">
              <div className="p-8 text-center text-slate-500">
                Performance metrics would display here
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;