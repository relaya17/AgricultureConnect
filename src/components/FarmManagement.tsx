import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useTranslation } from "@/contexts/TranslationContext";
import { Plus, Edit, Trash2, TrendingUp, Activity, AlertTriangle } from "lucide-react";

interface Farm {
  id: string;
  name: string;
  animalType: string;
  animalCount: number;
  healthStatus: 'healthy' | 'needsTreatment' | 'maintenance' | 'sick';
  lastVaccination: string;
  nextVaccination: string;
  dailyEggs: number;
  weeklyProduction: number;
  temperature: number;
  humidity: number;
}

const FarmManagement = () => {
  const { t } = useTranslation();
  const [farms, setFarms] = useState<Farm[]>([
    {
      id: '1',
      name: 'לול A - תרנגולות',
      animalType: 'chickens',
      animalCount: 500,
      healthStatus: 'healthy',
      lastVaccination: '2024-01-15',
      nextVaccination: '2024-02-15',
      dailyEggs: 450,
      weeklyProduction: 3150,
      temperature: 22,
      humidity: 65
    },
    {
      id: '2',
      name: 'לול B - תרנגולות',
      animalType: 'chickens',
      animalCount: 300,
      healthStatus: 'needsTreatment',
      lastVaccination: '2024-01-10',
      nextVaccination: '2024-02-10',
      dailyEggs: 280,
      weeklyProduction: 1960,
      temperature: 28,
      humidity: 70
    },
    {
      id: '3',
      name: 'לול C - תרנגולים',
      animalType: 'chickens',
      animalCount: 200,
      healthStatus: 'maintenance',
      lastVaccination: '2024-01-20',
      nextVaccination: '2024-02-20',
      dailyEggs: 0,
      weeklyProduction: 0,
      temperature: 24,
      humidity: 60
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newFarm, setNewFarm] = useState({
    name: '',
    animalType: '',
    animalCount: 0
  });

  const getHealthStatusColor = (status: Farm['healthStatus']) => {
    switch (status) {
      case 'healthy': return 'default';
      case 'needsTreatment': return 'destructive';
      case 'maintenance': return 'secondary';
      case 'sick': return 'destructive';
      default: return 'secondary';
    }
  };

  const getHealthStatusText = (status: Farm['healthStatus']) => {
    switch (status) {
      case 'healthy': return t('healthy');
      case 'needsTreatment': return t('needsTreatment');
      case 'maintenance': return t('maintenance');
      case 'sick': return t('sick');
      default: return status;
    }
  };

  const getAnimalTypeText = (type: string) => {
    switch (type) {
      case 'chickens': return t('chickens');
      case 'cows': return t('cows');
      case 'goats': return t('goats');
      case 'sheep': return t('sheep');
      case 'ducks': return t('ducks');
      default: return type;
    }
  };

  const handleAddFarm = () => {
    if (newFarm.name && newFarm.animalType && newFarm.animalCount > 0) {
      const farm: Farm = {
        id: Date.now().toString(),
        name: newFarm.name,
        animalType: newFarm.animalType,
        animalCount: newFarm.animalCount,
        healthStatus: 'healthy',
        lastVaccination: new Date().toISOString().split('T')[0],
        nextVaccination: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        dailyEggs: 0,
        weeklyProduction: 0,
        temperature: 22,
        humidity: 60
      };
      setFarms([...farms, farm]);
      setNewFarm({ name: '', animalType: '', animalCount: 0 });
      setIsAddDialogOpen(false);
    }
  };

  const totalAnimals = farms.reduce((sum, farm) => sum + farm.animalCount, 0);
  const totalDailyEggs = farms.reduce((sum, farm) => sum + farm.dailyEggs, 0);
  const totalWeeklyProduction = farms.reduce((sum, farm) => sum + farm.weeklyProduction, 0);
  const healthyFarms = farms.filter(farm => farm.healthStatus === 'healthy').length;

  return (
    <div className="min-h-screen bg-background p-4">
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">🏠 {t('farmManagement')}</h1>
            <p className="text-muted-foreground">{t('farmOverview')}</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                {t('addNewFarm')}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('addNewFarm')}</DialogTitle>
                <DialogDescription>
                  הוסף חווה חדשה למערכת הניהול
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="farm-name">{t('farmName')}</Label>
                  <Input
                    id="farm-name"
                    value={newFarm.name}
                    onChange={(e) => setNewFarm({ ...newFarm, name: e.target.value })}
                    placeholder="שם החווה"
                  />
                </div>
                <div>
                  <Label htmlFor="animal-type">{t('animalType')}</Label>
                  <Select value={newFarm.animalType} onValueChange={(value) => setNewFarm({ ...newFarm, animalType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="בחר סוג בעלי חיים" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chickens">{t('chickens')}</SelectItem>
                      <SelectItem value="cows">{t('cows')}</SelectItem>
                      <SelectItem value="goats">{t('goats')}</SelectItem>
                      <SelectItem value="sheep">{t('sheep')}</SelectItem>
                      <SelectItem value="ducks">{t('ducks')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="animal-count">{t('animalCount')}</Label>
                  <Input
                    id="animal-count"
                    type="number"
                    value={newFarm.animalCount}
                    onChange={(e) => setNewFarm({ ...newFarm, animalCount: parseInt(e.target.value) || 0 })}
                    placeholder="מספר בעלי חיים"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  {t('cancel')}
                </Button>
                <Button onClick={handleAddFarm}>
                  {t('add')}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">סה"כ חוות</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{farms.length}</div>
            <p className="text-xs text-muted-foreground">
              {healthyFarms} בריאות
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">סה"כ בעלי חיים</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAnimals.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% מהחודש שעבר
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ביצים יומיות</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDailyEggs.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {((totalDailyEggs / totalAnimals) * 100).toFixed(1)}% תפוקה
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">תפוקה שבועית</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWeeklyProduction.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +8% מהשבוע שעבר
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="farms" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="farms">חוות ({farms.length})</TabsTrigger>
          <TabsTrigger value="health">מעקב בריאות</TabsTrigger>
          <TabsTrigger value="production">{t('productionReport')}</TabsTrigger>
        </TabsList>

        <TabsContent value="farms" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {farms.map((farm) => (
              <Card key={farm.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{farm.name}</CardTitle>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    {getAnimalTypeText(farm.animalType)} • {farm.animalCount.toLocaleString()} בעלי חיים
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{t('healthStatus')}</span>
                    <Badge variant={getHealthStatusColor(farm.healthStatus)}>
                      {getHealthStatusText(farm.healthStatus)}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>טמפרטורה</span>
                      <span className={farm.temperature > 25 ? 'text-destructive' : 'text-primary'}>
                        {farm.temperature}°C
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>לחות</span>
                      <span>{farm.humidity}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>ביצים יומיות</span>
                      <span className="font-medium">{farm.dailyEggs}</span>
                    </div>
                  </div>

                  {farm.healthStatus === 'needsTreatment' && (
                    <div className="p-2 bg-destructive/10 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-destructive" />
                        <span className="text-sm text-destructive">דורש טיפול דחוף</span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">פרטים</Button>
                    <Button size="sm" variant="outline" className="flex-1">עדכן</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="health" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>לוח חיסונים</CardTitle>
                <CardDescription>מעקב אחר חיסונים ותזמון</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {farms.map((farm) => (
                  <div key={farm.id} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{farm.name}</span>
                      <Badge variant="outline">חיסון הבא: {farm.nextVaccination}</Badge>
                    </div>
                    <Progress value={75} className="w-full" />
                    <p className="text-sm text-muted-foreground mt-1">
                      חיסון אחרון: {farm.lastVaccination}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>מעקב בריאות</CardTitle>
                <CardDescription>סטטוס בריאות כללי</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>חוות בריאות</span>
                    <span className="text-primary font-medium">{healthyFarms}/{farms.length}</span>
                  </div>
                  <Progress value={(healthyFarms / farms.length) * 100} />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>דורש טיפול</span>
                      <span className="text-destructive">
                        {farms.filter(f => f.healthStatus === 'needsTreatment').length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>תחזוקה</span>
                      <span className="text-yellow-600">
                        {farms.filter(f => f.healthStatus === 'maintenance').length}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="production" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>תפוקה יומית</CardTitle>
                <CardDescription>ביצים שנאספו היום</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {farms.map((farm) => (
                    <div key={farm.id} className="space-y-2">
                      <div className="flex justify-between">
                        <span>{farm.name}</span>
                        <span className="font-medium">{farm.dailyEggs} ביצים</span>
                      </div>
                      <Progress value={(farm.dailyEggs / farm.animalCount) * 100} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>תפוקה שבועית</CardTitle>
                <CardDescription>סיכום שבועי</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{totalWeeklyProduction.toLocaleString()}</div>
                    <p className="text-muted-foreground">ביצים השבוע</p>
                  </div>
                  
                  <div className="space-y-2">
                    {farms.map((farm) => (
                      <div key={farm.id} className="flex justify-between text-sm">
                        <span>{farm.name}</span>
                        <span>{farm.weeklyProduction.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FarmManagement;
