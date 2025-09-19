import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/contexts/TranslationContext";
import { Bell, AlertTriangle, CheckCircle, Clock, Settings, Volume2, VolumeX } from "lucide-react";

interface Notification {
  id: string;
  type: 'urgent' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  category: 'health' | 'feeding' | 'vaccination' | 'temperature' | 'maintenance' | 'system';
  priority: 'high' | 'medium' | 'low';
  farmId?: string;
  farmName?: string;
}

const Notifications = () => {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'urgent',
      title: 'טמפרטורה גבוהה בלול B',
      message: 'הטמפרטורה בלול B עלתה ל-28°C. יש לבדוק את מערכת האוורור.',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      isRead: false,
      category: 'temperature',
      priority: 'high',
      farmId: '2',
      farmName: 'לול B - תרנגולות'
    },
    {
      id: '2',
      type: 'warning',
      title: 'זמן חיסון מתקרב',
      message: 'חיסון התרנגולות בלול A מתוכנן למחר. יש להכין את החיסון.',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      isRead: false,
      category: 'vaccination',
      priority: 'medium',
      farmId: '1',
      farmName: 'לול A - תרנגולות'
    },
    {
      id: '3',
      type: 'info',
      title: 'זמן האכלה',
      message: 'הגיע הזמן להאכיל את התרנגולות בכל הלולים.',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      isRead: true,
      category: 'feeding',
      priority: 'medium'
    },
    {
      id: '4',
      type: 'success',
      title: 'חיסון הושלם בהצלחה',
      message: 'חיסון התרנגולות בלול C הושלם בהצלחה. כל התרנגולות בריאות.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      isRead: true,
      category: 'vaccination',
      priority: 'low',
      farmId: '3',
      farmName: 'לול C - תרנגולים'
    },
    {
      id: '5',
      type: 'warning',
      title: 'תחזוקה נדרשת',
      message: 'יש לבצע תחזוקה שבועית של מערכת האוורור בלול A.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      isRead: false,
      category: 'maintenance',
      priority: 'medium',
      farmId: '1',
      farmName: 'לול A - תרנגולות'
    }
  ]);

  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    soundEnabled: true,
    urgentOnly: false,
    feedingReminders: true,
    vaccinationAlerts: true,
    temperatureAlerts: true,
    maintenanceReminders: true
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const urgentCount = notifications.filter(n => n.type === 'urgent' && !n.isRead).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'urgent': return <AlertTriangle className="w-5 h-5 text-destructive" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'info': return <Bell className="w-5 h-5 text-blue-600" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'urgent': return 'border-destructive bg-destructive/5';
      case 'warning': return 'border-yellow-500 bg-yellow-50';
      case 'info': return 'border-blue-500 bg-blue-50';
      case 'success': return 'border-green-500 bg-green-50';
      default: return 'border-border bg-background';
    }
  };

  const getCategoryText = (category: Notification['category']) => {
    switch (category) {
      case 'health': return 'בריאות';
      case 'feeding': return 'האכלה';
      case 'vaccination': return 'חיסונים';
      case 'temperature': return 'טמפרטורה';
      case 'maintenance': return 'תחזוקה';
      case 'system': return 'מערכת';
      default: return category;
    }
  };

  const formatTime = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'עכשיו';
    if (minutes < 60) return `לפני ${minutes} דקות`;
    if (hours < 24) return `לפני ${hours} שעות`;
    return `לפני ${days} ימים`;
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (settings.urgentOnly) {
      return notification.type === 'urgent';
    }
    return true;
  });

  const urgentNotifications = filteredNotifications.filter(n => n.type === 'urgent');
  const warningNotifications = filteredNotifications.filter(n => n.type === 'warning');
  const infoNotifications = filteredNotifications.filter(n => n.type === 'info');
  const successNotifications = filteredNotifications.filter(n => n.type === 'success');

  return (
    <div className="min-h-screen bg-background p-4">
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">🔔 {t('notifications')}</h1>
            <p className="text-muted-foreground">
              {unreadCount} הודעות לא נקראו • {urgentCount} דחופות
            </p>
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead}>
                סמן הכל כנקרא
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={() => window.parent.postMessage({type: 'navigate', view: 'dashboard'}, '*')}
            >
              ← חזור לדשבורד
            </Button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              הגדרות התראות
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="push">התראות Push</Label>
                <Switch
                  id="push"
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, pushNotifications: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="email">התראות אימייל</Label>
                <Switch
                  id="email"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, emailNotifications: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="sound">צלילים</Label>
                <Switch
                  id="sound"
                  checked={settings.soundEnabled}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, soundEnabled: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="urgent">רק דחופות</Label>
                <Switch
                  id="urgent"
                  checked={settings.urgentOnly}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, urgentOnly: checked }))
                  }
                />
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="font-medium mb-3">סוגי התראות</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="feeding">תזכורות האכלה</Label>
                  <Switch
                    id="feeding"
                    checked={settings.feedingReminders}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, feedingReminders: checked }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="vaccination">התראות חיסונים</Label>
                  <Switch
                    id="vaccination"
                    checked={settings.vaccinationAlerts}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, vaccinationAlerts: checked }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="temperature">התראות טמפרטורה</Label>
                  <Switch
                    id="temperature"
                    checked={settings.temperatureAlerts}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, temperatureAlerts: checked }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="maintenance">תזכורות תחזוקה</Label>
                  <Switch
                    id="maintenance"
                    checked={settings.maintenanceReminders}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, maintenanceReminders: checked }))
                    }
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">
                הכל ({filteredNotifications.length})
              </TabsTrigger>
              <TabsTrigger value="urgent">
                דחוף ({urgentNotifications.length})
              </TabsTrigger>
              <TabsTrigger value="warning">
                אזהרה ({warningNotifications.length})
              </TabsTrigger>
              <TabsTrigger value="info">
                מידע ({infoNotifications.length})
              </TabsTrigger>
              <TabsTrigger value="success">
                הצלחה ({successNotifications.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {filteredNotifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    !notification.isRead ? 'ring-2 ring-primary/20' : ''
                  } ${getNotificationColor(notification.type)}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-sm">{notification.title}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {getCategoryText(notification.category)}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatTime(notification.timestamp)}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        {notification.farmName && (
                          <p className="text-xs text-muted-foreground">
                            חווה: {notification.farmName}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-1">
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                        >
                          ×
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="urgent" className="space-y-4">
              {urgentNotifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className="border-destructive bg-destructive/5 cursor-pointer hover:shadow-md"
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-destructive" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm mb-1">{notification.title}</h3>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatTime(notification.timestamp)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="warning" className="space-y-4">
              {warningNotifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className="border-yellow-500 bg-yellow-50 cursor-pointer hover:shadow-md"
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm mb-1">{notification.title}</h3>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatTime(notification.timestamp)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="info" className="space-y-4">
              {infoNotifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className="border-blue-500 bg-blue-50 cursor-pointer hover:shadow-md"
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Bell className="w-5 h-5 text-blue-600" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm mb-1">{notification.title}</h3>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatTime(notification.timestamp)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="success" className="space-y-4">
              {successNotifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className="border-green-500 bg-green-50 cursor-pointer hover:shadow-md"
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm mb-1">{notification.title}</h3>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatTime(notification.timestamp)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
