import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Brain, Clock, Star, TrendingUp, Zap, Bot } from 'lucide-react';
import Footer from '@/components/layout/Footer';

const Analysis = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-effect border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="hover:bg-card/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold font-space-grotesk">Smart Analysis</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center animate-slide-up">
            <div className="w-24 h-24 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold font-space-grotesk mb-4">
              AI-Powered Career Analysis
              <span className="block text-lg text-muted-foreground font-normal mt-2">
                Discover your potential with advanced ML algorithms
              </span>
            </h2>
          </div>

          {/* Coming Soon Card */}
          <Card className="glass-effect shadow-elevated animate-slide-up relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-primary/5 to-success/5" />
            <CardHeader className="relative z-10 text-center pb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mx-auto mb-4 animate-glow">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-space-grotesk">
                Advanced ML Models Coming Soon
              </CardTitle>
              <CardDescription className="text-base">
                Our team is developing sophisticated machine learning algorithms to provide you with the most accurate career guidance
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 space-y-8">
              {/* Feature Preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-accent" />
                    <span>Personality Assessment</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-card/30 rounded-lg">
                      <span className="text-sm">Big Five Traits Analysis</span>
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-card/30 rounded-lg">
                      <span className="text-sm">Emotional Intelligence</span>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-card/30 rounded-lg">
                      <span className="text-sm">Learning Style Identification</span>
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-success" />
                    <span>Aptitude Mapping</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-card/30 rounded-lg">
                      <span className="text-sm">Logical Reasoning</span>
                      <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-card/30 rounded-lg">
                      <span className="text-sm">Numerical Ability</span>
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-card/30 rounded-lg">
                      <span className="text-sm">Verbal Comprehension</span>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-warning" />
                  <span>Development Timeline</span>
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-success/10 to-success/5 rounded-lg border border-success/20">
                    <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">1</span>
                    </div>
                    <div>
                      <div className="font-medium">Data Collection & Model Training</div>
                      <div className="text-sm text-muted-foreground">Gathering comprehensive datasets for accurate predictions</div>
                    </div>
                    <span className="text-xs bg-success/20 text-success px-2 py-1 rounded ml-auto">In Progress</span>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-warning/10 to-warning/5 rounded-lg border border-warning/20">
                    <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">2</span>
                    </div>
                    <div>
                      <div className="font-medium">Algorithm Development</div>
                      <div className="text-sm text-muted-foreground">Building advanced ML models for personality and aptitude analysis</div>
                    </div>
                    <span className="text-xs bg-warning/20 text-warning px-2 py-1 rounded ml-auto">Next Phase</span>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-muted/10 to-muted/5 rounded-lg border border-muted/20">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-xs text-muted-foreground font-bold">3</span>
                    </div>
                    <div>
                      <div className="font-medium">Testing & Validation</div>
                      <div className="text-sm text-muted-foreground">Ensuring accuracy and reliability of recommendations</div>
                    </div>
                    <span className="text-xs bg-muted/20 text-muted-foreground px-2 py-1 rounded ml-auto">Planned</span>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center p-8 bg-gradient-to-br from-primary/5 via-accent/5 to-success/5 rounded-xl border border-primary/10">
                <Star className="w-12 h-12 text-primary mx-auto mb-4 animate-float" />
                <h3 className="text-xl font-bold font-space-grotesk mb-2">Be the First to Know</h3>
                <p className="text-muted-foreground mb-4">
                  Get notified when our advanced analysis features are ready
                </p>
                <Button className="bg-gradient-primary hover:opacity-90">
                  Notify Me When Ready
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* What to Expect */}
          <Card className="glass-effect shadow-card animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-primary" />
                <span>What to Expect</span>
              </CardTitle>
              <CardDescription>
                Advanced AI analysis that will transform your career decision-making
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold">Deep Personality Insights</h4>
                  <p className="text-sm text-muted-foreground">
                    Understand your strengths, preferences, and working style through advanced psychological analysis
                  </p>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mx-auto">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold">Aptitude Assessment</h4>
                  <p className="text-sm text-muted-foreground">
                    Discover your natural abilities and talents across multiple domains and skill areas
                  </p>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-gradient-success rounded-xl flex items-center justify-center mx-auto">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold">Personalized Recommendations</h4>
                  <p className="text-sm text-muted-foreground">
                    Get tailored career paths and educational suggestions based on your unique profile
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Analysis;