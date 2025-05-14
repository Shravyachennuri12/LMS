
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

// Define user types
export type UserRole = "student" | "instructor";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Mock user data
const MOCK_USERS = [
  {
    id: "1",
    name: "John Instructor",
    email: "instructor@example.com",
    password: "password123",
    role: "instructor" as UserRole,
  },
  {
    id: "2",
    name: "Jane Student",
    email: "student@example.com",
    password: "password123",
    role: "student" as UserRole,
  },
];

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem("lms-user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("lms-user");
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call with delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = MOCK_USERS.find(
          (u) => u.email === email && u.password === password
        );

        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          setIsAuthenticated(true);
          localStorage.setItem("lms-user", JSON.stringify(userWithoutPassword));
          toast({
            title: "Login successful",
            description: `Welcome back, ${foundUser.name}!`,
          });
          resolve(true);
        } else {
          toast({
            title: "Login failed",
            description: "Invalid email or password",
            variant: "destructive",
          });
          resolve(false);
        }
      }, 1000); // Simulate network delay
    });
  };

  const register = async (
    name: string, 
    email: string, 
    password: string, 
    role: UserRole
  ): Promise<boolean> => {
    // Simulate API call with delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const existingUser = MOCK_USERS.find((u) => u.email === email);
        
        if (existingUser) {
          toast({
            title: "Registration failed",
            description: "Email already exists",
            variant: "destructive",
          });
          resolve(false);
          return;
        }

        // In a real app, we'd make an API call to create the user
        // For now, we'll just simulate success
        const newUser = {
          id: String(MOCK_USERS.length + 1),
          name,
          email,
          role,
        };

        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem("lms-user", JSON.stringify(newUser));
        
        toast({
          title: "Registration successful",
          description: "Your account has been created",
        });
        
        resolve(true);
      }, 1000); // Simulate network delay
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("lms-user");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
