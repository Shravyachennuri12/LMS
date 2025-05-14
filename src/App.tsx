
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Layout from "@/components/Layout";

// Auth Pages
import Login from "@/pages/Login";
import Register from "@/pages/Register";

// Dashboard Pages
import Dashboard from "@/pages/Dashboard";
import StudentDashboard from "@/pages/Student/StudentDashboard";
import InstructorDashboard from "@/pages/Instructor/InstructorDashboard";

// Course Pages
import CourseBrowse from "@/pages/Course/CourseBrowse";
import CourseDetail from "@/pages/Course/CourseDetail";
import CreateCourse from "@/pages/Instructor/CreateCourse";

// Error Pages
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Dashboard Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/student/dashboard" 
                element={
                  <ProtectedRoute requiredRole="student">
                    <StudentDashboard />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/instructor/dashboard" 
                element={
                  <ProtectedRoute requiredRole="instructor">
                    <InstructorDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Course Routes */}
              <Route 
                path="/courses/browse" 
                element={
                  <ProtectedRoute>
                    <CourseBrowse />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/courses/create" 
                element={
                  <ProtectedRoute requiredRole="instructor">
                    <CreateCourse />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/courses/:id" 
                element={
                  <ProtectedRoute>
                    <CourseDetail />
                  </ProtectedRoute>
                } 
              />
              
              {/* Default Route */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              {/* 404 Page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
