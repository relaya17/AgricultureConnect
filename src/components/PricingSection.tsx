import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown, Users } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "מתחיל",
      description: "מושלם לחקלאים קטנים",
      price: "0",
      period: "לחודש",
      icon: Users,
      color: "from-gray-500 to-slate-500",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      features: [
        "עד 100 בעלי חיים",
        "דשבורד בסיסי",
        "תמיכה בדוא\"ל",
        "דוחות חודשיים",
        "קהילה גלובלית"
      ],
      limitations: [
        "ללא בינה מלאכותית",
        "ללא התראות בזמן אמת"
      ],
      popular: false
    },
    {
      name: "מקצועי",
      description: "הכי פופולרי לחקלאים פעילים",
      price: "99",
      period: "לחודש",
      icon: Zap,
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      features: [
        "עד 1,000 בעלי חיים",
        "בינה מלאכותית מתקדמת",
        "התראות בזמן אמת",
        "דוחות מפורטים",
        "תמיכה 24/7",
        "אנליטיקה מתקדמת",
        "אינטגרציה עם חיישנים",
        "גיבוי אוטומטי"
      ],
      limitations: [],
      popular: true
    },
    {
      name: "ארגוני",
      description: "לחוות גדולות וארגונים",
      price: "299",
      period: "לחודש",
      icon: Crown,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      features: [
        "בעלי חיים ללא הגבלה",
        "בינה מלאכותית מתקדמת",
        "התראות בזמן אמת",
        "דוחות מותאמים אישית",
        "תמיכה ייעודית",
        "אנליטיקה מתקדמת",
        "אינטגרציה מלאה",
        "גיבוי אוטומטי",
        "ניהול צוות",
        "API מותאם",
        "הדרכה אישית",
        "SLA מובטח"
      ],
      limitations: [],
      popular: false
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-emerald-600 border-emerald-200 bg-emerald-50">
            💰 תמחור שקוף
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            בחר את התוכנית המתאימה לך
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ללא עלויות נסתרות, ללא התחייבות. ביטול בכל עת
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <Card 
                key={index}
                className={`relative transition-all duration-500 transform hover:-translate-y-2 ${
                  plan.popular 
                    ? 'scale-105 shadow-2xl shadow-emerald-500/20 border-2 border-emerald-300' 
                    : 'hover:shadow-xl'
                } ${plan.bgColor} ${plan.borderColor} border-2`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white">
                      <Star className="w-4 h-4 mr-1" />
                      הכי פופולרי
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${plan.color} flex items-center justify-center text-white shadow-lg`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                  
                  <div className="mt-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-gray-900">₪{plan.price}</span>
                      <span className="text-gray-600 ml-2">/{plan.period}</span>
                    </div>
                    {plan.price !== "0" && (
                      <p className="text-sm text-gray-500 mt-2">₪{parseInt(plan.price) * 12} לשנה</p>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <Button 
                    className={`w-full mb-6 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white' 
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                    size="lg"
                  >
                    {plan.price === "0" ? "התחל בחינם" : "התחל עכשיו"}
                  </Button>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 mb-3">כולל:</h4>
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                    
                    {plan.limitations.length > 0 && (
                      <>
                        <h4 className="font-semibold text-gray-500 mb-3 mt-6">לא כולל:</h4>
                        {plan.limitations.map((limitation, limitationIndex) => (
                          <div key={limitationIndex} className="flex items-center">
                            <div className="w-5 h-5 mr-3 flex-shrink-0 flex items-center justify-center">
                              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            </div>
                            <span className="text-gray-500">{limitation}</span>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              לא בטוח איזו תוכנית מתאימה לך?
            </h3>
            <p className="text-emerald-100 mb-6">
              צור קשר עם המומחים שלנו ונעזור לך לבחור את התוכנית המושלמת
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-colors">
                צור קשר עם מומחה
              </button>
              <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-emerald-600 transition-colors">
                צפה בדמו חינם
              </button>
            </div>
          </div>
        </div>

        {/* Guarantee */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center bg-green-50 text-green-800 px-6 py-3 rounded-full border border-green-200">
            <Check className="w-5 h-5 mr-2" />
            <span className="font-semibold">ערבות 30 יום להחזר כספי מלא</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
