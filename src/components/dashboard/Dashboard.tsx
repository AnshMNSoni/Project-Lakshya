import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Brain, 
  BookOpen, 
  MapPin, 
  Settings,
  LogOut,
  Sparkles,
  TrendingUp,
  Clock,
  Award,
  Target,
  Calendar
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out",
    });
    navigate('/sign-in');
  };

  const comingSoonFeature = (featureName: string) => {
    toast({
      title: "Coming Soon!",
      description: `${featureName} feature is under development with ML integration`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-effect border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold font-space-grotesk">EduGuide</h1>
                <p className="text-sm text-muted-foreground">Smart Career Platform</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/profile">
                <Button variant="ghost" size="sm" className="hover:bg-card/50">
                  <Settings className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-slide-up">
          <h2 className="text-3xl font-bold font-space-grotesk mb-2">Welcome to Your Dashboard</h2>
          <p className="text-muted-foreground">
            Track your progress and explore career opportunities tailored for you.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass-effect hover:shadow-card transition-all duration-300 animate-slide-up">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Profile Completion</CardTitle>
                <Target className="w-4 h-4 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">75%</div>
              <Progress value={75} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">Complete your profile to get better recommendations</p>
            </CardContent>
          </Card>

          <Card className="glass-effect hover:shadow-card transition-all duration-300 animate-slide-up">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Analysis Status</CardTitle>
                <Brain className="w-4 h-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Pending</div>
              <p className="text-xs text-muted-foreground mt-1">Complete aptitude analysis to unlock recommendations</p>
            </CardContent>
          </Card>

          <Card className="glass-effect hover:shadow-card transition-all duration-300 animate-slide-up">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Colleges Found</CardTitle>
                <MapPin className="w-4 h-4 text-success" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">150+</div>
              <p className="text-xs text-muted-foreground mt-1">Government colleges in your area</p>
            </CardContent>
          </Card>

          <Card className="glass-effect hover:shadow-card transition-all duration-300 animate-slide-up">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Next Steps</CardTitle>
                <Clock className="w-4 h-4 text-warning" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground mt-1">Recommended actions to complete</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="glass-effect hover:shadow-card transition-all duration-300 animate-slide-up">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Profile Management</CardTitle>
                    <CardDescription>Update your personal information and preferences</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-card/30 rounded-lg">
                    <span className="text-sm">Personal Information</span>
                    <span className="text-xs bg-success/20 text-success px-2 py-1 rounded">Complete</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-card/30 rounded-lg">
                    <span className="text-sm">Academic Details</span>
                    <span className="text-xs bg-warning/20 text-warning px-2 py-1 rounded">Pending</span>
                  </div>
                  <Link to="/profile">
                    <Button className="w-full bg-gradient-primary hover:opacity-90">
                      Edit Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Analysis Card */}
            <Card className="glass-effect hover:shadow-card transition-all duration-300 animate-slide-up">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Smart Analysis</CardTitle>
                    <CardDescription>AI-powered aptitude and personality assessment</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto animate-pulse-glow">
                    <Brain className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Ready for Analysis?</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete our comprehensive assessment to discover your strengths and ideal career paths.
                  </p>
                  <Button 
                    onClick={() => comingSoonFeature("Smart Analysis")}
                    className="bg-gradient-primary hover:opacity-90"
                  >
                    Start Analysis
                    <TrendingUp className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quiz Card */}
            <Card className="glass-effect hover:shadow-card transition-all duration-300 animate-slide-up">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-success rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Career Quiz</CardTitle>
                    <CardDescription>Interactive questionnaire to find your perfect match</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-success/10 to-accent/10 rounded-lg border border-success/20">
                    <div className="flex items-center space-x-3 mb-3">
                      <Award className="w-5 h-5 text-success" />
                      <span className="font-medium">Comprehensive Assessment</span>
                    </div>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Aptitude evaluation</li>
                      <li>• Interest mapping</li>
                      <li>• Personality insights</li>
                    </ul>
                  </div>
                  <Button 
                    onClick={() => comingSoonFeature("Career Quiz")}
                    className="w-full bg-gradient-success hover:opacity-90"
                  >
                    Take Quiz
                    <BookOpen className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* College Finder Card */}
            <Card className="glass-effect hover:shadow-card transition-all duration-300 animate-slide-up">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-warning to-warning-glow rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">College Explorer</CardTitle>
                    <CardDescription>Find government colleges and admission details</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-card/30 rounded-lg">
                      <div className="text-2xl font-bold text-primary">150+</div>
                      <div className="text-xs text-muted-foreground">Colleges</div>
                    </div>
                    <div className="text-center p-3 bg-card/30 rounded-lg">
                      <div className="text-2xl font-bold text-accent">50+</div>
                      <div className="text-xs text-muted-foreground">Cities</div>
                    </div>
                  </div>
                  <Button 
                    onClick={() => comingSoonFeature("College Explorer")}
                    className="w-full bg-gradient-to-r from-warning to-warning-glow hover:opacity-90"
                  >
                    Explore Colleges
                    <MapPin className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="mt-8 glass-effect animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span>Getting Started</span>
            </CardTitle>
            <CardDescription>Complete these steps to unlock all features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-card/30 rounded-lg">
                <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">✓</span>
                </div>
                <span className="text-sm">Create your account</span>
                <span className="text-xs bg-success/20 text-success px-2 py-1 rounded ml-auto">Complete</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-card/30 rounded-lg">
                <div className="w-6 h-6 bg-warning rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">2</span>
                </div>
                <span className="text-sm">Complete your profile</span>
                <span className="text-xs bg-warning/20 text-warning px-2 py-1 rounded ml-auto">In Progress</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-card/30 rounded-lg">
                <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">3</span>
                </div>
                <span className="text-sm">Take aptitude analysis</span>
                <span className="text-xs bg-muted/20 text-muted-foreground px-2 py-1 rounded ml-auto">Pending</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-card/30 rounded-lg">
                <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">4</span>
                </div>
                <span className="text-sm">Explore career recommendations</span>
                <span className="text-xs bg-muted/20 text-muted-foreground px-2 py-1 rounded ml-auto">Pending</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;