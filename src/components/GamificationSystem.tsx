import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Star, 
  Target, 
  Award, 
  Zap, 
  Crown,
  Medal,
  Flame,
  TrendingUp,
  Gift,
  CheckCircle,
  Clock
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  points: number;
  category: 'production' | 'efficiency' | 'social' | 'learning' | 'streak';
  unlocked: boolean;
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
}

interface UserStats {
  level: number;
  experience: number;
  experienceToNext: number;
  totalPoints: number;
  streak: number;
  achievements: Achievement[];
  badges: string[];
  rank: string;
}

const GamificationSystem: React.FC = () => {
  const [userStats, setUserStats] = useState<UserStats>({
    level: 12,
    experience: 2450,
    experienceToNext: 3000,
    totalPoints: 15800,
    streak: 15,
    achievements: [
      {
        id: '1',
        title: 'מאסטר ביצים',
        description: 'ייצר 1000 ביצים בחודש',
        icon: <Trophy className="h-6 w-6" />,
        points: 500,
        category: 'production',
        unlocked: true,
        unlockedAt: new Date('2024-01-15'),
        progress: 1000,
        maxProgress: 1000
      },
      {
        id: '2',
        title: 'יעילות מושלמת',
        description: 'השג יעילות של 95% ומעלה',
        icon: <Zap className="h-6 w-6" />,
        points: 300,
        category: 'efficiency',
        unlocked: true,
        unlockedAt: new Date('2024-01-20'),
        progress: 96,
        maxProgress: 95
      },
      {
        id: '3',
        title: 'סטריק זהב',
        description: 'התחבר 30 ימים ברציפות',
        icon: <Flame className="h-6 w-6" />,
        points: 1000,
        category: 'streak',
        unlocked: false,
        progress: 15,
        maxProgress: 30
      },
      {
        id: '4',
        title: 'חברותי',
        description: 'שתף 10 טיפים עם הקהילה',
        icon: <Star className="h-6 w-6" />,
        points: 200,
        category: 'social',
        unlocked: false,
        progress: 7,
        maxProgress: 10
      },
      {
        id: '5',
        title: 'חכם',
        description: 'השלם 5 קורסים',
        icon: <Award className="h-6 w-6" />,
        points: 400,
        category: 'learning',
        unlocked: false,
        progress: 3,
        maxProgress: 5
      }
    ],
    badges: ['מתחיל', 'פעיל', 'מומחה', 'מאסטר'],
    rank: 'מאסטר'
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'הכל', icon: <Target className="h-4 w-4" /> },
    { id: 'production', name: 'ייצור', icon: <Trophy className="h-4 w-4" /> },
    { id: 'efficiency', name: 'יעילות', icon: <Zap className="h-4 w-4" /> },
    { id: 'social', name: 'חברתי', icon: <Star className="h-4 w-4" /> },
    { id: 'learning', name: 'למידה', icon: <Award className="h-4 w-4" /> },
    { id: 'streak', name: 'רצף', icon: <Flame className="h-4 w-4" /> }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'production': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'efficiency': return 'bg-green-100 text-green-800 border-green-200';
      case 'social': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'learning': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'streak': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRankIcon = (rank: string) => {
    switch (rank) {
      case 'מתחיל': return <Medal className="h-5 w-5 text-bronze-500" />;
      case 'פעיל': return <Star className="h-5 w-5 text-silver-500" />;
      case 'מומחה': return <Award className="h-5 w-5 text-gold-500" />;
      case 'מאסטר': return <Crown className="h-5 w-5 text-purple-500" />;
      default: return <Medal className="h-5 w-5 text-gray-500" />;
    }
  };

  const filteredAchievements = selectedCategory === 'all' 
    ? userStats.achievements 
    : userStats.achievements.filter(achievement => achievement.category === selectedCategory);

  const unlockedCount = userStats.achievements.filter(a => a.unlocked).length;
  const totalCount = userStats.achievements.length;
  const experiencePercentage = (userStats.experience / userStats.experienceToNext) * 100;

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">מערכת גיימיפיקציה</h1>
        <p className="text-gray-600">השג הישגים, צבור נקודות והפוך לחקלאי הטוב ביותר!</p>
      </div>

      {/* User Profile Card */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                {getRankIcon(userStats.rank)}
              </div>
              <div>
                <h2 className="text-2xl font-bold">רמה {userStats.level}</h2>
                <p className="text-white/80">{userStats.rank}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Flame className="h-4 w-4 text-orange-300" />
                  <span className="text-sm">רצף של {userStats.streak} ימים</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{userStats.totalPoints.toLocaleString()}</p>
              <p className="text-white/80">נקודות סה"כ</p>
            </div>
          </div>
          
          {/* Experience Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>ניסיון</span>
              <span>{userStats.experience} / {userStats.experienceToNext}</span>
            </div>
            <Progress value={experiencePercentage} className="h-3 bg-white/20" />
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-100 border-yellow-200">
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-yellow-800">{unlockedCount}</p>
            <p className="text-sm text-yellow-600">הישגים נפתחו</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-800">{userStats.level}</p>
            <p className="text-sm text-green-600">רמה נוכחית</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <Flame className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-800">{userStats.streak}</p>
            <p className="text-sm text-blue-600">ימי רצף</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200">
          <CardContent className="p-4 text-center">
            <Gift className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-800">{userStats.badges.length}</p>
            <p className="text-sm text-purple-600">תגים</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center gap-2"
          >
            {category.icon}
            {category.name}
          </Button>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((achievement) => (
          <Card 
            key={achievement.id} 
            className={`transition-all duration-300 hover:shadow-lg ${
              achievement.unlocked 
                ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-200' 
                : 'bg-gradient-to-br from-gray-50 to-slate-100 border-gray-200'
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full ${
                  achievement.unlocked 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className={`font-bold ${
                      achievement.unlocked ? 'text-green-800' : 'text-gray-600'
                    }`}>
                      {achievement.title}
                    </h3>
                    {achievement.unlocked && (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                  <p className={`text-sm mb-3 ${
                    achievement.unlocked ? 'text-green-700' : 'text-gray-500'
                  }`}>
                    {achievement.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getCategoryColor(achievement.category)}>
                      {categories.find(c => c.id === achievement.category)?.name}
                    </Badge>
                    <span className={`text-sm font-medium ${
                      achievement.unlocked ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {achievement.points} נקודות
                    </span>
                  </div>

                  {achievement.progress !== undefined && achievement.maxProgress && (
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>התקדמות</span>
                        <span>{achievement.progress} / {achievement.maxProgress}</span>
                      </div>
                      <Progress 
                        value={(achievement.progress / achievement.maxProgress) * 100} 
                        className="h-2"
                      />
                    </div>
                  )}

                  {achievement.unlocked && achievement.unlockedAt && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                      <Clock className="h-3 w-3" />
                      <span>נפתח ב-{achievement.unlockedAt.toLocaleDateString('he-IL')}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Daily Challenges */}
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            אתגרים יומיים
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="font-bold mb-2">התחבר היום</h4>
              <p className="text-sm text-white/80 mb-2">קבל 50 נקודות</p>
              <Button size="sm" className="bg-white/20 hover:bg-white/30">
                התחבר
              </Button>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="font-bold mb-2">שתף טיפ</h4>
              <p className="text-sm text-white/80 mb-2">קבל 100 נקודות</p>
              <Button size="sm" className="bg-white/20 hover:bg-white/30">
                שתף
              </Button>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="font-bold mb-2">השלם קורס</h4>
              <p className="text-sm text-white/80 mb-2">קבל 200 נקודות</p>
              <Button size="sm" className="bg-white/20 hover:bg-white/30">
                התחל
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GamificationSystem;
