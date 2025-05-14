
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Search } from "lucide-react";

// Mock courses data for browse page
const MOCK_BROWSE_COURSES = [
  {
    id: "1",
    title: "Introduction to React",
    instructor: "John Instructor",
    description: "Learn the fundamentals of React, a popular JavaScript library for building user interfaces.",
    category: "Web Development",
    rating: 4.7,
    reviewCount: 18,
    students: 24,
    price: 49.99,
    image: "https://source.unsplash.com/random/300x200?react",
  },
  {
    id: "2",
    title: "Advanced JavaScript Concepts",
    instructor: "Sarah Teacher",
    description: "Deep dive into advanced JavaScript concepts like closures, prototypes, asynchronous programming, and more.",
    category: "Programming",
    rating: 4.8,
    reviewCount: 23,
    students: 36,
    price: 59.99,
    image: "https://source.unsplash.com/random/300x200?javascript",
  },
  {
    id: "3",
    title: "CSS and Tailwind Masterclass",
    instructor: "David Designer",
    description: "Master modern CSS techniques and learn how to build beautiful interfaces with Tailwind CSS.",
    category: "Web Design",
    rating: 4.5,
    reviewCount: 14,
    students: 29,
    price: 44.99,
    image: "https://source.unsplash.com/random/300x200?css",
  },
  {
    id: "4",
    title: "Node.js Backend Development",
    instructor: "Michael Server",
    description: "Build robust backend services with Node.js, Express, and MongoDB.",
    category: "Backend Development",
    rating: 4.6,
    reviewCount: 31,
    students: 42,
    price: 54.99,
    image: "https://source.unsplash.com/random/300x200?nodejs",
  },
  {
    id: "5",
    title: "UI/UX Design Fundamentals",
    instructor: "Emma Creative",
    description: "Learn the principles of user experience design and create beautiful user interfaces.",
    category: "Design",
    rating: 4.9,
    reviewCount: 27,
    students: 38,
    price: 64.99,
    image: "https://source.unsplash.com/random/300x200?design",
  },
  {
    id: "6",
    title: "Full-Stack Web Development",
    instructor: "Robert Full",
    description: "Comprehensive guide to becoming a full-stack developer with modern technologies.",
    category: "Web Development",
    rating: 4.7,
    reviewCount: 42,
    students: 56,
    price: 79.99,
    image: "https://source.unsplash.com/random/300x200?webdev",
  },
];

// Unique categories
const CATEGORIES = ["All", ...new Set(MOCK_BROWSE_COURSES.map(course => course.category))];

const CourseBrowse: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Filter courses based on search term and category
  const filteredCourses = MOCK_BROWSE_COURSES.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <header className="mb-8">
        <h1 className="page-header">Browse Courses</h1>
        <p className="text-muted-foreground">
          Discover a variety of courses to enhance your skills
        </p>
      </header>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden flex flex-col">
              <div className="h-40 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <div className="bg-lms-light text-lms-primary text-xs font-medium px-2 py-1 rounded">
                    {course.category}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
              </CardHeader>
              
              <CardContent className="pb-2 flex-1">
                <p className="text-sm line-clamp-2">{course.description}</p>
                
                <div className="flex items-center mt-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill={star <= Math.floor(course.rating) ? "currentColor" : "none"}
                        stroke="currentColor"
                        className={`h-4 w-4 ${star <= Math.floor(course.rating) ? "text-yellow-500" : "text-gray-300"}`}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-medium">{course.rating}</span>
                  <span className="mx-1 text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">({course.reviewCount} reviews)</span>
                </div>
              </CardContent>
              
              <CardFooter className="pt-2 flex justify-between items-center">
                <div className="text-lg font-bold">${course.price}</div>
                <Button asChild>
                  <Link to={`/courses/${course.id}`}>
                    <BookOpen className="mr-2 h-4 w-4" /> View Course
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No courses found</h2>
          <p className="text-muted-foreground">
            Try adjusting your search or filter to find what you're looking for
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseBrowse;
