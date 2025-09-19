import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Home, 
  MapPin, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Shield,
  Key,
  Send
} from 'lucide-react';
import { authService, LoginCredentials, RegisterData, User as AuthUser } from '@/lib/auth';

interface AdvancedAuthFormProps {
  onAuthSuccess: (user: AuthUser) => void;
  onClose?: () => void;
}

const AdvancedAuthForm: React.FC<AdvancedAuthFormProps> = ({ onAuthSuccess, onClose }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'forgot' | 'verify'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Login form state
  const [loginData, setLoginData] = useState<LoginCredentials>({
    email: '',
    password: '',
    rememberMe: false
  });

  // Register form state
  const [registerData, setRegisterData] = useState<RegisterData>({
    email: '',
    password: '',
    name: '',
    farmName: '',
    farmType: 'chickens',
    location: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');

  // Forgot password state
  const [resetEmail, setResetEmail] = useState('');

  // Verify email state
  const [verifyToken, setVerifyToken] = useState('');

  // Check if user is already authenticated
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser && authService.isAuthenticated()) {
      onAuthSuccess(currentUser);
    }
  }, [onAuthSuccess]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const { user } = await authService.login(loginData);
      setSuccess('התחברת בהצלחה!');
      setTimeout(() => {
        onAuthSuccess(user);
      }, 1000);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'שגיאה בהתחברות');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    // Validate passwords match
    if (registerData.password !== confirmPassword) {
      setError('הסיסמאות אינן תואמות');
      setIsLoading(false);
      return;
    }

    // Validate password strength
    if (registerData.password.length < 8) {
      setError('הסיסמה חייבת להכיל לפחות 8 תווים');
      setIsLoading(false);
      return;
    }

    try {
      const { user } = await authService.register(registerData);
      setSuccess('נרשמת בהצלחה! אנא בדוק את האימייל שלך לאימות.');
      setActiveTab('verify');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'שגיאה ברישום');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await authService.requestPasswordReset(resetEmail);
      setSuccess('נשלח קישור לאיפוס סיסמה לאימייל שלך');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'שגיאה בשליחת בקשת איפוס');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await authService.verifyEmail(verifyToken);
      setSuccess('האימייל אומת בהצלחה! כעת תוכל להתחבר');
      setActiveTab('login');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'שגיאה באימות האימייל');
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return {
      score: strength,
      label: strength < 2 ? 'חלש' : strength < 4 ? 'בינוני' : 'חזק',
      color: strength < 2 ? 'text-red-600' : strength < 4 ? 'text-yellow-600' : 'text-green-600'
    };
  };

  const passwordStrength = getPasswordStrength(registerData.password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-lg">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">AgriConnect</CardTitle>
          <p className="text-gray-600">התחבר לחשבון שלך או צור חשבון חדש</p>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">התחברות</TabsTrigger>
              <TabsTrigger value="register">רישום</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">אימייל</Label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="הכנס את האימייל שלך"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                      className="pr-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">סיסמה</Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="הכנס את הסיסמה שלך"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="remember-me"
                      checked={loginData.rememberMe}
                      onChange={(e) => setLoginData({ ...loginData, rememberMe: e.target.checked })}
                      className="rounded border-gray-300"
                      aria-label="זכור אותי"
                    />
                    <Label htmlFor="remember-me" className="text-sm">זכור אותי</Label>
                  </div>
                  <Button
                    type="button"
                    onClick={() => setActiveTab('forgot')}
                    className="text-emerald-600 hover:text-emerald-700 bg-transparent hover:bg-transparent p-0 h-auto"
                  >
                    שכחת סיסמה?
                  </Button>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      מתחבר...
                    </>
                  ) : (
                    'התחבר'
                  )}
                </Button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800 font-medium mb-2">פרטי התחברות לדמו:</p>
                <p className="text-xs text-blue-700">אימייל: demo@agriconnect.com</p>
                <p className="text-xs text-blue-700">סיסמה: demo123</p>
              </div>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register" className="space-y-4">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">שם מלא</Label>
                    <div className="relative">
                      <User className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-name"
                        type="text"
                        placeholder="השם שלך"
                        value={registerData.name}
                        onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                        required
                        className="pr-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">אימייל</Label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="האימייל שלך"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        required
                        className="pr-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-farm">שם החווה</Label>
                  <div className="relative">
                    <Home className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="register-farm"
                      type="text"
                      placeholder="שם החווה שלך"
                      value={registerData.farmName}
                      onChange={(e) => setRegisterData({ ...registerData, farmName: e.target.value })}
                      className="pr-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-location">מיקום</Label>
                  <div className="relative">
                    <MapPin className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="register-location"
                      type="text"
                      placeholder="עיר, אזור"
                      value={registerData.location}
                      onChange={(e) => setRegisterData({ ...registerData, location: e.target.value })}
                      className="pr-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password">סיסמה</Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="register-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="סיסמה חזקה"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {registerData.password && (
                    <div className="flex items-center gap-2">
                      <Badge  className={passwordStrength.color}>
                        {passwordStrength.label}
                      </Badge>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${
                            passwordStrength.score < 2 ? 'bg-red-500' : 
                            passwordStrength.score < 4 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">אישור סיסמה</Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="הכנס שוב את הסיסמה"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {confirmPassword && (
                    <div className="flex items-center gap-2">
                      {registerData.password === confirmPassword ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      )}
                      <span className={`text-sm ${
                        registerData.password === confirmPassword ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {registerData.password === confirmPassword ? 'הסיסמאות תואמות' : 'הסיסמאות אינן תואמות'}
                      </span>
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                  disabled={isLoading || registerData.password !== confirmPassword}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      נרשם...
                    </>
                  ) : (
                    'צור חשבון'
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {/* Forgot Password Tab */}
          {activeTab === 'forgot' && (
            <div className="space-y-4">
              <div className="text-center">
                <Key className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold">איפוס סיסמה</h3>
                <p className="text-gray-600 text-sm">הכנס את האימייל שלך ונשלח לך קישור לאיפוס הסיסמה</p>
              </div>

              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">אימייל</Label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="הכנס את האימייל שלך"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      required
                      className="pr-10"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      שולח...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      שלח קישור איפוס
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  className="w-full"
                  onClick={() => setActiveTab('login')}
                >
                  חזור להתחברות
                </Button>
              </form>
            </div>
          )}

          {/* Verify Email Tab */}
          {activeTab === 'verify' && (
            <div className="space-y-4">
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold">אימות אימייל</h3>
                <p className="text-gray-600 text-sm">הכנס את קוד האימות שנשלח לאימייל שלך</p>
              </div>

              <form onSubmit={handleVerifyEmail} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="verify-token">קוד אימות</Label>
                  <Input
                    id="verify-token"
                    type="text"
                    placeholder="הכנס את קוד האימות"
                    value={verifyToken}
                    onChange={(e) => setVerifyToken(e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      מאמת...
                    </>
                  ) : (
                    'אמת אימייל'
                  )}
                </Button>

                <Button
                  type="button"
                  className="w-full"
                  onClick={() => setActiveTab('login')}
                >
                  חזור להתחברות
                </Button>
              </form>
            </div>
          )}

          {/* Error/Success Messages */}
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedAuthForm;
