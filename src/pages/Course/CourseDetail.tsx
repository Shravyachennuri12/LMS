
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Play, FileText, User, Calendar, Clock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Progress } from "@/components/ui/progress";

// Mock course data
const MOCK_COURSE = {
  id: "1",
  title: "Introduction to React",
  instructor: "John Instructor",
  instructorId: "1",
  category: "Web Development",
  description: "Learn the fundamentals of React, a popular JavaScript library for building user interfaces. This course will teach you everything you need to know to start building modern web applications with React.",
  enrolledStudents: 24,
  rating: 4.7,
  reviewCount: 18,
  price: 49.99,
  image: "https://source.unsplash.com/random/800x400?react",
  modules: [
    {
      id: "m1",
      title: "Getting Started with React",
      lessons: [
        { id: "l1", title: "Introduction to React", duration: "10:15", completed: true },
        { id: "l2", title: "Setting Up Your Development Environment", duration: "15:20", completed: true },
        { id: "l3", title: "Your First React Component", duration: "12:45", completed: false },
      ],
    },
    {
      id: "m2",
      title: "React Fundamentals",
      lessons: [
        { id: "l4", title: "JSX Syntax", duration: "14:30", completed: false },
        { id: "l5", title: "Props and State", duration: "18:15", completed: false },
        { id: "l6", title: "Handling Events", duration: "11:50", completed: false },
      ],
    },
    {
      id: "m3",
      title: "Building Real Applications",
      lessons: [
        { id: "l7", title: "Forms and Controlled Components", duration: "16:40", completed: false },
        { id: "l8", title: "Routing with React Router", duration: "20:10", completed: false },
        { id: "l9", title: "State Management with Context API", duration: "22:35", completed: false },
        { id: "l10", title: "Final Project", duration: "45:00", completed: false },
      ],
    },
  ],
  createdAt: "2023-04-15",
};

const calculateProgress = (modules: any[]) => {
  const totalLessons = modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessons = modules.reduce(
    (acc, module) => acc + module.lessons.filter((lesson: any) => lesson.completed).length,
    0
  );
  
  return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
};

