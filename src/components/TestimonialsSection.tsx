import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "דני כהן",
      role: "מגדל לולים, מושב עין שמר",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "AgriConnect שינה את החיים שלי! התפוקה שלי עלתה ב-250% והעלויות ירדו ב-30%. הפלטפורמה הכי מתקדמת שראיתי!",
      rating: 5,
      country: "🇮🇱 ישראל",
      farmType: "לולי תרנגולות",
      improvement: "+250% תפוקה"
    },
    {
      name: "Rajesh Kumar",
      role: "Dairy Farmer, Colombo",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "The AI recommendations are incredible! My milk production increased by 40% and I saved 3 hours daily on farm management. Best investment ever!",
      rating: 5,
      country: "🇱🇰 Sri Lanka",
      farmType: "Dairy Farm",
      improvement: "+40% חלב"
    },
    {
      name: "שרה לוי",
      role: "מגדלת ירקות אורגניים, הגליל",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: "הקהילה הגלובלית עזרה לי ללמוד טכניקות חדשות מחקלאים מכל העולם. המכירות שלי עלו ב-180%!",
      rating: 5,
      country: "🇮🇱 ישראל",
      farmType: "ירקות אורגניים",
      improvement: "+180% מכירות"
    },
    {
      name: "Mohammed Ahmed",
      role: "Poultry Expert, Cairo",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      content: "The real-time monitoring saved my entire flock during a disease outbreak. The early warning system is a game-changer!",
      rating: 5,
      country: "🇪🇬 Egypt",
      farmType: "Poultry Farm",
      improvement: "100% הצלה"
    },
    {
      name: "פרופ' דוד ישראלי",
      role: "חוקר חקלאות, האוניברסיטה העברית",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      content: "כחוקר, אני מתרשם מהטכנולוגיה המתקדמת. הפלטפורמה מביאה את העתיד לחקלאות הישראלית!",
      rating: 5,
      country: "🇮🇱 ישראל",
      farmType: "מחקר חקלאי",
      improvement: "חדשנות"
    },
    {
      name: "Priya Mendis",
      role: "Mixed Farm Owner, Kandy",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "The education section helped me learn modern farming techniques. My farm is now 100% sustainable and profitable!",
      rating: 5,
      country: "🇱🇰 Sri Lanka",
      farmType: "חווה מעורבת",
      improvement: "100% בר-קיימא"
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-emerald-600 border-emerald-200 bg-emerald-50">
            ⭐ המלצות לקוחות
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            מה אומרים הלקוחות שלנו
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            הצטרף לאלפי חקלאים שכבר חווים את ההצלחה עם AgriConnect
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-600 mb-2">4.9/5</div>
            <div className="text-gray-600">דירוג ממוצע</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-600 mb-2">50,000+</div>
            <div className="text-gray-600">לקוחות מרוצים</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-600 mb-2">98%</div>
            <div className="text-gray-600">שיעור הצלחה</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-600 mb-2">24/7</div>
            <div className="text-gray-600">תמיכה זמינה</div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white border-0 shadow-lg"
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center text-white">
                    <Quote className="w-6 h-6" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 text-center mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center justify-center mb-4">
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {testimonial.country}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {testimonial.farmType}
                  </Badge>
                  <Badge className="text-xs bg-emerald-100 text-emerald-700 border-emerald-200">
                    {testimonial.improvement}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              מוכן להצטרף לסיפורי ההצלחה?
            </h3>
            <p className="text-gray-600 mb-6">
              התחל את המסע שלך היום וצור את סיפור ההצלחה שלך
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-green-700 transition-all transform hover:scale-105">
                התחל עכשיו בחינם
              </button>
              <button className="px-8 py-3 border-2 border-emerald-300 text-emerald-700 font-semibold rounded-lg hover:bg-emerald-50 transition-colors">
                צפה בסיפורי הצלחה נוספים
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
