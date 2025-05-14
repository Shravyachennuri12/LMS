
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, CalendarIcon, EditIcon, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Mock course data
const MOCK_INSTRUCTOR_COURSES = [
  {
    id: "1",
    title: "Introduction to React",
    students: 24,
    rating: 4.7,
    image: "https://source.unsplash.com/random/300x200?react",
    published: true,
    progress: 100
  },
  {
    id: "2",
    title: "Node.js Masterclass",
    students: 18,
    rating: 4.5,
    image: "https://source.unsplash.com/random/300x200?javascript",
    published: true,
    progress: 100
  },
  {
    id: "3",
    title: "Advanced CSS Techniques",
    students: 0,
    rating: 0,
    image: "https://source.unsplash.com/random/300x200?css",
    published: false,
    progress: 60
  }
];

// Mock metrics data for the dashboard
const MOCK_METRICS = {
  totalStudents: 42,
  totalCourses: 3,
  totalRevenue: 1250,
  averageRating: 4.6
};

const InstructorDashboard: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div>
      <header className="mb-8">
        <h1 className="page-header">Instructor Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name}! Manage your courses and students.
        </p>
      </header>
      
      <section className="mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Students</CardDescription>
              <CardTitle className="text-3xl">{MOCK_METRICS.totalStudents}</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-xs text-muted-foreground">
                <span className="text-green-500 font-medium">↑ 12%</span> from last month
              </div>
            </CardContent>
            <CardFooter>
              <Users size={20} className="text-muted-foreground" />
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Courses</CardDescription>
              <CardTitle className="text-3xl">{MOCK_METRICS.totalCourses}</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-xs text-muted-foreground">
                <span className="text-green-500 font-medium">↑ 1</span> new this month
              </div>
            </CardContent>
            <CardFooter>
              <CalendarIcon size={20} className="text-muted-foreground" />
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Revenue</CardDescription>
              <CardTitle className="text-3xl">${MOCK_METRICS.totalRevenue}</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-xs text-muted-foreground">
                <span className="text-green-500 font-medium">↑ $350</span> from last month
              </div>
            </CardContent>
            <CardFooter>
              <BarChart size={20} className="text-muted-foreground" />
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Average Rating</CardDescription>
              <CardTitle className="text-3xl">{MOCK_METRICS.averageRating}</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-xs text-muted-foreground">
                <span className="text-green-500 font-medium">↑ 0.2</span> from last month
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill={star <= Math.floor(MOCK_METRICS.averageRating) ? "currentColor" : "none"}
                    stroke="currentColor"
                    className={`h-3 w-3 ${star <= Math.floor(MOCK_METRICS.averageRating) ? "text-yellow-500" : "text-gray-300"}`}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </CardFooter>
          </Card>
        </div>
      </section>
      
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold font-heading">Your Courses</h2>
          <Link to="/courses/create">
            <Button>
              Create New Course
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_INSTRUCTOR_COURSES.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <div className="h-40 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <CardDescription>
                  {course.published ? (
                    <span className="text-green-500 font-medium">Published</span>
                  ) : (
                    <span className="text-amber-500 font-medium">Draft</span>
                  )}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pb-2">
                {course.published ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Students enrolled</span>
                      <span className="font-medium">{course.students}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <span>Rating</span>
                        <div className="flex ml-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill={star <= Math.floor(course.rating) ? "currentColor" : "none"}
                              stroke="currentColor"
                              className={`h-3 w-3 ${star <= Math.floor(course.rating) ? "text-yellow-500" : "text-gray-300"}`}
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <span className="font-medium">{course.rating}</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Completion</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild className="flex-1 mr-2">
                  <Link to={`/courses/${course.id}`}>
                    View
                  </Link>
                </Button>
                <Button asChild className="flex-1">
                  <Link to={`/courses/${course.id}/edit`}>
                    <EditIcon className="mr-2 h-4 w-4" /> Edit
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default InstructorDashboard;
