import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BookOpen, Clock, Award, Target, CheckCircle, Play } from 'lucide-react';

const Quiz = () => {
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
              <div className="w-8 h-8 bg-gradient-success rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold font-space-grotesk">Career Assessment Quiz</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center animate-slide-up">
            <div className="w-24 h-24 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold font-space-grotesk mb-4">
              Interactive Career Assessment
              <span className="block text-lg text-muted-foreground font-normal mt-2">
                Comprehensive questionnaire powered by machine learning
              </span>
            </h2>
          </div>

          {/* Quiz Overview */}
          <Card className="glass-effect shadow-elevated animate-slide-up relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-success/5 via-primary/5 to-accent/5" />
            <CardHeader className="relative z-10">
              <CardTitle className="text-2xl font-space-grotesk text-center">
                Comprehensive Assessment Suite
              </CardTitle>
              <CardDescription className="text-center text-base">
                Multi-dimensional evaluation to discover your ideal career path
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 space-y-8">
              {/* Quiz Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                  <CardHeader className="pb-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center mb-2">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-lg">Aptitude Assessment</CardTitle>
                    <CardDescription>Evaluate your natural abilities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span>Logical reasoning</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span>Mathematical skills</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span>Verbal comprehension</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span>Spatial awareness</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
                  <CardHeader className="pb-3">
                    <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center mb-2">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-lg">Interest Profiling</CardTitle>
                    <CardDescription>Discover what motivates you</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                        <span>Subject preferences</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                        <span>Activity types</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                        <span>Work environments</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                        <span>Career aspirations</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
                  <CardHeader className="pb-3">
                    <div className="w-10 h-10 bg-gradient-success rounded-lg flex items-center justify-center mb-2">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-lg">Personality Traits</CardTitle>
                    <CardDescription>Understand your work style</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-success rounded-full" />
                        <span>Communication style</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-success rounded-full" />
                        <span>Leadership qualities</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-success rounded-full" />
                        <span>Team dynamics</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-success rounded-full" />
                        <span>Problem-solving approach</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quiz Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-card/30 rounded-lg">
                  <div className="text-2xl font-bold text-primary">120</div>
                  <div className="text-sm text-muted-foreground">Total Questions</div>
                </div>
                <div className="text-center p-4 bg-card/30 rounded-lg">
                  <div className="text-2xl font-bold text-accent">45</div>
                  <div className="text-sm text-muted-foreground">Minutes</div>
                </div>
                <div className="text-center p-4 bg-card/30 rounded-lg">
                  <div className="text-2xl font-bold text-success">15+</div>
                  <div className="text-sm text-muted-foreground">Career Paths</div>
                </div>
                <div className="text-center p-4 bg-card/30 rounded-lg">
                  <div className="text-2xl font-bold text-warning">AI</div>
                  <div className="text-sm text-muted-foreground">Powered</div>
                </div>
              </div>

              {/* Coming Soon Notice */}
              <div className="text-center p-8 bg-gradient-to-br from-primary/5 via-accent/5 to-success/5 rounded-xl border border-primary/10">
                <Play className="w-12 h-12 text-primary mx-auto mb-4 animate-float" />
                <h3 className="text-xl font-bold font-space-grotesk mb-2">Interactive Quiz Coming Soon</h3>
                <p className="text-muted-foreground mb-6">
                  Our advanced ML algorithms are being fine-tuned to provide you with the most accurate career recommendations based on your responses.
                </p>
                
                {/* Feature Timeline */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-center space-x-4 p-3 bg-success/10 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-sm">Question bank development - Complete</span>
                  </div>
                  <div className="flex items-center justify-center space-x-4 p-3 bg-warning/10 rounded-lg">
                    <Clock className="w-5 h-5 text-warning" />
                    <span className="text-sm">ML model training - In Progress</span>
                  </div>
                  <div className="flex items-center justify-center space-x-4 p-3 bg-muted/10 rounded-lg">
                    <Target className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm">User interface development - Planned</span>
                  </div>
                </div>

                <Button className="bg-gradient-success hover:opacity-90">
                  Get Notified When Ready
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card className="glass-effect shadow-card animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-success" />
                <span>How the Assessment Works</span>
              </CardTitle>
              <CardDescription>
                Scientifically designed evaluation process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h4 className="font-semibold">Answer Questions</h4>
                    <p className="text-sm text-muted-foreground">
                      Complete a series of carefully crafted questions across multiple dimensions
                    </p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mx-auto">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h4 className="font-semibold">AI Analysis</h4>
                    <p className="text-sm text-muted-foreground">
                      Advanced algorithms analyze your responses to identify patterns and preferences
                    </p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-gradient-success rounded-xl flex items-center justify-center mx-auto">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h4 className="font-semibold">Get Results</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive detailed insights about your strengths, interests, and personality
                    </p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-warning to-warning-glow rounded-xl flex items-center justify-center mx-auto">
                      <span className="text-white font-bold">4</span>
                    </div>
                    <h4 className="font-semibold">Career Matches</h4>
                    <p className="text-sm text-muted-foreground">
                      Get personalized career recommendations with education pathways
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-primary/5 via-accent/5 to-success/5 rounded-xl border border-primary/10">
                  <h4 className="font-semibold mb-3">What Makes Our Assessment Special</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>Research-based question design</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>Machine learning powered analysis</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>Personalized career matching</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>Regular updates and improvements</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Quiz;