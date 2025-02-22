"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { 
  GitPullRequest, MessageSquare, ThumbsUp, ThumbsDown, Clock, 
  AlertCircle, CheckCircle, Filter, Search, GitCommit
} from 'lucide-react';

const CodeReviewDashboard = () => {
  const [reviewData, setReviewData] = useState({
    loading: true,
    metrics: {
      totalReviews: 0,
      approvalRate: 0,
      averageResponseTime: '',
      outstandingReviews: 0
    },
    reviews: []
  });

  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock review data
      const mockReviews = [
        {
          id: 1,
          title: "Feature: Add user authentication",
          description: "Implement JWT-based authentication system",
          author: {
            name: "Alex Kim",
            avatar: "/api/placeholder/40/40"
          },
          status: "pending",
          created: "2025-02-20T10:30:00",
          updatedAt: "2025-02-21T14:20:00",
          comments: 5,
          commits: 3,
          linesChanged: { added: 245, removed: 82 },
          reviewers: [
            { name: "Sarah Chen", avatar: "/api/placeholder/40/40", status: "approved" },
            { name: "Mike Jones", avatar: "/api/placeholder/40/40", status: "pending" }
          ],
          priority: "high",
          repository: "auth-service",
          branch: "feature/user-auth"
        },
        {
          id: 2,
          title: "Fix: Database connection pooling",
          description: "Optimize connection pool settings for better performance",
          author: {
            name: "Emma Wilson",
            avatar: "/api/placeholder/40/40"
          },
          status: "approved",
          created: "2025-02-19T15:45:00",
          updatedAt: "2025-02-20T11:30:00",
          comments: 3,
          commits: 1,
          linesChanged: { added: 56, removed: 23 },
          reviewers: [
            { name: "John Smith", avatar: "/api/placeholder/40/40", status: "approved" }
          ],
          priority: "medium",
          repository: "backend-core",
          branch: "fix/db-pooling"
        },
        {
          id: 3,
          title: "Refactor: API error handling",
          description: "Standardize error responses across all endpoints",
          author: {
            name: "David Park",
            avatar: "/api/placeholder/40/40"
          },
          status: "changes_requested",
          created: "2025-02-18T09:15:00",
          updatedAt: "2025-02-19T16:40:00",
          comments: 8,
          commits: 2,
          linesChanged: { added: 178, removed: 156 },
          reviewers: [
            { name: "Lisa Johnson", avatar: "/api/placeholder/40/40", status: "changes_requested" },
            { name: "Tom Brown", avatar: "/api/placeholder/40/40", status: "pending" }
          ],
          priority: "medium",
          repository: "api-gateway",
          branch: "refactor/error-handling"
        }
      ];

      setReviewData({
        loading: false,
        metrics: {
          totalReviews: 24,
          approvalRate: 87,
          averageResponseTime: '2.5 hours',
          outstandingReviews: 5
        },
        reviews: mockReviews
      });
    };

    fetchData();
  }, [filter]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-500';
      case 'changes_requested': return 'text-red-500';
      case 'pending': return 'text-yellow-500';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High Priority</Badge>;
      case 'medium':
        return <Badge variant="warning">Medium Priority</Badge>;
      default:
        return <Badge>Low Priority</Badge>;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-muted-foreground">Total Reviews</span>
                  <span className="text-2xl font-bold">{reviewData.metrics.totalReviews}</span>
                </div>
                <GitPullRequest className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-muted-foreground">Approval Rate</span>
                  <span className="text-2xl font-bold">{reviewData.metrics.approvalRate}%</span>
                </div>
                <ThumbsUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-muted-foreground">Avg Response Time</span>
                  <span className="text-2xl font-bold">{reviewData.metrics.averageResponseTime}</span>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-muted-foreground">Outstanding</span>
                  <span className="text-2xl font-bold">{reviewData.metrics.outstandingReviews}</span>
                </div>
                <AlertCircle className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reviews List */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Code Reviews</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
            <CardDescription>
              Track and manage all code review requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reviewData.reviews.map(review => (
                <div key={review.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{review.title}</h3>
                        {getPriorityBadge(review.priority)}
                      </div>
                      <p className="text-sm text-muted-foreground">{review.description}</p>
                    </div>
                    <Badge variant={
                      review.status === 'approved' ? 'success' :
                      review.status === 'changes_requested' ? 'destructive' : 'outline'
                    }>
                      {review.status.replace('_', ' ')}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <GitCommit className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{review.commits} commits</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{review.comments} comments</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm">+{review.linesChanged.added}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ThumbsDown className="h-4 w-4 text-red-500" />
                      <span className="text-sm">-{review.linesChanged.removed}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={review.author.avatar} />
                          <AvatarFallback>{review.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{review.author.name}</span>
                      </div>
                      <div className="flex -space-x-2">
                        {review.reviewers.map((reviewer, idx) => (
                          <Avatar key={idx} className={`h-6 w-6 border-2 border-background ${getStatusColor(reviewer.status)}`}>
                            <AvatarImage src={reviewer.avatar} />
                            <AvatarFallback>{reviewer.name[0]}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Load More Reviews</Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default CodeReviewDashboard;