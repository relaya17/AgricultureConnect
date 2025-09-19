import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useTranslation } from "@/contexts/TranslationContext";
import { Search, Play, BookOpen, MessageCircle, Star, Clock, Users } from "lucide-react";

interface Article {
  id: string;
  title: string;
  category: string;
  language: string;
  readTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  views: number;
  content: string;
  tags: string[];
  author: string;
  publishDate: string;
}

interface Video {
  id: string;
  title: string;
  category: string;
  language: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  views: number;
  thumbnail: string;
  url: string;
  description: string;
  tags: string[];
  author: string;
  publishDate: string;
}

const Education = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const articles: Article[] = [
    {
      id: '1',
      title: 'טיפוח תרנגולות בחורף - מדריך מקיף',
      category: 'poultry',
      language: 'he',
      readTime: 8,
      difficulty: 'intermediate',
      rating: 4.8,
      views: 1250,
      content: 'מדריך מקיף לטיפוח תרנגולות בתנאי חורף קשים. כולל טיפים לחימום, תזונה, ומניעת מחלות...',
      tags: ['תרנגולות', 'חורף', 'טיפוח', 'בריאות'],
      author: 'ד"ר יוסי כהן',
      publishDate: '2024-01-15'
    },
    {
      id: '2',
      title: 'לוח חיסונים עדכני לתרנגולות',
      category: 'health',
      language: 'he',
      readTime: 5,
      difficulty: 'beginner',
      rating: 4.9,
      views: 2100,
      content: 'לוח חיסונים מפורט ומעודכן לשנת 2024. כולל זמנים, מינונים, והנחיות חשובות...',
      tags: ['חיסונים', 'תרנגולות', 'בריאות', 'מניעה'],
      author: 'ד"ר שרה לוי',
      publishDate: '2024-01-10'
    },
    {
      id: '3',
      title: 'בקרת טמפרטורה אופטימלית בלולים',
      category: 'environment',
      language: 'he',
      readTime: 6,
      difficulty: 'advanced',
      rating: 4.7,
      views: 980,
      content: 'הבנת חשיבות בקרת הטמפרטורה והשפעתה על בריאות ותפוקת התרנגולות...',
      tags: ['טמפרטורה', 'לולים', 'אופטימיזציה', 'תפוקה'],
      author: 'פרופ\' דוד ישראלי',
      publishDate: '2024-01-08'
    },
    {
      id: '4',
      title: 'Poultry Farming in Sri Lanka - Best Practices',
      category: 'poultry',
      language: 'en',
      readTime: 10,
      difficulty: 'intermediate',
      rating: 4.6,
      views: 750,
      content: 'Comprehensive guide to poultry farming practices suitable for Sri Lankan climate and conditions...',
      tags: ['poultry', 'sri lanka', 'farming', 'best practices'],
      author: 'Dr. Rajesh Kumar',
      publishDate: '2024-01-12'
    }
  ];

  const videos: Video[] = [
    {
      id: '1',
      title: 'איך לחסן תרנגולות - הדגמה מעשית',
      category: 'health',
      language: 'he',
      duration: 12,
      difficulty: 'beginner',
      rating: 4.9,
      views: 3200,
      thumbnail: '/api/placeholder/300/200',
      url: '#',
      description: 'הדגמה מעשית של תהליך החיסון הנכון לתרנגולות',
      tags: ['חיסון', 'תרנגולות', 'הדגמה', 'מעשי'],
      author: 'ד"ר יוסי כהן',
      publishDate: '2024-01-14'
    },
    {
      id: '2',
      title: 'ניהול תזונה נכונה לתרנגולות',
      category: 'nutrition',
      language: 'he',
      duration: 18,
      difficulty: 'intermediate',
      rating: 4.7,
      views: 1800,
      thumbnail: '/api/placeholder/300/200',
      url: '#',
      description: 'מדריך מקיף לתזונה נכונה ואיזון תזונתי',
      tags: ['תזונה', 'תרנגולות', 'איזון', 'בריאות'],
      author: 'ד"ר שרה לוי',
      publishDate: '2024-01-11'
    },
    {
      id: '3',
      title: 'Chicken Disease Prevention - Complete Guide',
      category: 'health',
      language: 'en',
      duration: 25,
      difficulty: 'advanced',
      rating: 4.8,
      views: 1200,
      thumbnail: '/api/placeholder/300/200',
      url: '#',
      description: 'Complete guide to preventing common chicken diseases',
      tags: ['diseases', 'prevention', 'chickens', 'health'],
      author: 'Dr. Rajesh Kumar',
      publishDate: '2024-01-09'
    }
  ];

  const categories = [
    { value: 'all', label: 'כל הקטגוריות' },
    { value: 'poultry', label: 'לולים ותרנגולות' },
    { value: 'health', label: 'בריאות וחיסונים' },
    { value: 'nutrition', label: 'תזונה' },
    { value: 'environment', label: 'סביבה וטמפרטורה' },
    { value: 'business', label: 'עסקים ושיווק' }
  ];

  const difficulties = [
    { value: 'all', label: 'כל הרמות' },
    { value: 'beginner', label: 'מתחילים' },
    { value: 'intermediate', label: 'בינוני' },
    { value: 'advanced', label: 'מתקדמים' }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'default';
      case 'intermediate': return 'secondary';
      case 'advanced': return 'destructive';
      default: return 'outline';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'מתחילים';
      case 'intermediate': return 'בינוני';
      case 'advanced': return 'מתקדמים';
      default: return difficulty;
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || article.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || video.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-background p-4">
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">📚 {t('education')}</h1>
            <p className="text-muted-foreground">מרכז הדרכה ולימוד לחקלאים</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => window.parent.postMessage({type: 'navigate', view: 'dashboard'}, '*')}
          >
            ← חזור לדשבורד
          </Button>
        </div>
      </header>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="חפש במאמרים, סרטונים ותוכן..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map((difficulty) => (
                  <SelectItem key={difficulty.value} value={difficulty.value}>
                    {difficulty.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="articles" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="articles">
            <BookOpen className="w-4 h-4 mr-2" />
            {t('articles')} ({filteredArticles.length})
          </TabsTrigger>
          <TabsTrigger value="videos">
            <Play className="w-4 h-4 mr-2" />
            {t('videos')} ({filteredVideos.length})
          </TabsTrigger>
          <TabsTrigger value="experts">
            <MessageCircle className="w-4 h-4 mr-2" />
            {t('askExpert')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedArticle(article)}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                    <Badge variant={getDifficultyColor(article.difficulty)}>
                      {getDifficultyText(article.difficulty)}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime} דקות
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {article.views.toLocaleString()}
                    </span>
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {article.content}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {article.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{article.author}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{article.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVideos.map((video) => (
              <Card key={video.id} className="hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button size="lg" variant="secondary">
                      <Play className="w-6 h-6" />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                    <Badge variant={getDifficultyColor(video.difficulty)}>
                      {getDifficultyText(video.difficulty)}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {video.views.toLocaleString()}
                    </span>
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {video.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {video.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{video.author}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{video.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="experts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>שאל מומחה</CardTitle>
              <CardDescription>
                שאל שאלות את המומחים שלנו וקבל תשובות מקצועיות
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">👨‍⚕️</span>
                    </div>
                    <h3 className="font-semibold mb-2">ד"ר יוסי כהן</h3>
                    <p className="text-sm text-muted-foreground mb-3">מומחה לרפואה וטרינרית</p>
                    <Button size="sm">שאל שאלה</Button>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">👩‍⚕️</span>
                    </div>
                    <h3 className="font-semibold mb-2">ד"ר שרה לוי</h3>
                    <p className="text-sm text-muted-foreground mb-3">מומחית לתזונה חקלאית</p>
                    <Button size="sm">שאל שאלה</Button>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">👨‍🌾</span>
                    </div>
                    <h3 className="font-semibold mb-2">פרופ' דוד ישראלי</h3>
                    <p className="text-sm text-muted-foreground mb-3">מומחה לחקלאות מתקדמת</p>
                    <Button size="sm">שאל שאלה</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Article Detail Dialog */}
      <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedArticle && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedArticle.title}</DialogTitle>
                <DialogDescription className="flex items-center gap-4">
                  <span>{selectedArticle.author}</span>
                  <span>•</span>
                  <span>{selectedArticle.readTime} דקות קריאה</span>
                  <span>•</span>
                  <span>{selectedArticle.publishDate}</span>
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {selectedArticle.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="prose max-w-none">
                  <p>{selectedArticle.content}</p>
                  {/* Here you would expand with full article content */}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Education;