const CourseDetail: React.FC = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const isInstructor = user?.role === "instructor";
  const isEnrolled = true; // In a real app, this would be determined by checking enrollment status
  
  const progress = calculateProgress(MOCK_COURSE.modules);
  
  const handleEnroll = () => {
    toast({
      title: "Enrolled Successfully",
      description: `You are now enrolled in "${MOCK_COURSE.title}"`,
    });
  };

  const handleMarkComplete = (lessonId: string) => {
    toast({
      title: "Progress Updated",
      description: "Lesson marked as completed",
    });
  };

  return (
    <div>
      <div className="relative h-64 overflow-hidden rounded-lg mb-6">
        <img
          src={MOCK_COURSE.image}
          alt={MOCK_COURSE.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6">
          <div className="text-white">
            <h1 className="text-3xl font-bold mb-2">{MOCK_COURSE.title}</h1>
            <div className="flex items-center">
              <div className="flex mr-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill={star <= Math.floor(MOCK_COURSE.rating) ? "currentColor" : "none"}
                    stroke="currentColor"
                    className={`h-5 w-5 ${star <= Math.floor(MOCK_COURSE.rating) ? "text-yellow-400" : "text-gray-300"}`}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-white">{MOCK_COURSE.rating} ({MOCK_COURSE.reviewCount} reviews)</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="content">Course Content</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-2">About This Course</h2>
                  <p className="text-muted-foreground">{MOCK_COURSE.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                      <Calendar size={24} className="mb-2 text-muted-foreground" />
                      <span className="text-sm font-medium">Created</span>
                      <span className="text-sm text-muted-foreground">{MOCK_COURSE.createdAt}</span>
                    </div>
                    
                    <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                      <User size={24} className="mb-2 text-muted-foreground" />
                      <span className="text-sm font-medium">Students</span>
                      <span className="text-sm text-muted-foreground">{MOCK_COURSE.enrolledStudents} enrolled</span>
                    </div>
                    
                    <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                      <Clock size={24} className="mb-2 text-muted-foreground" />
                      <span className="text-sm font-medium">Duration</span>
                      <span className="text-sm text-muted-foreground">3 hours 20 min</span>
                    </div>
                    
                    <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                      <FileText size={24} className="mb-2 text-muted-foreground" />
                      <span className="text-sm font-medium">Lessons</span>
                      <span className="text-sm text-muted-foreground">
                        {MOCK_COURSE.modules.reduce((acc, module) => acc + module.lessons.length, 0)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">What You'll Learn</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5 mr-2 text-green-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Understand React component architecture</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5 mr-2 text-green-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Build interactive UIs with JSX</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5 mr-2 text-green-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Manage application state effectively</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5 mr-2 text-green-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Create reusable components</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5 mr-2 text-green-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Handle forms and user input</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5 mr-2 text-green-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Implement client-side routing</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Instructor</h2>
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-full bg-lms-primary text-white flex items-center justify-center text-2xl font-bold mr-4">
                      {MOCK_COURSE.instructor.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">{MOCK_COURSE.instructor}</h3>
                      <p className="text-muted-foreground">Web Development Instructor</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="content">
              <Card>
                <CardContent className="pt-6 space-y-6">
                  {isEnrolled ? (
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Your progress</span>
                        <span className="text-sm font-medium">{progress}% complete</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  ) : (
                    <div className="bg-muted p-4 rounded-lg mb-4">
                      <p className="text-center">Enroll to access course content</p>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    {MOCK_COURSE.modules.map((module, index) => (
                      <div key={module.id} className="border rounded-lg overflow-hidden">
                        <div className="bg-muted p-4">
                          <h3 className="font-medium">
                            Module {index + 1}: {module.title}
                          </h3>
                        </div>
                        <div className="divide-y">
                          {module.lessons.map((lesson) => (
                            <div 
                              key={lesson.id}
                              className={`p-4 flex items-center justify-between ${
                                !isEnrolled ? "opacity-75" : ""
                              }`}
                            >
                              <div className="flex items-center">
                                <div className="mr-3">
                                  {lesson.completed ? (
                                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-500 flex items-center justify-center">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="h-4 w-4"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </div>
                                  ) : (
                                    <Play size={18} className="text-muted-foreground" />
                                  )}
                                </div>
                                <span>{lesson.title}</span>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="text-sm text-muted-foreground">
                                  {lesson.duration}
                                </span>
                                {isEnrolled && !lesson.completed && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleMarkComplete(lesson.id)}
                                  >
                                    Mark Complete
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold">Student Reviews</h2>
                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill={star <= Math.floor(MOCK_COURSE.rating) ? "currentColor" : "none"}
                              stroke="currentColor"
                              className={`h-5 w-5 ${star <= Math.floor(MOCK_COURSE.rating) ? "text-yellow-500" : "text-gray-300"}`}
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2 text-lg font-medium">{MOCK_COURSE.rating}</span>
                        <span className="mx-2 text-muted-foreground">•</span>
                        <span className="text-muted-foreground">{MOCK_COURSE.reviewCount} reviews</span>
                      </div>
                    </div>
                    
                    {isEnrolled && (
                      <Button variant="outline">Write a Review</Button>
                    )}
                  </div>
                  
                  <div className="space-y-6">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-lms-light text-lms-primary flex items-center justify-center font-medium mr-3">
                            MS
                          </div>
                          <div>
                            <h3 className="font-medium">Michael Scott</h3>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill={star <= 5 ? "currentColor" : "none"}
                                  stroke="currentColor"
                                  className={`h-4 w-4 ${star <= 5 ? "text-yellow-500" : "text-gray-300"}`}
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">2 weeks ago</span>
                      </div>
                      <p>
                        This course is excellent! The instructor explains React concepts clearly and the
                        project-based learning approach really helped me understand how everything works together.
                      </p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-lms-light text-lms-primary flex items-center justify-center font-medium mr-3">
                            JH
                          </div>
                          <div>
                            <h3 className="font-medium">Jim Halpert</h3>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill={star <= 4 ? "currentColor" : "none"}
                                  stroke="currentColor"
                                  className={`h-4 w-4 ${star <= 4 ? "text-yellow-500" : "text-gray-300"}`}
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">1 month ago</span>
                      </div>
                      <p>
                        Great content but I wish there were more advanced topics covered. The basics are
                        explained really well, though. Would recommend for React beginners!
                      </p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-lms-light text-lms-primary flex items-center justify-center font-medium mr-3">
                            PB
                          </div>
                          <div>
                            <h3 className="font-medium">Pam Beesly</h3>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill={star <= 5 ? "currentColor" : "none"}
                                  stroke="currentColor"
                                  className={`h-4 w-4 ${star <= 5 ? "text-yellow-500" : "text-gray-300"}`}
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">2 months ago</span>
                      </div>
                      <p>
                        As someone with no prior React experience, I found this course super easy to follow.
                        The instructor breaks down complex topics into simple, digestible parts. The projects
                        were fun to build, too!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardContent className="p-6">
              {isEnrolled ? (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">${MOCK_COURSE.price}</h2>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-lms-primary rounded-full h-2"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{progress}%</span>
                    </div>
                  </div>
                  
                  <Button asChild className="w-full">
                    <Link to={`/courses/${id}/learn`}>
                      <Play className="mr-2 h-4 w-4" /> Continue Learning
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold">${MOCK_COURSE.price}</h2>
                    <p className="text-muted-foreground">
                      One-time payment for lifetime access
                    </p>
                  </div>
                  
                  <Button className="w-full" onClick={handleEnroll}>
                    Enroll Now
                  </Button>
                  
                  <div className="text-sm text-muted-foreground text-center">
                    30-day money-back guarantee
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 mr-2 text-green-500" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Full lifetime access</span>
                    </div>
                    <div className="flex items-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 mr-2 text-green-500" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Access on mobile and TV</span>
                    </div>
                    <div className="flex items-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 mr-2 text-green-500" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Certificate of completion</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
