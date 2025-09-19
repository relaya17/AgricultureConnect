import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Target, 
  Play, 
  Pause, 
  Settings,
  Eye,
  MousePointer,
  CheckCircle,
  Activity
} from 'lucide-react';
import { abTestingService, ABTest } from '@/lib/abTesting';

const ABTestingDashboard: React.FC = () => {
  const [activeTests, setActiveTests] = useState<ABTest[]>([]);
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<any>({});

  useEffect(() => {
    loadActiveTests();
  }, []);

  const loadActiveTests = () => {
    const tests = abTestingService.getActiveTests();
    setActiveTests(tests);
    if (tests.length > 0 && !selectedTest) {
      setSelectedTest(tests[0].id);
    }
  };

  const loadTestResults = (testId: string) => {
    const results = abTestingService.getTestResults(testId);
    setTestResults(results);
  };

  useEffect(() => {
    if (selectedTest) {
      loadTestResults(selectedTest);
    }
  }, [selectedTest]);

  const getTestStatus = (test: ABTest) => {
    const now = new Date();
    if (now < test.startDate) return 'scheduled';
    if (now > test.endDate) return 'completed';
    return 'active';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'פעיל';
      case 'scheduled': return 'מתוכנן';
      case 'completed': return 'הושלם';
      default: return 'לא ידוע';
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('he-IL').format(num);
  };

  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`;
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-purple-50 to-indigo-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">A/B Testing Dashboard</h1>
          <p className="text-gray-600 mt-1">ניהול וניתוח מבחני A/B</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            <Activity className="h-3 w-3 mr-1" />
            {activeTests.length} מבחנים פעילים
          </Badge>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            הגדרות
          </Button>
        </div>
      </div>

      {/* Test Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">מבחנים פעילים</p>
                <p className="text-2xl font-bold text-blue-900">{activeTests.length}</p>
              </div>
              <Play className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">משתמשים במבחנים</p>
                <p className="text-2xl font-bold text-green-900">
                  {formatNumber(activeTests.reduce((sum, test) => {
                    const results = abTestingService.getTestResults(test.id);
                    return sum + Object.values(results.variants).reduce((variantSum: number, variant: any) => 
                      variantSum + variant.users, 0);
                  }, 0))}
                </p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">שיעור המרה ממוצע</p>
                <p className="text-2xl font-bold text-purple-900">
                  {formatPercentage(activeTests.reduce((sum, test) => {
                    const results = abTestingService.getTestResults(test.id);
                    const totalConversion = Object.values(results.variants).reduce((variantSum: number, variant: any) => 
                      variantSum + variant.conversionRate, 0);
                    return sum + (totalConversion / Object.keys(results.variants).length);
                  }, 0) / activeTests.length)}
                </p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-amber-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">אירועים היום</p>
                <p className="text-2xl font-bold text-orange-900">
                  {formatNumber(activeTests.reduce((sum, test) => {
                    const results = abTestingService.getTestResults(test.id);
                    return sum + Object.values(results.variants).reduce((variantSum: number, variant: any) => 
                      variantSum + Object.values(variant.events).reduce((eventSum: number, event: any) => 
                        eventSum + event, 0), 0);
                  }, 0))}
                </p>
              </div>
              <Activity className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tests List and Results */}
      <Tabs defaultValue="tests" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tests">מבחנים פעילים</TabsTrigger>
          <TabsTrigger value="results">תוצאות</TabsTrigger>
        </TabsList>

        <TabsContent value="tests" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tests List */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">מבחנים פעילים</h3>
              {activeTests.map((test) => {
                const status = getTestStatus(test);
                const results = abTestingService.getTestResults(test.id);
                const totalUsers = Object.values(results.variants).reduce((sum: number, variant: any) => 
                  sum + variant.users, 0);

                return (
                  <Card 
                    key={test.id} 
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedTest === test.id ? 'ring-2 ring-purple-500' : ''
                    }`}
                    onClick={() => setSelectedTest(test.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{test.name}</h4>
                          <p className="text-sm text-gray-600">{test.description}</p>
                        </div>
                        <Badge className={getStatusColor(status)}>
                          {getStatusText(status)}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">משתמשים</p>
                          <p className="font-semibold">{formatNumber(totalUsers)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">וריאנטים</p>
                          <p className="font-semibold">{test.variants.length}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>התקדמות</span>
                          <span>{Math.round(((new Date().getTime() - test.startDate.getTime()) / 
                            (test.endDate.getTime() - test.startDate.getTime())) * 100)}%</span>
                        </div>
                        <Progress 
                          value={((new Date().getTime() - test.startDate.getTime()) / 
                            (test.endDate.getTime() - test.startDate.getTime())) * 100} 
                          className="h-2" 
                        />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Test Details */}
            {selectedTest && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">פרטי המבחן</h3>
                {(() => {
                  const test = activeTests.find(t => t.id === selectedTest);
                  if (!test) return null;

                  return (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BarChart3 className="h-5 w-5" />
                          {test.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-2">{test.description}</p>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(getTestStatus(test))}>
                              {getStatusText(getTestStatus(test))}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {test.startDate.toLocaleDateString('he-IL')} - {test.endDate.toLocaleDateString('he-IL')}
                            </span>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">וריאנטים</h4>
                          <div className="space-y-2">
                            {test.variants.map((variant) => (
                              <div key={variant.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <div>
                                  <p className="font-medium">{variant.name}</p>
                                  <p className="text-sm text-gray-600">{variant.description}</p>
                                </div>
                                <Badge variant="secondary">{variant.weight}%</Badge>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">מטריקות</h4>
                          <div className="flex flex-wrap gap-2">
                            {test.metrics.map((metric) => (
                              <Badge key={metric} variant="outline">
                                {metric}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })()}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {selectedTest && (() => {
            const test = activeTests.find(t => t.id === selectedTest);
            if (!test) return null;

            const results = abTestingService.getTestResults(test.id);
            const variants = Object.entries(results.variants);

            return (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">תוצאות: {test.name}</h3>
                  <p className="text-gray-600">ניתוח ביצועי הוריאנטים</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {variants.map(([variantId, data]: [string, any]) => {
                    const variant = test.variants.find(v => v.id === variantId);
                    if (!variant) return null;

                    const totalEvents = Object.values(data.events).reduce((sum: number, event: any) => sum + event, 0);
                    const clickRate = data.events.view ? (data.events.click / data.events.view) * 100 : 0;

                    return (
                      <Card key={variantId} className="bg-gradient-to-br from-white to-gray-50">
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <span>{variant.name}</span>
                            <Badge variant="secondary">{variant.weight}%</Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="text-center">
                            <p className="text-3xl font-bold text-emerald-600">
                              {formatPercentage(data.conversionRate)}
                            </p>
                            <p className="text-sm text-gray-600">שיעור המרה</p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Eye className="h-4 w-4 text-blue-600" />
                                <span className="text-sm">צפיות</span>
                              </div>
                              <span className="font-semibold">{formatNumber(data.events.view || 0)}</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <MousePointer className="h-4 w-4 text-green-600" />
                                <span className="text-sm">קליקים</span>
                              </div>
                              <span className="font-semibold">{formatNumber(data.events.click || 0)}</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-purple-600" />
                                <span className="text-sm">המרות</span>
                              </div>
                              <span className="font-semibold">{formatNumber(data.events.conversion || 0)}</span>
                            </div>
                          </div>

                          <div className="pt-2 border-t">
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                              <span>שיעור קליק</span>
                              <span>{formatPercentage(clickRate)}</span>
                            </div>
                            <Progress value={clickRate} className="h-2" />
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ABTestingDashboard;
