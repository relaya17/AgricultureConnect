// Advanced Authentication System with JWT and Refresh Tokens
export interface User {
    id: string;
    email: string;
    name: string;
    role: 'farmer' | 'expert' | 'admin';
    farmId?: string;
    avatar?: string;
    isVerified: boolean;
    createdAt: Date;
    lastLogin: Date;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

export interface LoginCredentials {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface RegisterData {
    email: string;
    password: string;
    name: string;
    farmName?: string;
    farmType?: 'chickens' | 'cows' | 'vegetables' | 'mixed';
    location?: string;
}

class AuthService {
    private readonly ACCESS_TOKEN_KEY = 'agriconnect_access_token';
    private readonly REFRESH_TOKEN_KEY = 'agriconnect_refresh_token';
    private readonly USER_KEY = 'agriconnect_user';
    private readonly TOKEN_EXPIRY_KEY = 'agriconnect_token_expiry';

    // Token refresh interval (5 minutes before expiry)
    private readonly REFRESH_THRESHOLD = 5 * 60 * 1000;
    private refreshTimer: number | null = null;

    constructor() {
        this.startTokenRefreshTimer();
    }

    // Login with email and password
    async login(credentials: LoginCredentials): Promise<{ user: User; tokens: AuthTokens }> {
        try {
            // Simulate API call - replace with real API
            const response = await this.simulateLogin(credentials);

            if (response.success && response.data) {
                const { user, tokens } = response.data;

                // Store tokens and user data
                this.storeTokens(tokens);
                this.storeUser(user);

                // Start token refresh timer
                this.startTokenRefreshTimer();

                return { user, tokens };
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    // Register new user
    async register(data: RegisterData): Promise<{ user: User; tokens: AuthTokens }> {
        try {
            // Simulate API call - replace with real API
            const response = await this.simulateRegister(data);

            if (response.success && response.data) {
                const { user, tokens } = response.data;

                // Store tokens and user data
                this.storeTokens(tokens);
                this.storeUser(user);

                // Start token refresh timer
                this.startTokenRefreshTimer();

                return { user, tokens };
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    // Logout user
    async logout(): Promise<void> {
        try {
            const refreshToken = this.getRefreshToken();

            if (refreshToken) {
                // Call logout API to invalidate tokens
                await this.simulateLogout(refreshToken);
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear local storage regardless of API call success
            this.clearAuthData();
            this.stopTokenRefreshTimer();
        }
    }

    // Refresh access token
    async refreshAccessToken(): Promise<AuthTokens | null> {
        try {
            const refreshToken = this.getRefreshToken();

            if (!refreshToken) {
                throw new Error('No refresh token available');
            }

            // Simulate API call - replace with real API
            const response = await this.simulateRefreshToken(refreshToken);

            if (response.success && response.data) {
                const { tokens } = response.data;
                this.storeTokens(tokens);
                return tokens;
            } else {
                throw new Error('Token refresh failed');
            }
        } catch (error) {
            console.error('Token refresh error:', error);
            // If refresh fails, logout user
            await this.logout();
            return null;
        }
    }

    // Get current user
    getCurrentUser(): User | null {
        try {
            const userStr = localStorage.getItem(this.USER_KEY);
            return userStr ? JSON.parse(userStr) : null;
        } catch (error) {
            console.error('Error getting current user:', error);
            return null;
        }
    }

    // Get access token
    getAccessToken(): string | null {
        return localStorage.getItem(this.ACCESS_TOKEN_KEY);
    }

    // Get refresh token
    getRefreshToken(): string | null {
        return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    }

    // Check if user is authenticated
    isAuthenticated(): boolean {
        const token = this.getAccessToken();
        const user = this.getCurrentUser();
        return !!(token && user);
    }

    // Check if token is expired
    isTokenExpired(): boolean {
        const expiryStr = localStorage.getItem(this.TOKEN_EXPIRY_KEY);
        if (!expiryStr) return true;

        const expiry = parseInt(expiryStr);
        return Date.now() >= expiry;
    }

    // Check if token needs refresh
    needsRefresh(): boolean {
        const expiryStr = localStorage.getItem(this.TOKEN_EXPIRY_KEY);
        if (!expiryStr) return true;

        const expiry = parseInt(expiryStr);
        return Date.now() >= (expiry - this.REFRESH_THRESHOLD);
    }

    // Update user profile
    async updateProfile(updates: Partial<User>): Promise<User> {
        try {
            const currentUser = this.getCurrentUser();
            if (!currentUser) {
                throw new Error('No user logged in');
            }

            // Simulate API call - replace with real API
            const response = await this.simulateUpdateProfile(currentUser.id, updates);

            if (response.success && response.data) {
                const updatedUser = response.data;
                this.storeUser(updatedUser);
                return updatedUser;
            } else {
                throw new Error('Profile update failed');
            }
        } catch (error) {
            console.error('Profile update error:', error);
            throw error;
        }
    }

    // Change password
    async changePassword(currentPassword: string, newPassword: string): Promise<void> {
        try {
            const currentUser = this.getCurrentUser();
            if (!currentUser) {
                throw new Error('No user logged in');
            }

            // Simulate API call - replace with real API
            const response = await this.simulateChangePassword(currentUser.id, currentPassword, newPassword);

            if (!response.success) {
                throw new Error('Password change failed');
            }
        } catch (error) {
            console.error('Password change error:', error);
            throw error;
        }
    }

    // Request password reset
    async requestPasswordReset(email: string): Promise<void> {
        try {
            // Simulate API call - replace with real API
            const response = await this.simulatePasswordReset(email);

            if (!response.success) {
                throw new Error('Password reset request failed');
            }
        } catch (error) {
            console.error('Password reset error:', error);
            throw error;
        }
    }

    // Verify email
    async verifyEmail(token: string): Promise<void> {
        try {
            // Simulate API call - replace with real API
            const response = await this.simulateEmailVerification(token);

            if (!response.success) {
                throw new Error('Email verification failed');
            }
        } catch (error) {
            console.error('Email verification error:', error);
            throw error;
        }
    }

    // Private methods
    private storeTokens(tokens: AuthTokens): void {
        localStorage.setItem(this.ACCESS_TOKEN_KEY, tokens.accessToken);
        localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refreshToken);
        localStorage.setItem(this.TOKEN_EXPIRY_KEY, (Date.now() + tokens.expiresIn * 1000).toString());
    }

    private storeUser(user: User): void {
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }

    private clearAuthData(): void {
        localStorage.removeItem(this.ACCESS_TOKEN_KEY);
        localStorage.removeItem(this.REFRESH_TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
        localStorage.removeItem(this.TOKEN_EXPIRY_KEY);
    }

    private startTokenRefreshTimer(): void {
        this.stopTokenRefreshTimer();

        const checkInterval = 60000; // Check every minute

        this.refreshTimer = window.setInterval(async () => {
            if (this.isAuthenticated() && this.needsRefresh()) {
                console.log('Token needs refresh, refreshing...');
                await this.refreshAccessToken();
            }
        }, checkInterval);
    }

    private stopTokenRefreshTimer(): void {
        if (this.refreshTimer) {
            clearInterval(this.refreshTimer);
            this.refreshTimer = null;
        }
    }

    // Mock API methods - replace with real API calls
    private async simulateLogin(credentials: LoginCredentials) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock validation
        if (credentials.email === 'demo@agriconnect.com' && credentials.password === 'demo123') {
            return {
                success: true,
                data: {
                    user: {
                        id: '1',
                        email: credentials.email,
                        name: 'דמוס חקלאי',
                        role: 'farmer' as const,
                        farmId: 'farm-1',
                        avatar: '/avatars/farmer-1.jpg',
                        isVerified: true,
                        createdAt: new Date('2024-01-01'),
                        lastLogin: new Date()
                    },
                    tokens: {
                        accessToken: 'mock-access-token-' + Date.now(),
                        refreshToken: 'mock-refresh-token-' + Date.now(),
                        expiresIn: 3600 // 1 hour
                    }
                }
            };
        } else {
            return {
                success: false,
                error: 'Invalid email or password'
            };
        }
    }

    private async simulateRegister(data: RegisterData) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        return {
            success: true,
            data: {
                user: {
                    id: Date.now().toString(),
                    email: data.email,
                    name: data.name,
                    role: 'farmer' as const,
                    farmId: 'farm-' + Date.now(),
                    isVerified: false,
                    createdAt: new Date(),
                    lastLogin: new Date()
                },
                tokens: {
                    accessToken: 'mock-access-token-' + Date.now(),
                    refreshToken: 'mock-refresh-token-' + Date.now(),
                    expiresIn: 3600 // 1 hour
                }
            }
        };
    }

    private async simulateLogout(refreshToken: string) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        return { success: true };
    }

    private async simulateRefreshToken(refreshToken: string) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        return {
            success: true,
            data: {
                tokens: {
                    accessToken: 'mock-access-token-' + Date.now(),
                    refreshToken: 'mock-refresh-token-' + Date.now(),
                    expiresIn: 3600 // 1 hour
                }
            }
        };
    }

    private async simulateUpdateProfile(userId: string, updates: Partial<User>) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const currentUser = this.getCurrentUser();
        if (!currentUser) {
            return { success: false, error: 'No user found' };
        }

        const updatedUser = { ...currentUser, ...updates };

        return {
            success: true,
            data: updatedUser
        };
    }

    private async simulateChangePassword(userId: string, currentPassword: string, newPassword: string) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        return { success: true };
    }

    private async simulatePasswordReset(email: string) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        return { success: true };
    }

    private async simulateEmailVerification(token: string) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        return { success: true };
    }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;
