// A/B Testing System for AgricultureConnect
export interface ABTest {
  id: string;
  name: string;
  description: string;
  variants: ABTestVariant[];
  isActive: boolean;
  startDate: Date;
  endDate: Date;
  targetAudience: 'all' | 'new_users' | 'returning_users' | 'premium_users';
  metrics: string[];
}

export interface ABTestVariant {
  id: string;
  name: string;
  description: string;
  weight: number; // Percentage (0-100)
  config: Record<string, any>;
}

export interface ABTestResult {
  testId: string;
  variantId: string;
  userId: string;
  timestamp: Date;
  events: ABTestEvent[];
}

export interface ABTestEvent {
  type: 'view' | 'click' | 'conversion' | 'engagement';
  element?: string;
  value?: number;
  timestamp: Date;
  metadata?: Record<string, any>;
}

class ABTestingService {
  private tests: Map<string, ABTest> = new Map();
  private userVariants: Map<string, Map<string, string>> = new Map();
  private results: ABTestResult[] = [];

  constructor() {
    this.initializeDefaultTests();
    this.loadUserVariants();
  }

  // Initialize default A/B tests
  private initializeDefaultTests(): void {
    // Hero Section CTA Test
    this.addTest({
      id: 'hero-cta-test',
      name: 'Hero Section CTA Button',
      description: 'Test different CTA button texts and colors',
      variants: [
        {
          id: 'control',
          name: 'Control (Default)',
          description: 'Original green CTA button',
          weight: 50,
          config: {
            buttonText: 'התחל עכשיו',
            buttonColor: 'emerald',
            buttonSize: 'lg'
          }
        },
        {
          id: 'variant-a',
          name: 'Variant A - Urgency',
          description: 'Red button with urgency text',
          weight: 25,
          config: {
            buttonText: 'התחל עכשיו - מוגבל!',
            buttonColor: 'red',
            buttonSize: 'lg',
            showBadge: true,
            badgeText: 'חדש!'
          }
        },
        {
          id: 'variant-b',
          name: 'Variant B - Benefit',
          description: 'Blue button with benefit text',
          weight: 25,
          config: {
            buttonText: 'הגדל תפוקה ב-300%',
            buttonColor: 'blue',
            buttonSize: 'lg',
            showIcon: true,
            icon: 'trending-up'
          }
        }
      ],
      isActive: true,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      targetAudience: 'all',
      metrics: ['click', 'conversion', 'engagement']
    });

    // Pricing Section Test
    this.addTest({
      id: 'pricing-layout-test',
      name: 'Pricing Section Layout',
      description: 'Test different pricing card layouts',
      variants: [
        {
          id: 'control',
          name: 'Control (3 Cards)',
          description: 'Original 3-card horizontal layout',
          weight: 50,
          config: {
            layout: 'horizontal',
            cardCount: 3,
            showPopular: true,
            popularIndex: 1
          }
        },
        {
          id: 'variant-a',
          name: 'Variant A - Vertical',
          description: 'Vertical stacked layout',
          weight: 25,
          config: {
            layout: 'vertical',
            cardCount: 3,
            showPopular: true,
            popularIndex: 1,
            showComparison: true
          }
        },
        {
          id: 'variant-b',
          name: 'Variant B - 2 Cards',
          description: 'Simplified 2-card layout',
          weight: 25,
          config: {
            layout: 'horizontal',
            cardCount: 2,
            showPopular: false,
            showComparison: false,
            highlightFree: true
          }
        }
      ],
      isActive: true,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      targetAudience: 'all',
      metrics: ['view', 'click', 'conversion']
    });

    // ChatBot Trigger Test
    this.addTest({
      id: 'chatbot-trigger-test',
      name: 'ChatBot Trigger Position',
      description: 'Test different ChatBot trigger positions and styles',
      variants: [
        {
          id: 'control',
          name: 'Control (Bottom Left)',
          description: 'Original bottom-left floating button',
          weight: 50,
          config: {
            position: 'bottom-left',
            style: 'floating',
            size: 'large',
            animation: 'pulse'
          }
        },
        {
          id: 'variant-a',
          name: 'Variant A - Bottom Right',
          description: 'Bottom-right with different animation',
          weight: 25,
          config: {
            position: 'bottom-right',
            style: 'floating',
            size: 'large',
            animation: 'bounce'
          }
        },
        {
          id: 'variant-b',
          name: 'Variant B - Top Banner',
          description: 'Top banner with CTA',
          weight: 25,
          config: {
            position: 'top-banner',
            style: 'banner',
            size: 'medium',
            animation: 'slide-down',
            showText: true,
            text: 'שאל את AgriBot!'
          }
        }
      ],
      isActive: true,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      targetAudience: 'all',
      metrics: ['view', 'click', 'engagement']
    });
  }

