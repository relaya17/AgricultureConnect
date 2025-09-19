import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "@/contexts/TranslationContext";

const AuthForm = () => {
  const { language, setLanguage, t, getLanguageName, availableLanguages } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-primary">🌾 AgriConnect</h1>
          </div>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {availableLanguages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {getLanguageName(lang)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">{t.login}</TabsTrigger>
              <TabsTrigger value="signup">{t.signup}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t.email}</Label>
                <Input id="email" type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t.password}</Label>
                <Input id="password" type="password" />
              </div>
              <Button className="w-full" onClick={() => window.parent.postMessage({type: 'auth-success'}, '*')}>
                {t.login}
              </Button>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t.name}</Label>
                <Input id="name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">{t.email}</Label>
                <Input id="signup-email" type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">{t.password}</Label>
                <Input id="signup-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">{t.country}</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="israel">🇮🇱 {t('israel')}</SelectItem>
                    <SelectItem value="srilanka">🇱🇰 {t('sriLanka')}</SelectItem>
                    <SelectItem value="other">{t('other')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="farmType">{t.farmType}</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="poultry">🐔 {t('chickens')}</SelectItem>
                    <SelectItem value="dairy">🐄 {t('cows')}</SelectItem>
                    <SelectItem value="crops">🌾 יבולים</SelectItem>
                    <SelectItem value="mixed">🚜 מעורב</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" onClick={() => window.parent.postMessage({type: 'auth-success'}, '*')}>
                {t.signup}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;