"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Briefcase, Calendar, Users, ChevronRight, Search, Filter, ArrowUp, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import axios from 'axios';

const ProjectLanding = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [industries, setIndustries] = useState(['All']);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
const response = await axios.get("/api/projects/getAllProjects");        
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        
        const data = await response.json();
        setProjects(data.projects);
        
        // Extract unique industries for filter
        const uniqueIndustries = ['All', ...new Set(data.projects.map(project => project.industry))];
        setIndustries(uniqueIndustries);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching projects:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter projects based on search term and selected industry
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === 'All' || project.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  // Handle industry filter change
  const handleIndustryChange = (industry) => {
    setSelectedIndustry(industry);
  };

  // Open project details modal
  const openProjectDetails = (project) => {
    setSelectedProject(project);
  };

  // Close project details modal
  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  // Enhanced animation variants
  const navbarVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const AnimatedTitle = ({ text }) => {
    return (
      <div className="flex justify-center flex-wrap">
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.05 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent"
          >
            {char}
          </motion.span>
        ))}
      </div>
    );
  };

  // Loading skeleton component
  const ProjectSkeleton = () => (
    <div className="border border-primary/10 rounded-lg p-4 h-full bg-card/50 backdrop-blur-sm">
      <div className="h-6 w-3/4 bg-muted rounded mb-4 animate-pulse"></div>
      <div className="h-4 w-1/4 bg-muted rounded mb-8 animate-pulse"></div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
        <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
        <div className="h-4 w-3/4 bg-muted rounded animate-pulse"></div>
      </div>
      <div className="flex gap-2 mt-6">
        <div className="h-6 w-16 bg-muted rounded animate-pulse"></div>
        <div className="h-6 w-16 bg-muted rounded animate-pulse"></div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
        <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
      </div>
      <div className="h-10 w-full bg-muted rounded mt-6 animate-pulse"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Navigation Bar */}
      <motion.nav 
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        className="sticky top-0 z-50 backdrop-blur-lg border-b border-primary/10 bg-background/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center cursor-pointer"
            >
              <span className="text-2xl font-bold text-primary">ProjectHub</span>
            </motion.div>
            <div className="flex items-center space-x-4">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button variant="ghost">About</Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button variant="ghost">Contact</Button>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button>Sign In</Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="text-center mb-12">
          <AnimatedTitle text="Discover Amazing Projects" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-muted-foreground mt-4"
          >
            Find the perfect project to showcase your skills and make an impact
          </motion.p>
        </div>

        {/* Search and Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              className="pl-10"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => document.getElementById('industry-dropdown').classList.toggle('hidden')}
            >
              <Filter size={20} />
              {selectedIndustry}
            </Button>
            <div 
              id="industry-dropdown" 
              className="hidden absolute right-0 mt-2 py-2 w-48 bg-background border border-primary/10 rounded-md shadow-lg z-10"
            >
              {industries.map((industry) => (
                <div 
                  key={industry}
                  className="px-4 py-2 hover:bg-primary/10 cursor-pointer"
                  onClick={() => {
                    handleIndustryChange(industry);
                    document.getElementById('industry-dropdown').classList.add('hidden');
                  }}
                >
                  {industry}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Status Messages */}
        {isLoading && (
          <div className="text-center py-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[...Array(6)].map((_, index) => (
                <ProjectSkeleton key={index} />
              ))}
            </motion.div>
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-destructive/20 border border-destructive/50 text-destructive p-4 rounded-md text-center mb-8"
          >
            {error}. Please try refreshing the page.
          </motion.div>
        )}

        {!isLoading && !error && filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <p className="text-xl text-muted-foreground">No projects found matching your criteria.</p>
          </motion.div>
        )}

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {!isLoading && filteredProjects.map((project) => (
            <motion.div
              key={project.id || project._id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="group cursor-pointer h-full"
              onClick={() => openProjectDetails(project)}
            >
              <Card className="overflow-hidden border border-primary/10 bg-card/50 backdrop-blur-sm h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-xl font-bold line-clamp-1">{project.title}</span>
                    <Badge variant="outline" className="text-sm">
                      {project.industry}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 flex-grow flex flex-col">
                  <p className="text-muted-foreground line-clamp-3 flex-grow">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.skills_required.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      <span>{project.RemainingMembers} of {project.TotalteamMembersRequired} spots</span>
                    </div>
                    <div className="flex items-center gap-2 truncate">
                      <Github size={16} />
                      <span className="truncate">{project.repo?.owner}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase size={16} />
                      <span>{project.industry}</span>
                    </div>
                  </div>

                  <motion.div 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      openProjectDetails(project);
                    }}
                  >
                    <Button className="w-full mt-4 group-hover:bg-primary/90">
                      <span>View Details</span>
                      <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <Dialog open={!!selectedProject} onOpenChange={closeProjectDetails}>
            <DialogContent className="max-w-3xl overflow-y-auto max-h-[90vh]">
              <DialogHeader>
                <div className="flex justify-between items-center">
                  <DialogTitle className="text-2xl font-bold">{selectedProject.title}</DialogTitle>
                  <Badge variant="outline" className="text-sm">
                    {selectedProject.industry}
                  </Badge>
                </div>
                <DialogDescription>
                  <div className="flex items-center text-sm text-muted-foreground gap-2 mt-2">
                    <Calendar size={16} />
                    <span>Deadline: {new Date(selectedProject.deadline).toLocaleDateString()}</span>
                  </div>
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 my-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">About this project</h3>
                  <p className="text-muted-foreground">{selectedProject.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Skills Required</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.skills_required.map((skill) => (
                      <Badge key={skill} variant="secondary" className="px-3 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Team Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Users size={18} />
                        <span>Total Team Size: {selectedProject.TotalteamMembersRequired}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={18} className="text-primary" />
                        <span>Open Positions: {selectedProject.RemainingMembers}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Project Repository</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Github size={18} />
                        <span>Owner: {selectedProject.repo?.owner}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Github size={18} className="text-primary" />
                        <a 
                          href={selectedProject.repo?.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {selectedProject.repo?.name}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto"
                  onClick={closeProjectDetails}
                >
                  Close
                </Button>
                <Button 
                  className="w-full sm:w-auto"
                >
                  Apply Now
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: showScrollTop ? 1 : 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-4 bg-primary rounded-full shadow-lg text-white"
      >
        <ArrowUp size={24} />
      </motion.button>
    </div>
  );
};

export default ProjectLanding;