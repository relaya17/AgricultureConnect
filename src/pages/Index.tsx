import { useState, useEffect } from "react";
import AuthForm from "@/components/AuthForm";
import Dashboard from "@/components/Dashboard";
import GlobalConnect from "@/components/GlobalConnect";
import FarmManagement from "@/components/FarmManagement";
import Education from "@/components/Education";
import ChatSystem from "@/components/ChatSystem";
import Notifications from "@/components/Notifications";

type ViewType = "auth" | "dashboard" | "global" | "farm" | "education" | "chat" | "notifications";

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>("auth");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'auth-success') {
        setIsAuthenticated(true);
        setCurrentView("dashboard");
      } else if (event.data.type === 'navigate') {
        setCurrentView(event.data.view);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  if (!isAuthenticated) {
    return <AuthForm />;
  }

  switch (currentView) {
    case "global":
      return <GlobalConnect />;
    case "farm":
      return <FarmManagement />;
    case "education":
      return <Education />;
    case "chat":
      return <ChatSystem />;
    case "notifications":
      return <Notifications />;
    default:
      return <Dashboard />;
  }
};

export default Index;
