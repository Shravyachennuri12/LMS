
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Book, BookOpen } from "lucide-react";

// Mock enrolled courses for the demo
const MOCK_ENROLLED_COURSES = [
  {
    id: "1",
    title: "Introduction to React",
    instructor: "John Instructor",
    progress: 65,
    image: "https://source.unsplash.com/random/300x200?react",
    lastAccessed: "2 days ago"
  },
  {
    id: "2",
    title: "Advanced JavaScript Concepts",
    instructor: "Sarah Teacher",
    progress: 30,
    image: "https://source.unsplash.com/random/300x200?javascript",
    lastAccessed: "4 days ago"
  },
  {
    id: "3",
    title: "CSS and Tailwind Masterclass",
    instructor: "David Designer",
    progress: 80,
    image: "https://source.unsplash.com/random/300x200?css",
    lastAccessed: "1 day ago"
  }
];

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div>
      <header className="mb-8">
        <h1 className="page-header">Student Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name}! Continue your learning journey.
        </p>
      </header>
      
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold font-heading">Continue Learning</h2>
          <Link to="/courses/enrolled">
            <Button variant="outline">View all courses</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_ENROLLED_COURSES.map((course) => (
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
                <CardDescription>Instructor: {course.instructor}</CardDescription>
              </CardHeader>
              
              <CardContent className="pb-2">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">Last accessed: {course.lastAccessed}</p>
              </CardContent>
              
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to={`/courses/${course.id}`}>
                    <BookOpen className="mr-2 h-4 w-4" /> Continue Learning
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
      
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold font-heading">Recommended Courses</h2>
          <Link to="/courses/browse">
            <Button variant="outline">Browse All</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Node.js Backend Development</CardTitle>
              <CardDescription>Build secure and scalable APIs</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm">Learn how to create robust backend services with Node.js and Express.</p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" asChild className="w-full">
                <Link to="/courses/browse">
                  <Book className="mr-2 h-4 w-4" /> Explore
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">UI/UX Design Fundamentals</CardTitle>
              <CardDescription>Create beautiful user experiences</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm">Master the principles of user interface and experience design.</p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" asChild className="w-full">
                <Link to="/courses/browse">
                  <Book className="mr-2 h-4 w-4" /> Explore
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Full-Stack Development</CardTitle>
              <CardDescription>Become a complete developer</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm">Comprehensive course covering frontend and backend technologies.</p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" asChild className="w-full">
                <Link to="/courses/browse">
                  <Book className="mr-2 h-4 w-4" /> Explore
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;
