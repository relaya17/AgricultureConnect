import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Egg, 
  Calendar,
  Target,
  Award,
  BarChart3,
  PieChart,
  Activity,
  Zap
} from 'lucide-react';

interface AnalyticsData {
  revenue: {
    current: number;
    previous: number;
    growth: number;
  };
  production: {
    eggs: number;
    chickens: number;
    efficiency: number;
  };
  costs: {
    feed: number;
    utilities: number;
    veterinary: number;
    total: number;
  };
  performance: {
    conversion: number;
    mortality: number;
    productivity: number;
  };
}

const AnalyticsDashboard: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    revenue: { current: 12500, previous: 10800, growth: 15.7 },
    production: { eggs: 2850, chickens: 120, efficiency: 94.2 },
    costs: { feed: 3200, utilities: 850, veterinary: 450, total: 4500 },
    performance: { conversion: 2.1, mortality: 1.8, productivity: 96.5 }
  });

  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month');

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAnalyticsData(prev => ({
        ...prev,
        production: {
          ...prev.production,
          eggs: prev.production.eggs + Math.floor(Math.random() * 3),
          efficiency: Math.min(100, prev.production.efficiency + (Math.random() - 0.5) * 0.1)
        }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS'
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('he-IL').format(num);
  };

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />;
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">דשבורד אנליטיקס</h1>
          <p className="text-gray-600 mt-1">מעקב מתקדם אחר ביצועי החווה שלך</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <Activity className="h-3 w-3 mr-1" />
            Live Data
          </Badge>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            {timeRange === 'week' ? 'שבוע' : 
             timeRange === 'month' ? 'חודש' : 
             timeRange === 'quarter' ? 'רבעון' : 'שנה'}
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">הכנסות</p>
                <p className="text-2xl font-bold text-green-900">{formatCurrency(analyticsData.revenue.current)}</p>
                <div className={`flex items-center mt-1 ${getGrowthColor(analyticsData.revenue.growth)}`}>
                  {getGrowthIcon(analyticsData.revenue.growth)}
                  <span className="text-sm ml-1">{analyticsData.revenue.growth}%</span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">ביצים החודש</p>
                <p className="text-2xl font-bold text-blue-900">{formatNumber(analyticsData.production.eggs)}</p>
                <div className="flex items-center mt-1 text-blue-600">
                  <Target className="h-4 w-4" />
                  <span className="text-sm ml-1">יעד: 3,000</span>
                </div>
              </div>
              <Egg className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">יעילות</p>
                <p className="text-2xl font-bold text-purple-900">{analyticsData.production.efficiency.toFixed(1)}%</p>
                <div className="mt-2">
                  <Progress value={analyticsData.production.efficiency} className="h-2" />
                </div>
              </div>
              <Zap className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-amber-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">תרנגולות</p>
                <p className="text-2xl font-bold text-orange-900">{analyticsData.production.chickens}</p>
                <div className="flex items-center mt-1 text-orange-600">
                  <Users className="h-4 w-4" />
                  <span className="text-sm ml-1">פעילות</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">סקירה כללית</TabsTrigger>
          <TabsTrigger value="production">ייצור</TabsTrigger>
          <TabsTrigger value="costs">עלויות</TabsTrigger>
          <TabsTrigger value="performance">ביצועים</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  מגמת הכנסות
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-green-100 to-emerald-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-green-600 mx-auto mb-2" />
                    <p className="text-green-700 font-medium">גרף הכנסות</p>
                    <p className="text-green-600 text-sm">עלייה של 15.7% החודש</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Production Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  התפלגות ייצור
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">ביצים גדולות</span>
                    <span className="text-sm text-gray-600">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">ביצים בינוניות</span>
                    <span className="text-sm text-gray-600">25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">ביצים קטנות</span>
                    <span className="text-sm text-gray-600">10%</span>
                  </div>
                  <Progress value={10} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="production" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>ייצור יומי</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">95</p>
                  <p className="text-sm text-gray-600">ביצים היום</p>
                  <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800">
                    +5% מהיום הקודם
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>יעילות האכלה</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">2.1</p>
                  <p className="text-sm text-gray-600">ק"ג מזון לביצה</p>
                  <Badge variant="secondary" className="mt-2 bg-blue-100 text-blue-800">
                    יעיל מהממוצע
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>איכות ביצים</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">A+</p>
                  <p className="text-sm text-gray-600">דירוג איכות</p>
                  <Badge variant="secondary" className="mt-2 bg-purple-100 text-purple-800">
                    <Award className="h-3 w-3 mr-1" />
                    מעולה
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="costs" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>פירוט עלויות</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">מזון</span>
                  <span className="font-bold">{formatCurrency(analyticsData.costs.feed)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">חשמל ומים</span>
                  <span className="font-bold">{formatCurrency(analyticsData.costs.utilities)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">וטרינר</span>
                  <span className="font-bold">{formatCurrency(analyticsData.costs.veterinary)}</span>
                </div>
                <hr />
                <div className="flex items-center justify-between">
                  <span className="font-bold">סה"כ</span>
                  <span className="font-bold text-lg">{formatCurrency(analyticsData.costs.total)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>רווחיות</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">{formatCurrency(analyticsData.revenue.current - analyticsData.costs.total)}</p>
                  <p className="text-sm text-gray-600">רווח נקי החודש</p>
                  <div className="mt-4">
                    <Progress value={((analyticsData.revenue.current - analyticsData.costs.total) / analyticsData.revenue.current) * 100} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">מרגין רווח: {(((analyticsData.revenue.current - analyticsData.costs.total) / analyticsData.revenue.current) * 100).toFixed(1)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>שיעור המרה</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">{analyticsData.performance.conversion}</p>
                  <p className="text-sm text-gray-600">ק"ג מזון לביצה</p>
                  <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800">
                    יעיל מהממוצע
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>שיעור תמותה</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-red-600">{analyticsData.performance.mortality}%</p>
                  <p className="text-sm text-gray-600">תמותה החודש</p>
                  <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800">
                    נמוך מהממוצע
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>פרודוקטיביות</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">{analyticsData.performance.productivity}%</p>
                  <p className="text-sm text-gray-600">יעילות כללית</p>
                  <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800">
                    <Award className="h-3 w-3 mr-1" />
                    מעולה
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
