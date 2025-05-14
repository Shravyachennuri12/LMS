
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Book, BookOpen, Home, LogOut, Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useToast } from "@/components/ui/use-toast";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);
  
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
          isActive
            ? "bg-lms-primary text-white hover:bg-lms-primary/90"
            : "text-foreground hover:bg-accent hover:text-accent-foreground"
        )
      }
    >
      {icon}
      <span>{children}</span>
    </NavLink>
  );
};

const AppSidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="text-2xl font-heading font-bold text-lms-primary">BaseLdt</div>
        <div className="text-sm text-muted-foreground">Learning Management System</div>
      </SidebarHeader>
      
      <SidebarContent>
        <ScrollArea className="h-[calc(100vh-12rem)] px-3">
          <div className="space-y-1 py-2">
            <SidebarLink to="/dashboard" icon={<Home size={20} />}>
              Dashboard
            </SidebarLink>
            
            {user?.role === "instructor" ? (
              <>
                <SidebarLink to="/courses/manage" icon={<Book size={20} />}>
                  My Courses
                </SidebarLink>
                <SidebarLink to="/courses/create" icon={<Plus size={20} />}>
                  Create Course
                </SidebarLink>
              </>
            ) : (
              <>
                <SidebarLink to="/courses/browse" icon={<BookOpen size={20} />}>
                  Browse Courses
                </SidebarLink>
                <SidebarLink to="/courses/enrolled" icon={<Book size={20} />}>
                  My Learning
                </SidebarLink>
              </>
            )}
            
            <SidebarLink to="/profile" icon={<User size={20} />}>
              Profile
            </SidebarLink>
          </div>
        </ScrollArea>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-lms-primary text-white flex items-center justify-center">
              {user?.name?.charAt(0)}
            </div>
            <div>
              <div className="font-medium">{user?.name}</div>
              <div className="text-xs text-muted-foreground capitalize">{user?.role}</div>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogout} 
            className="w-full"
          >
            <LogOut size={16} className="mr-2" />
            Log out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
