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
  Calendar,
  Menu,
  X,
  Lock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Footer from '@/components/layout/Footer';
import { AnimatedThemeToggler } from '@/magicui/animated-theme-toggler';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, userProfile, loading } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Determine what to show based on profile completion
  const isFirstLogin = !userProfile?.profile_completed;
  const canShowQuiz = userProfile?.profile_completed && !userProfile?.smart_analysis_completed;
  const canShowSmartAnalysis = userProfile?.profile_completed;
  const canShowCollegeExplorer = userProfile?.profile_completed;

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out",
      });
      navigate('/sign-in');
      setIsMobileMenuOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out. Please try again.",
      });
    }
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
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-primary rounded-lg sm:rounded-xl flex items-center justify-center">
                <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold font-space-grotesk">Lakshya</h1>
                <p className="hidden sm:block text-xs sm:text-sm text-muted-foreground">Smart Career Platform</p>
              </div>
            </div>

            <div className="flex items-center space-x-1 sm:space-x-3">
              {/* Desktop Theme Toggle */}
              <div className="hidden sm:block">
                <AnimatedThemeToggler className="h-8 w-8" />
              </div>

              {/* Desktop Menu */}
              <div className="hidden sm:flex items-center space-x-2">
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

              {/* Mobile Menu */}
              <div className="sm:hidden">
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Menu className="w-5 h-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] glass-effect border-border/20 backdrop-blur-xl">
                    <div className="flex flex-col h-full">
                      {/* Header */}
                      <div className="py-6 border-b border-border/20">
                        <h2 className="text-xl font-semibold gradient-text">Navigation</h2>
                      </div>

                      {/* Navigation Links */}
                      <div className="flex-1 py-6">
                        <div className="space-y-2">
                          {/* Career Quiz - Only show if profile completed but smart analysis not done */}
                          {canShowQuiz && (
                            <Link
                              to="/quiz"
                              className="flex items-center px-4 py-3 text-base font-medium rounded-xl hover:text-primary hover:bg-primary/5 transition-all duration-200"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <BookOpen className="mr-3 h-5 w-5" />
                              Career Quiz
                            </Link>
                          )}

                          {/* Smart Analysis - Only show if profile completed */}
                          {canShowSmartAnalysis && (
                            <Link
                              to="/smart-analysis"
                              className="flex items-center px-4 py-3 text-base font-medium rounded-xl hover:text-primary hover:bg-primary/5 transition-all duration-200"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <Brain className="mr-3 h-5 w-5" />
                              Smart Analysis
                            </Link>
                          )}

                          {/* College Explorer - Only show if profile completed */}
                          {canShowCollegeExplorer && (
                            <Link
                              to="/college-map"
                              className="flex items-center px-4 py-3 text-base font-medium rounded-xl hover:text-primary hover:bg-primary/5 transition-all duration-200"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <MapPin className="mr-3 h-5 w-5" />
                              College Explorer
                            </Link>
                          )}

                          <hr className="border-border/20 my-4" />

                          {/* Theme Toggle */}
                          <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-card/30">
                            <span className="text-base font-medium">Theme</span>
                            <AnimatedThemeToggler className="h-8 w-8" />
                          </div>

                          {/* Profile Link */}
                          <Link
                            to="/profile"
                            className="flex items-center px-4 py-3 text-base font-medium rounded-xl hover:text-primary hover:bg-primary/5 transition-all duration-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <User className="mr-3 h-5 w-5" />
                            Profile
                          </Link>

                          {/* Settings Link */}
                          <Link
                            to="/profile"
                            className="flex items-center px-4 py-3 text-base font-medium rounded-xl hover:text-primary hover:bg-primary/5 transition-all duration-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Settings className="mr-3 h-5 w-5" />
                            Settings
                          </Link>
                        </div>
                      </div>

                      {/* Bottom Section - Logout */}
                      <div className="border-t border-border/20 pt-4 pb-6">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-3 text-base font-medium rounded-xl hover:text-destructive hover:bg-destructive/5 transition-all duration-200"
                        >
                          <LogOut className="mr-3 h-5 w-5" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Navigation Section */}
        <div className="mb-6 sm:mb-8 animate-slide-up">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
            <Link
              to="/dashboard"
              className="flex flex-col items-center p-3 sm:p-4 md:p-6 bg-card/50 hover:bg-card/70 rounded-lg sm:rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xs sm:text-sm md:text-base font-medium text-center">Dashboard</span>
            </Link>

            <Link
              to="/college-map"
              className="flex flex-col items-center p-3 sm:p-4 md:p-6 bg-card/50 hover:bg-card/70 rounded-lg sm:rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-accent rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xs sm:text-sm md:text-base font-medium text-center">Colleges</span>
            </Link>

            <Link
              to="/about"
              className="flex flex-col items-center p-3 sm:p-4 md:p-6 bg-card/50 hover:bg-card/70 rounded-lg sm:rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-success rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xs sm:text-sm md:text-base font-medium text-center">About</span>
            </Link>

            <Link
              to="/contact"
              className="flex flex-col items-center p-3 sm:p-4 md:p-6 bg-card/50 hover:bg-card/70 rounded-lg sm:rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-warning to-warning-glow rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xs sm:text-sm md:text-base font-medium text-center">Contact</span>
            </Link>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8 animate-slide-up">
          <h2 className="text-2xl sm:text-3xl font-bold font-space-grotesk mb-2">
            Welcome {userProfile?.name ? userProfile.name.split(' ')[0] : 'Student'}!
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {isFirstLogin 
              ? "Complete your profile to unlock personalized career guidance"
              : "Track your progress and explore career opportunities tailored for you."
            }
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <Card className="glass-effect hover:shadow-card transition-all duration-300 animate-slide-up">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Profile Completion</CardTitle>
                <Target className="w-4 h-4 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userProfile?.profile_completed ? '100%' : '25%'}
              </div>
              <Progress value={userProfile?.profile_completed ? 100 : 25} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {userProfile?.profile_completed 
                  ? 'Profile completed successfully!' 
                  : 'Complete your profile to get better recommendations'
                }
              </p>
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
              <div className="text-2xl font-bold">
                {userProfile?.smart_analysis_completed ? 'Complete' : 'Pending'}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {userProfile?.smart_analysis_completed 
                  ? 'Smart analysis completed!' 
                  : 'Complete aptitude analysis to unlock recommendations'
                }
              </p>
            </CardContent>
          </Card>

          <Card className="glass-effect hover:shadow-card transition-all duration-300 animate-slide-up">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Quiz Status</CardTitle>
                <BookOpen className="w-4 h-4 text-success" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userProfile?.quiz_completed ? 'Complete' : 'Pending'}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {userProfile?.quiz_completed 
                  ? 'Career quiz completed!' 
                  : 'Take the career quiz for detailed insights'
                }
              </p>
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
              <div className="text-2xl font-bold">
                {isFirstLogin ? '1' : userProfile?.profile_completed && !userProfile?.smart_analysis_completed ? '2' : '0'}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {isFirstLogin 
                  ? 'Complete your profile setup' 
                  : userProfile?.profile_completed && !userProfile?.smart_analysis_completed 
                    ? 'Take smart analysis and quiz'
                    : 'All tasks completed!'
                }
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Image Section */}
        <div className="mb-6 sm:mb-8 animate-slide-up flex justify-center">
          <img
            src="dashboard_flow.png" // replace with your image path
            alt="Dashboard Illustration"
            className="rounded-xl shadow-lg w-full max-w-3xl object-cover"
          />
        </div>


        {/* Main Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Profile Card - Always shown */}
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
                    <span className={`text-xs px-2 py-1 rounded ${
                      userProfile?.profile_completed 
                        ? 'bg-success/20 text-success' 
                        : 'bg-warning/20 text-warning'
                    }`}>
                      {userProfile?.profile_completed ? 'Complete' : 'Pending'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-card/30 rounded-lg">
                    <span className="text-sm">Academic Details</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      userProfile?.profile_completed 
                        ? 'bg-success/20 text-success' 
                        : 'bg-warning/20 text-warning'
                    }`}>
                      {userProfile?.profile_completed ? 'Complete' : 'Pending'}
                    </span>
                  </div>
                  <Link to="/profile">
                    <Button className="w-full bg-gradient-primary hover:opacity-90">
                      {isFirstLogin ? 'Complete Profile' : 'Edit Profile'}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Smart Analysis Card - Only show if profile completed */}
            {canShowSmartAnalysis && (
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
                    <h3 className="text-lg font-semibold">
                      {userProfile?.smart_analysis_completed ? 'Analysis Complete!' : 'Ready for Analysis?'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {userProfile?.smart_analysis_completed 
                        ? 'Your comprehensive assessment is complete. View your detailed insights and career recommendations.'
                        : 'Complete our comprehensive assessment to discover your strengths and ideal career paths.'
                      }
                    </p>
                    <Link to="/smart-analysis">
                      <Button className="bg-gradient-primary hover:opacity-90">
                        {userProfile?.smart_analysis_completed ? 'View Results' : 'Start Analysis'}
                        <TrendingUp className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Career Quiz Card - Only show if profile completed */}
            {canShowQuiz && (
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
                    <Link to="/quiz">
                      <Button className="w-full bg-gradient-success hover:opacity-90">
                        Take Quiz
                        <BookOpen className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* College Explorer Card - Only show if profile completed */}
            {canShowCollegeExplorer && (
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
                  <Link to="/college-map">
                    <Button className="w-full bg-gradient-to-r from-warning to-warning-glow hover:opacity-90">
                      Explore Colleges
                      <MapPin className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
              </Card>
            )}
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

      <Footer />
    </div>
  );
};

export default Dashboard;