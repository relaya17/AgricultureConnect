import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background p-4">
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">🌾 AgriConnect</h1>
            <p className="text-muted-foreground">ברוך הבא, דני כהן</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">⚙️ הגדרות</Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.parent.postMessage({type: 'navigate', view: 'notifications'}, '*')}
            >
              🔔 התראות
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.parent.postMessage({type: 'navigate', view: 'chat'}, '*')}
            >
              💬 צ'אט
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.parent.postMessage({type: 'navigate', view: 'global'}, '*')}
            >
              🌐 Global Connect
            </Button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Farm Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🏠 סקירת חווה
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>לול A - תרנגולות</span>
              <Badge variant="default">בריא</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>לול B - תרנגולות</span>
              <Badge variant="destructive">דורש טיפול</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>לול C - תרנגולים</span>
              <Badge variant="secondary">תחזוקה</Badge>
            </div>
            <Button 
              className="w-full mt-4"
              onClick={() => window.parent.postMessage({type: 'navigate', view: 'farm'}, '*')}
            >
              ניהול לולים
            </Button>
          </CardContent>
        </Card>

        {/* Daily Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ✅ משימות יומיות
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>השקיה</span>
                <span className="text-primary">✓</span>
              </div>
              <div className="flex justify-between">
                <span>האכלה</span>
                <span className="text-primary">✓</span>
              </div>
              <div className="flex justify-between">
                <span>ניקוי לולים</span>
                <span className="text-muted-foreground">⏳</span>
              </div>
              <div className="flex justify-between">
                <span>בדיקת בריאות</span>
                <span className="text-muted-foreground">⏳</span>
              </div>
            </div>
            <Progress value={50} className="w-full" />
            <p className="text-sm text-muted-foreground">2 מתוך 4 משימות הושלמו</p>
          </CardContent>
        </Card>

        {/* Global Connect Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🌍 Global Connect
            </CardTitle>
            <CardDescription>התחבר לחקלאים מרחבי העולם</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm">
                  ש
                </div>
                <div>
                  <p className="text-sm font-medium">שמואל לוי</p>
                  <p className="text-xs text-muted-foreground">ישראל - לולי תרנגולות</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground text-sm">
                  R
                </div>
                <div>
                  <p className="text-sm font-medium">Rajesh Kumar</p>
                  <p className="text-xs text-muted-foreground">Sri Lanka - Dairy Farm</p>
                </div>
              </div>
            </div>
            <Button className="w-full" variant="outline">גלה עוד חקלאים</Button>
          </CardContent>
        </Card>

        {/* Production Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📊 נתוני תפוקה
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>ביצים השבוע</span>
                  <span className="font-bold">2,340</span>
                </div>
                <Progress value={85} />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>יעד חודשי</span>
                  <span className="font-bold">78%</span>
                </div>
                <Progress value={78} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🚨 התראות
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="p-2 bg-destructive/10 rounded-lg">
              <p className="text-sm font-medium text-destructive">טמפרטורה גבוהה בלול B</p>
              <p className="text-xs text-muted-foreground">לפני 15 דקות</p>
            </div>
            <div className="p-2 bg-accent/10 rounded-lg">
              <p className="text-sm font-medium">זמן חיסון מתקרב</p>
              <p className="text-xs text-muted-foreground">מחר</p>
            </div>
          </CardContent>
        </Card>

        {/* Learning Center */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📚 מרכז הדרכה
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              🐔 טיפוח תרנגולות בחורף
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              💉 לוח חיסונים עדכני
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              🌡️ בקרת טמפרטורה אופטימלית
            </Button>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => window.parent.postMessage({type: 'navigate', view: 'education'}, '*')}
            >
              צפה בכל המאמרים
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;