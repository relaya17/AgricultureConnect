import { useState, useEffect } from "react";
import AuthForm from "@/components/AuthForm";
import Dashboard from "@/components/Dashboard";
import GlobalConnect from "@/components/GlobalConnect";
import FarmManagement from "@/components/FarmManagement";
import Education from "@/components/Education";
import ChatSystem from "@/components/ChatSystem";
import Notifications from "@/components/Notifications";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import AIChatBot from "@/components/AIChatBot";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import GamificationSystem from "@/components/GamificationSystem";

type ViewType = "landing" | "auth" | "dashboard" | "analytics" | "gamification" | "global" | "farm" | "education" | "chat" | "notifications";

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>("landing");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'auth-success') {
        setIsAuthenticated(true);
        setCurrentView("dashboard");
      } else if (event.data.type === 'navigate') {
        setCurrentView(event.data.view);
      } else if (event.data.type === 'show-landing') {
        setCurrentView("landing");
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

      // Landing Page
      if (currentView === "landing") {
        return (
          <div className="min-h-screen">
            <HeroSection />
            <FeaturesSection />
            <TestimonialsSection />
            <PricingSection />
            <AIChatBot isOpen={isChatBotOpen} onToggle={() => setIsChatBotOpen(!isChatBotOpen)} />
          </div>
        );
      }

  // Authentication
  if (!isAuthenticated) {
    return <AuthForm />;
  }

      // App Views
      switch (currentView) {
        case "analytics":
          return <AnalyticsDashboard />;
        case "gamification":
          return <GamificationSystem />;
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
