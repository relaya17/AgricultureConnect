import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "@/contexts/TranslationContext";
import { Send, Phone, Video, MoreVertical, Globe, MessageCircle } from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  originalLanguage: string;
  translatedContent?: string;
  translatedLanguage?: string;
  timestamp: Date;
  type: 'text' | 'image' | 'video';
  isTranslated?: boolean;
}

interface Chat {
  id: string;
  name: string;
  type: 'direct' | 'group';
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  isOnline: boolean;
}

const ChatSystem = () => {
  const { t, language } = useTranslation();
  const [activeChat, setActiveChat] = useState<string>('1');
  const [message, setMessage] = useState('');
  const [autoTranslate, setAutoTranslate] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chats: Chat[] = [
    {
      id: '1',
      name: 'שמואל לוי',
      type: 'direct',
      participants: ['user1', 'user2'],
      lastMessage: {
        id: '1',
        senderId: 'user2',
        senderName: 'שמואל לוי',
        content: 'היי, יש לי בעיה עם חיסון התרנגולות. מישהו יכול לעזור?',
        originalLanguage: 'he',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        type: 'text'
      },
      unreadCount: 2,
      isOnline: true
    },
    {
      id: '2',
      name: 'Rajesh Kumar',
      type: 'direct',
      participants: ['user1', 'user3'],
      lastMessage: {
        id: '2',
        senderId: 'user3',
        senderName: 'Rajesh Kumar',
        content: 'I can help! What specific issue are you facing?',
        originalLanguage: 'en',
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        type: 'text'
      },
      unreadCount: 0,
      isOnline: true
    },
    {
      id: '3',
      name: 'מגדלי לולים',
      type: 'group',
      participants: ['user1', 'user2', 'user3', 'user4'],
      lastMessage: {
        id: '3',
        senderId: 'user4',
        senderName: 'פרופ\' דוד',
        content: 'הטמפרטורה האופטימלית לתרנגולות היא 18-22 מעלות',
        originalLanguage: 'he',
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        type: 'text'
      },
      unreadCount: 5,
      isOnline: false
    }
  ];

  const messages: Record<string, Message[]> = {
    '1': [
      {
        id: '1',
        senderId: 'user2',
        senderName: 'שמואל לוי',
        content: 'היי, יש לי בעיה עם חיסון התרנגולות. מישהו יכול לעזור?',
        originalLanguage: 'he',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        type: 'text'
      },
      {
        id: '2',
        senderId: 'user1',
        senderName: 'אתה',
        content: 'כמובן! איזה סוג בעיה?',
        originalLanguage: 'he',
        timestamp: new Date(Date.now() - 1000 * 60 * 25),
        type: 'text'
      },
      {
        id: '3',
        senderId: 'user2',
        senderName: 'שמואל לוי',
        content: 'התרנגולות שלי לא אוכלות אחרי החיסון. זה נורמלי?',
        originalLanguage: 'he',
        timestamp: new Date(Date.now() - 1000 * 60 * 20),
        type: 'text'
      },
      {
        id: '4',
        senderId: 'user1',
        senderName: 'אתה',
        content: 'כן, זה נורמלי ל-24-48 שעות. תן להן מים נקיים ותצפה',
        originalLanguage: 'he',
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        type: 'text'
      }
    ],
    '2': [
      {
        id: '1',
        senderId: 'user3',
        senderName: 'Rajesh Kumar',
        content: 'Hello! I saw your question about chicken vaccination. I can help!',
        originalLanguage: 'en',
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
        type: 'text'
      },
      {
        id: '2',
        senderId: 'user1',
        senderName: 'אתה',
        content: 'Thank you! What specific issue are you facing?',
        originalLanguage: 'en',
        timestamp: new Date(Date.now() - 1000 * 60 * 40),
        type: 'text'
      },
      {
        id: '3',
        senderId: 'user3',
        senderName: 'Rajesh Kumar',
        content: 'My chickens are not eating after vaccination. Is this normal?',
        originalLanguage: 'en',
        timestamp: new Date(Date.now() - 1000 * 60 * 35),
        type: 'text'
      },
      {
        id: '4',
        senderId: 'user1',
        senderName: 'אתה',
        content: 'Yes, this is normal for 24-48 hours. Provide clean water and monitor them.',
        originalLanguage: 'en',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        type: 'text'
      }
    ],
    '3': [
      {
        id: '1',
        senderId: 'user4',
        senderName: 'פרופ\' דוד',
        content: 'הטמפרטורה האופטימלית לתרנגולות היא 18-22 מעלות',
        originalLanguage: 'he',
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
        type: 'text'
      },
      {
        id: '2',
        senderId: 'user2',
        senderName: 'שמואל לוי',
        content: 'תודה על המידע! איך בודקים טמפרטורה בלול?',
        originalLanguage: 'he',
        timestamp: new Date(Date.now() - 1000 * 60 * 8),
        type: 'text'
      },
      {
        id: '3',
        senderId: 'user3',
        senderName: 'Rajesh Kumar',
        content: 'I use digital thermometers placed at chicken height level',
        originalLanguage: 'en',
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        type: 'text'
      }
    ]
  };

  const currentMessages = messages[activeChat] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send to the backend
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const translateMessage = (content: string, fromLang: string, toLang: string): string => {
    // Mock translation - in real app, this would call translation API
    if (fromLang === toLang) return content;
    
    const translations: Record<string, Record<string, string>> = {
      'he': {
        'en': 'Hello! I can help with chicken vaccination issues.',
        'ar': 'مرحبا! يمكنني المساعدة في مشاكل تطعيم الدجاج.'
      },
      'en': {
        'he': 'שלום! אני יכול לעזור עם בעיות חיסון תרנגולות.',
        'ar': 'مرحبا! يمكنني المساعدة في مشاكل تطعيم الدجاج.'
      },
      'ar': {
        'he': 'שלום! אני יכול לעזור עם בעיות חיסון תרנגולות.',
        'en': 'Hello! I can help with chicken vaccination issues.'
      }
    };
    
    return translations[fromLang]?.[toLang] || content;
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('he-IL', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getLanguageFlag = (lang: string): string => {
    const flags: Record<string, string> = {
      'he': '🇮🇱',
      'en': '🇺🇸',
      'ar': '🇸🇦',
      'si': '🇱🇰',
      'ta': '🇱🇰'
    };
    return flags[lang] || '🌐';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Chat List */}
        <div className="w-80 border-r bg-card">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">צ'אט</h2>
            <div className="flex items-center gap-2 mt-2">
              <Globe className="w-4 h-4" />
              <span className="text-sm text-muted-foreground">תרגום אוטומטי</span>
              <Select value={autoTranslate ? 'on' : 'off'} onValueChange={(value) => setAutoTranslate(value === 'on')}>
                <SelectTrigger className="w-20 h-6">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="on">פועל</SelectItem>
                  <SelectItem value="off">כבוי</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="overflow-y-auto">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`p-4 border-b cursor-pointer hover:bg-accent/50 ${
                  activeChat === chat.id ? 'bg-accent' : ''
                }`}
                onClick={() => setActiveChat(chat.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>
                        {chat.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {chat.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium truncate">{chat.name}</h3>
                      {chat.unreadCount > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {chat.unreadCount}
                        </Badge>
                      )}
                    </div>
                    
                    {chat.lastMessage && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <span className="truncate">
                          {chat.lastMessage.senderName}: {chat.lastMessage.content}
                        </span>
                        <span className="text-xs">
                          {formatTime(chat.lastMessage.timestamp)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b bg-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {chats.find(c => c.id === activeChat)?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">
                    {chats.find(c => c.id === activeChat)?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {chats.find(c => c.id === activeChat)?.isOnline ? 'מחובר' : 'לא מחובר'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Video className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {currentMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  msg.senderId === 'user1' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.senderId !== 'user1' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>
                      {msg.senderName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div className={`max-w-xs lg:max-w-md ${
                  msg.senderId === 'user1' ? 'order-first' : ''
                }`}>
                  {msg.senderId !== 'user1' && (
                    <p className="text-xs text-muted-foreground mb-1">
                      {msg.senderName}
                    </p>
                  )}
                  
                  <div className={`rounded-lg p-3 ${
                    msg.senderId === 'user1' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}>
                    <p className="text-sm">{msg.content}</p>
                    
                    {autoTranslate && msg.originalLanguage !== language && (
                      <div className="mt-2 pt-2 border-t border-white/20">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-xs opacity-75">
                            {getLanguageFlag(language)} תרגום:
                          </span>
                        </div>
                        <p className="text-xs opacity-90">
                          {translateMessage(msg.content, msg.originalLanguage, language)}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {formatTime(msg.timestamp)}
                    </span>
                    {msg.originalLanguage !== 'he' && (
                      <span className="text-xs">
                        {getLanguageFlag(msg.originalLanguage)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t bg-card">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="כתוב הודעה... (מתורגמת אוטומטית)"
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!message.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
              <Globe className="w-3 h-3" />
              <span>הודעות מתורגמות אוטומטית לשפה הנבחרת</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSystem;
