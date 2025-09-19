import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, Send, X, Minimize2, Maximize2, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'action';
}

interface ChatBotProps {
  isOpen: boolean;
  onToggle: () => void;
}

const AIChatBot: React.FC<ChatBotProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'שלום! אני AgriBot, העוזר החכם שלך לחקלאות. איך אוכל לעזור לך היום?',
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // AI Response Simulation
  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Agriculture-related responses
    if (lowerMessage.includes('תרנגולות') || lowerMessage.includes('לול')) {
      return 'עבור ניהול לול תרנגולות, אני ממליץ על:\n\n🐔 **תזונה**: מזון מאוזן עם 16-18% חלבון\n🌡️ **טמפרטורה**: 18-22°C בלול\n💡 **תאורה**: 14-16 שעות אור ביום\n📊 **מעקב**: רישום יומי של ביצים, מזון ומים\n\nהאם תרצה מידע נוסף על אחד מהנושאים?';
    }
    
    if (lowerMessage.includes('מחלה') || lowerMessage.includes('חולה')) {
      return 'אם אתה חושד במחלה בלול:\n\n🚨 **דחוף**: בידוד מיידי של תרנגולות חולות\n📞 **ייעוץ**: פנה לווטרינר מומחה לעופות\n🧼 **ניקיון**: חיטוי יסודי של הלול\n📋 **תיעוד**: רשום תסמינים ותאריכים\n\n**תסמינים נפוצים**: חוסר תיאבון, שינוי בהתנהגות, הפרשות חריגות';
    }
    
    if (lowerMessage.includes('תפוקה') || lowerMessage.includes('ביצים')) {
      return 'לשיפור תפוקת הביצים:\n\n🥚 **תזונה איכותית**: מזון עשיר בסידן וויטמינים\n🌅 **תאורה נכונה**: 14-16 שעות אור עקבי\n🏠 **סביבה נוחה**: טמפרטורה יציבה, אוורור טוב\n😌 **לחץ נמוך**: סביבה שקטה ללא הפרעות\n📈 **מעקב**: רישום יומי של תפוקה\n\nתפוקה ממוצעת: 250-300 ביצים לשנה לתרנגולת';
    }
    
    if (lowerMessage.includes('מחיר') || lowerMessage.includes('עלות')) {
      return 'עלויות ניהול לול (לחודש):\n\n💰 **מזון**: 200-300 ש"ח ל-100 תרנגולות\n💧 **מים**: 50-100 ש"ח\n⚡ **חשמל**: 100-200 ש"ח (תאורה וחימום)\n🏥 **וטרינר**: 100-300 ש"ח (בדיקות)\n📦 **ציוד**: 50-150 ש"ח\n\n**סה"כ**: 500-1050 ש"ח לחודש ל-100 תרנגולות';
    }
    
    if (lowerMessage.includes('שיווק') || lowerMessage.includes('מכירה')) {
      return 'אסטרטגיות שיווק ביצים:\n\n🏪 **מכירה ישירה**: דוכן בחווה, שווקים מקומיים\n🛒 **מכירה מקוונת**: פלטפורמות דיגיטליות\n🤝 **שותפויות**: מסעדות, מאפיות, חנויות אורגניות\n📱 **רשתות חברתיות**: פייסבוק, אינסטגרם\n🏷️ **ברנדינג**: אריזה ייחודית, סיפור החווה\n\n**טיפ**: התמקד באיכות וטריות - זה המפתח להצלחה!';
    }
    
    if (lowerMessage.includes('חוק') || lowerMessage.includes('רשיון')) {
      return 'דרישות חוקיות לניהול לול:\n\n📋 **רישיון עסק**: מהרשות המקומית\n🏥 **רישום וטרינרי**: חובה לכל לול\n📊 **תיעוד**: רישום תנועות, טיפולים, תפוקה\n🌍 **תקנות סביבה**: מניעת זיהום וטיפול בפסולת\n👥 **ביטוח**: אחריות צד ג' וחיות\n\n**חשוב**: בדוק עם הרשות המקומית את הדרישות הספציפיות';
    }
    
    // Default responses
    const defaultResponses = [
      'זה נושא מעניין! אני יכול לעזור לך עם:\n\n🐔 ניהול לול תרנגולות\n🌱 טיפוח ירקות ופירות\n🐄 גידול בעלי חיים\n📊 ניהול פיננסי של החווה\n🌍 שיווק וקישוריות\n\nאיזה נושא מעניין אותך יותר?',
      'אני כאן לעזור! שאל אותי על:\n\n💡 טיפים לחקלאות חכמה\n📈 שיפור תפוקה\n💰 חיסכון בעלויות\n🤝 חיבור עם חקלאים אחרים\n📚 הדרכה מקצועית\n\nמה תרצה לדעת?',
      'מעולה! אני יכול לספק מידע על:\n\n🔬 טכנולוגיות חקלאיות חדשות\n📱 אפליקציות לניהול חווה\n🌿 שיטות גידול מתקדמות\n📊 ניתוח נתונים וסטטיסטיקות\n🎯 יעדי פיתוח עסקי\n\nאיזה תחום מעניין אותך?'
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickSuggestions = [
    'איך לשפר תפוקת ביצים?',
    'מה לעשות עם תרנגולת חולה?',
    'איך לחשב רווחיות?',
    'טיפים לניהול לול',
    'איך לשווק ביצים?'
  ];

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className="fixed bottom-6 left-6 z-50 h-14 w-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-glow"
        size="icon"
      >
        <Bot className="h-6 w-6 text-white" />
      </Button>
    );
  }

  return (
    <Card className={`fixed bottom-6 left-6 z-50 w-96 h-[500px] shadow-2xl border-0 bg-white/95 backdrop-blur-lg transition-all duration-300 ${
      isMinimized ? 'h-16' : 'h-[500px]'
    }`}>
      <CardHeader className="pb-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <CardTitle className="text-lg">AgriBot AI</CardTitle>
            <Badge variant="secondary" className="bg-white/20 text-white text-xs">
              <Sparkles className="h-3 w-3 mr-1" />
              AI
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 p-0 text-white hover:bg-white/20"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="h-8 w-8 p-0 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {!isMinimized && (
        <>
          <CardContent className="p-0 flex flex-col h-[400px]">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {message.sender === 'bot' && (
                          <Bot className="h-4 w-4 mt-0.5 text-emerald-600 flex-shrink-0" />
                        )}
                        {message.sender === 'user' && (
                          <User className="h-4 w-4 mt-0.5 text-white flex-shrink-0" />
                        )}
                        <div className="whitespace-pre-wrap text-sm">
                          {message.text}
                        </div>
                      </div>
                      <div className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString('he-IL', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Bot className="h-4 w-4 text-emerald-600" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Quick Suggestions */}
            {messages.length === 1 && (
              <div className="p-4 border-t">
                <div className="text-xs text-gray-500 mb-2">הצעות מהירות:</div>
                <div className="flex flex-wrap gap-2">
                  {quickSuggestions.slice(0, 3).map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setInputValue(suggestion)}
                      className="text-xs h-8 px-2"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="שאל את AgriBot..."
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  size="sm"
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default AIChatBot;
