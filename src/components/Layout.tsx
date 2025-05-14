
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import AppSidebar from "@/components/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <>{children}</>;
  }
  
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-muted/30">
        <AppSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="h-14 border-b flex items-center px-4">
            <SidebarTrigger>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu size={20} />
                <span className="sr-only">Toggle sidebar</span>
              </Button>
            </SidebarTrigger>
          </header>
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto p-4 md:p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