  // Add a new A/B test
  addTest(test: ABTest): void {
    this.tests.set(test.id, test);
  }

  // Get variant for user
  getVariant(testId: string, userId: string): string | null {
    const test = this.tests.get(testId);
    if (!test || !test.isActive) {
      return null;
    }

    // Check if user already has a variant assigned
    const userVariants = this.userVariants.get(userId) || new Map();
    if (userVariants.has(testId)) {
      return userVariants.get(testId)!;
    }

    // Assign variant based on weight
    const variant = this.assignVariant(test);
    userVariants.set(testId, variant.id);
    this.userVariants.set(userId, userVariants);
    
    // Save to localStorage
    this.saveUserVariants();
    
    return variant.id;
  }

  // Get variant configuration
  getVariantConfig(testId: string, userId: string): Record<string, any> | null {
    const variantId = this.getVariant(testId, userId);
    if (!variantId) return null;

    const test = this.tests.get(testId);
    if (!test) return null;

    const variant = test.variants.find(v => v.id === variantId);
    return variant?.config || null;
  }

  // Record an event
  recordEvent(testId: string, userId: string, event: ABTestEvent): void {
    const variantId = this.getVariant(testId, userId);
    if (!variantId) return;

    // Find existing result or create new one
    let result = this.results.find(r => r.testId === testId && r.userId === userId);
    if (!result) {
      result = {
        testId,
        variantId,
        userId,
        timestamp: new Date(),
        events: []
      };
      this.results.push(result);
    }

    result.events.push(event);
    
    // Save to localStorage
    this.saveResults();
  }

  // Get test results
  getTestResults(testId: string): {
    variants: Record<string, {
      users: number;
      events: Record<string, number>;
      conversionRate: number;
    }>;
  } {
    const test = this.tests.get(testId);
    if (!test) return { variants: {} };

    const results = this.results.filter(r => r.testId === testId);
    const variants: Record<string, any> = {};

    test.variants.forEach(variant => {
      const variantResults = results.filter(r => r.variantId === variant.id);
      const events: Record<string, number> = {};
      let totalEvents = 0;

      variantResults.forEach(result => {
        result.events.forEach(event => {
          events[event.type] = (events[event.type] || 0) + 1;
          totalEvents++;
        });
      });

      variants[variant.id] = {
        users: variantResults.length,
        events,
        conversionRate: events.conversion ? (events.conversion / events.view) * 100 : 0
      };
    });

    return { variants };
  }

  // Get all active tests
  getActiveTests(): ABTest[] {
    return Array.from(this.tests.values()).filter(test => test.isActive);
  }

  // Private methods
  private assignVariant(test: ABTest): ABTestVariant {
    const random = Math.random() * 100;
    let cumulative = 0;

    for (const variant of test.variants) {
      cumulative += variant.weight;
      if (random <= cumulative) {
        return variant;
      }
    }

    // Fallback to first variant
    return test.variants[0];
  }

  private loadUserVariants(): void {
    try {
      const stored = localStorage.getItem('agriconnect-ab-variants');
      if (stored) {
        const data = JSON.parse(stored);
        this.userVariants = new Map(Object.entries(data).map(([userId, variants]) => [
          userId,
          new Map(Object.entries(variants as Record<string, string>))
        ]));
      }
    } catch (error) {
      console.error('Error loading user variants:', error);
    }
  }

  private saveUserVariants(): void {
    try {
      const data = Object.fromEntries(
        Array.from(this.userVariants.entries()).map(([userId, variants]) => [
          userId,
          Object.fromEntries(variants.entries())
        ])
      );
      localStorage.setItem('agriconnect-ab-variants', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving user variants:', error);
    }
  }

  private saveResults(): void {
    try {
      localStorage.setItem('agriconnect-ab-results', JSON.stringify(this.results));
    } catch (error) {
      console.error('Error saving results:', error);
    }
  }
}

// Export singleton instance
export const abTestingService = new ABTestingService();
export default abTestingService;
