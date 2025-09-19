import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Star, Users, TrendingUp, Globe } from "lucide-react";

const HeroSection = () => {
  const [currentStat, setCurrentStat] = useState(0);
  
  const stats = [
    { number: "50,000+", label: "חקלאים פעילים", icon: Users },
    { number: "150+", label: "מדינות", icon: Globe },
    { number: "98%", label: "שיעור הצלחה", icon: TrendingUp },
    { number: "4.9/5", label: "דירוג לקוחות", icon: Star }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 via-green-500/10 to-teal-600/20"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23059669%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-200/30 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-green-200/20 rounded-full blur-2xl animate-bounce"></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-teal-200/40 rounded-full blur-lg animate-pulse"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="mb-8">
          <Badge variant="secondary" className="px-6 py-2 text-lg bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200 transition-colors">
            🚀 הפלטפורמה החדשנית ביותר לחקלאות חכמה
          </Badge>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
          <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent animate-pulse">
            AgriConnect
          </span>
          <br />
          <span className="text-gray-800 text-4xl md:text-5xl lg:text-6xl">
            עתיד החקלאות
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
          חיבור חקלאים מכל העולם, ניהול חוות חכם, והדרכה מקצועית מתקדמת. 
          <span className="text-emerald-600 font-semibold"> הגדל את התפוקה שלך ב-300%</span> עם הטכנולוגיה החדשנית ביותר
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Button 
            size="lg" 
            className="px-8 py-4 text-lg bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105"
          >
            התחל עכשיו בחינם
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="px-8 py-4 text-lg border-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50 transition-all duration-300"
          >
            <Play className="mr-2 w-5 h-5" />
            צפה בדמו
          </Button>
        </div>

        {/* Dynamic Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={index}
                className={`transition-all duration-500 transform ${
                  currentStat === index 
                    ? 'scale-110 shadow-2xl shadow-emerald-500/20 bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200' 
                    : 'scale-100 hover:scale-105'
                }`}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center transition-colors ${
                    currentStat === index 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-emerald-100 text-emerald-600'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className={`text-3xl font-bold mb-2 transition-colors ${
                    currentStat === index ? 'text-emerald-600' : 'text-gray-800'
                  }`}>
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-500 mb-6">סומכים עלינו:</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-2xl font-bold text-emerald-600">🇮🇱 משרד החקלאות</div>
            <div className="text-2xl font-bold text-green-600">🌍 FAO</div>
            <div className="text-2xl font-bold text-teal-600">🏛️ אוניברסיטאות מובילות</div>
            <div className="text-2xl font-bold text-emerald-600">🏆 500+ חוות מובילות</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
