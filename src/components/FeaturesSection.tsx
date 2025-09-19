import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Globe, 
  TrendingUp, 
  Shield, 
  Zap, 
  Users, 
  BarChart3, 
  Smartphone,
  Cloud,
  Lock,
  MessageCircle,
  BookOpen
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "בינה מלאכותית מתקדמת",
      description: "אלגוריתמים חכמים שמנתחים את הנתונים שלך ומציעים המלצות מותאמות אישית",
      badge: "חדש!",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      icon: Globe,
      title: "חיבור גלובלי",
      description: "התחבר עם 50,000+ חקלאים מ-150 מדינות, שתף ידע וקבל ייעוץ ממומחים",
      badge: "פופולרי",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: TrendingUp,
      title: "הגדלת תפוקה ב-300%",
      description: "מערכת ניהול מתקדמת שמגדילה את התפוקה שלך ומפחיתה עלויות ב-40%",
      badge: "מוכח",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      icon: Shield,
      title: "אבטחה ברמה בנקאית",
      description: "הנתונים שלך מוגנים עם הצפנה מתקדמת ותמיכה 24/7",
      badge: "בטוח",
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    },
    {
      icon: Zap,
      title: "עדכונים בזמן אמת",
      description: "קבל התראות מיידיות על בעיות, הזדמנויות ושינויים בשוק",
      badge: "מהיר",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200"
    },
    {
      icon: Users,
      title: "קהילה פעילה",
      description: "הצטרף לקהילה של חקלאים מובילים, שתף ניסיון ולמד מאחרים",
      badge: "קהילה",
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200"
    },
    {
      icon: BarChart3,
      title: "אנליטיקה מתקדמת",
      description: "דוחות מפורטים, גרפים אינטראקטיביים ותחזיות מדויקות",
      badge: "מקצועי",
      color: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200"
    },
    {
      icon: Smartphone,
      title: "אפליקציה ניידת",
      description: "נהל את החווה שלך מכל מקום עם אפליקציה מהירה ואינטואיטיבית",
      badge: "נייד",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200"
    },
    {
      icon: Cloud,
      title: "ענן מאובטח",
      description: "הנתונים שלך נשמרים בענן מאובטח עם גיבוי אוטומטי",
      badge: "אמין",
      color: "from-sky-500 to-blue-500",
      bgColor: "bg-sky-50",
      borderColor: "border-sky-200"
    },
    {
      icon: Lock,
      title: "פרטיות מוגנת",
      description: "הנתונים שלך נשארים פרטיים ולא נמכרים לצדדים שלישיים",
      badge: "פרטי",
      color: "from-gray-500 to-slate-500",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200"
    },
    {
      icon: MessageCircle,
      title: "תמיכה 24/7",
      description: "צוות מומחים זמין 24 שעות ביממה לעזרה וייעוץ",
      badge: "תמיכה",
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200"
    },
    {
      icon: BookOpen,
      title: "הדרכה מקצועית",
      description: "קורסים, מדריכים וסרטונים מקצועיים ממומחים מובילים",
      badge: "למידה",
      color: "from-amber-500 to-yellow-500",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200"
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-emerald-600 border-emerald-200 bg-emerald-50">
            🚀 תכונות מתקדמות
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            הכל שאתה צריך כדי להצליח
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            פלטפורמה מקיפה שמשלבת טכנולוגיה מתקדמת, קהילה פעילה ותמיכה מקצועית
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className={`group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${feature.bgColor} ${feature.borderColor} border-2`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs px-2 py-1 ${
                        feature.badge === "חדש!" ? "bg-purple-100 text-purple-700" :
                        feature.badge === "פופולרי" ? "bg-blue-100 text-blue-700" :
                        feature.badge === "מוכח" ? "bg-green-100 text-green-700" :
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              מוכן להתחיל את המסע שלך?
            </h3>
            <p className="text-emerald-100 mb-6">
              הצטרף לאלפי חקלאים שכבר משתמשים בפלטפורמה שלנו
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-colors">
                התחל עכשיו בחינם
              </button>
              <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-emerald-600 transition-colors">
                צור קשר
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
