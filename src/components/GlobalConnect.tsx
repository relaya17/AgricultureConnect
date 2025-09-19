import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const GlobalConnect = () => {
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const farmers = [
    {
      id: 1,
      name: "שמואל לוי",
      country: "israel",
      flag: "🇮🇱",
      farmType: "לולי תרנגולות",
      experience: "15 שנים",
      animals: "5,000 תרנגולות",
      status: "online",
      lastSeen: "עכשיו"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      country: "srilanka",
      flag: "🇱🇰",
      farmType: "Dairy Farm",
      experience: "12 years",
      animals: "150 cows",
      status: "offline",
      lastSeen: "2h ago"
    },
    {
      id: 3,
      name: "محمد أحمد",
      country: "other",
      flag: "🇪🇬",
      farmType: "مزرعة دواجن",
      experience: "8 سنوات",
      animals: "3,000 دجاجة",
      status: "online",
      lastSeen: "الآن"
    },
    {
      id: 4,
      name: "Priya Mendis",
      country: "srilanka",
      flag: "🇱🇰",
      farmType: "Mixed Farm",
      experience: "10 years",
      animals: "500 chickens, 50 goats",
      status: "online",
      lastSeen: "now"
    }
  ];

  const filteredFarmers = farmers.filter(farmer => {
    const matchesCountry = selectedCountry === "all" || farmer.country === selectedCountry;
    const matchesSearch = farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farmer.farmType.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCountry && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background p-4">
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">🌍 Global Connect</h1>
            <p className="text-muted-foreground">התחבר לחקלאים מרחבי העולם</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => window.parent.postMessage({type: 'navigate', view: 'dashboard'}, '*')}
          >
            ← חזור לדשבורד
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>סינון</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">חיפוש</label>
              <Input
                placeholder="חפש לפי שם או סוג חווה..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">מדינה</label>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">כל המדינות</SelectItem>
                  <SelectItem value="israel">🇮🇱 ישראל</SelectItem>
                  <SelectItem value="srilanka">🇱🇰 סרי לנקה</SelectItem>
                  <SelectItem value="other">מדינות אחרות</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4 border-t">
              <h3 className="font-medium mb-2">קבוצות פעילות</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-sm">
                  🐔 מגדלי לולים
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  🐄 מגדלי בקר
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  🌾 חקלאות אורגנית
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  💉 חיסונים וטיפולים
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Farmers List */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="farmers" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="farmers">חקלאים ({filteredFarmers.length})</TabsTrigger>
              <TabsTrigger value="chat">צ'אט פעיל</TabsTrigger>
              <TabsTrigger value="forums">פורומים</TabsTrigger>
            </TabsList>
            
            <TabsContent value="farmers" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredFarmers.map((farmer) => (
                  <Card key={farmer.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={`/api/placeholder/40/40`} />
                            <AvatarFallback>{farmer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{farmer.name}</CardTitle>
                            <CardDescription className="flex items-center gap-1">
                              {farmer.flag} {farmer.country === 'israel' ? 'ישראל' : farmer.country === 'srilanka' ? 'Sri Lanka' : 'Other'}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant={farmer.status === 'online' ? 'default' : 'secondary'}>
                          {farmer.status === 'online' ? 'מחובר' : 'לא מחובר'}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-3">
                      <div className="text-sm space-y-1">
                        <p><strong>סוג חווה:</strong> {farmer.farmType}</p>
                        <p><strong>ניסיון:</strong> {farmer.experience}</p>
                        <p><strong>בעלי חיים:</strong> {farmer.animals}</p>
                        <p className="text-muted-foreground">פעיל לאחרונה: {farmer.lastSeen}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">💬 שלח הודעה</Button>
                        <Button size="sm" variant="outline" className="flex-1">📞 שיחת וידאו</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="chat" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>צ'אט בזמן אמת</CardTitle>
                  <CardDescription>התחבר לחקלאים אחרים במיוחד עבורך</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 h-96 overflow-y-auto border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>ש</AvatarFallback>
                      </Avatar>
                      <div className="bg-primary/10 rounded-lg p-3 max-w-xs">
                        <p className="text-sm">היי, יש לי בעיה עם חיסון התרנגולות. מישהו יכול לעזור?</p>
                        <span className="text-xs text-muted-foreground">שמואל לוי - 10:30</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 justify-end">
                      <div className="bg-secondary/20 rounded-lg p-3 max-w-xs">
                        <p className="text-sm">I can help! What specific issue are you facing?</p>
                        <span className="text-xs text-muted-foreground">Rajesh - 10:32</span>
                      </div>
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>R</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Input placeholder="כתוב הודעה... (מתורגמת אוטומטית)" className="flex-1" />
                    <Button>שלח</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="forums" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">🐔 מגדלי לולים</CardTitle>
                    <CardDescription>142 חברים • 28 הודעות היום</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">דיונים על גידול תרנגולות, חיסונים, והזנה</p>
                    <Button className="w-full">הצטרף לקבוצה</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">🌾 חקלאות אורגנית</CardTitle>
                    <CardDescription>89 חברים • 15 הודעות היום</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">שיטות חקלאות ידידותיות לסביבה</p>
                    <Button className="w-full">הצטרף לקבוצה</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">💉 חיסונים וטיפולים</CardTitle>
                    <CardDescription>201 חברים • 45 הודעות היום</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">מדיניות חיסונים ומניעת מחלות</p>
                    <Button className="w-full">הצטרף לקבוצה</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">🇱🇰 Sri Lanka Farmers</CardTitle>
                    <CardDescription>67 members • 12 messages today</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">Local farming community in Sri Lanka</p>
                    <Button className="w-full">Join Group</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default GlobalConnect;