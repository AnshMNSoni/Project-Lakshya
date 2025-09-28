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
  Lock,
  ClipboardList,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  ArrowDown,
  Users,
  BarChart3,
  Phone
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Footer from '@/components/layout/Footer';
import { AnimatedThemeToggler } from '@/magicui/animated-theme-toggler';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Timeline } from '@/components/ui/timeline';

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

  // Timeline data for the journey visualization
  const timelineData = [
    {
      title: "User Profile",
      content: (
        <div>
          <p className="mb-6 text-sm font-normal text-foreground md:text-base dark:text-foreground">
            Start your journey by creating a comprehensive profile with your academic background, interests, and career aspirations.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-muted-foreground md:text-base dark:text-muted-foreground">
              <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                <User className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
              Personal Information Setup
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground md:text-base dark:text-muted-foreground">
              <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
              Academic Background Entry
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground md:text-base dark:text-muted-foreground">
              <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                <Target className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
              Career Goals Definition
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Technical Analysis",
      content: (
        <div>
          <p className="mb-6 text-sm font-normal text-foreground md:text-base dark:text-foreground">
            Our AI-powered system analyzes your profile, preferences, and performance to understand your strengths and potential career paths.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-muted-foreground md:text-base dark:text-muted-foreground">
              <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                <Brain className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
              AI-Powered Assessment
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground md:text-base dark:text-muted-foreground">
              <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                <ClipboardList className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
              Skills & Interest Evaluation
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground md:text-base dark:text-muted-foreground">
              <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
              Performance Analytics
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Advance Analysis",
      content: (
        <div>
          <p className="mb-6 text-sm font-normal text-foreground md:text-base dark:text-foreground">
            Assess your skills with a structured quiz covering technical knowledge, physical abilities, and mental health. Based on your performance, get personalized stream recommendations.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-muted-foreground md:text-base dark:text-muted-foreground">
              <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
              15 Technical Knowledge Questions
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground md:text-base dark:text-muted-foreground">
              <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                <Users className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
              30 Physical, Mental & Health Skill Questions
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground md:text-base dark:text-muted-foreground">
              <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                <Target className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
              Stream Recommendations Based on Analysis
            </div>
          </div>
        </div>
      ),
    },

    {
      title: "Career Recommendations",
      content: (
        <div>
          <p className="mb-6 text-sm font-normal text-foreground md:text-base dark:text-foreground">
            Receive curated college and course recommendations tailored to your profile, ensuring the best fit for your academic and career goals.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-muted-foreground md:text-base dark:text-muted-foreground">
              <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
              Smart Course Matching
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground md:text-base dark:text-muted-foreground">
              <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                <Award className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
              College Rankings & Insights
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground md:text-base dark:text-muted-foreground">
              <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
              Personalized Career Paths
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "College Mapping",
      content: (
        <div>
          <p className="mb-6 text-sm font-normal text-foreground md:text-base dark:text-foreground">
            Explore colleges on an interactive map, view detailed information, and compare institutions based on your priorities and preferences.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-muted-foreground md:text-base dark:text-muted-foreground">
              <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
              Interactive College Map
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground md:text-base dark:text-muted-foreground">
              <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
              Detailed College Profiles
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground md:text-base dark:text-muted-foreground">
              <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
              Application Deadlines
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Final Decision",
      content: (
        <div>
          <p className="mb-6 text-sm font-normal text-foreground md:text-base dark:text-foreground">
            Make informed decisions with comprehensive data, peer reviews, and expert guidance to choose the perfect college for your future.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-muted-foreground md:text-base dark:text-muted-foreground">
              <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
              Informed Decision Making
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground md:text-base dark:text-muted-foreground">
              <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                <User className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
              Peer Reviews & Ratings
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground md:text-base dark:text-muted-foreground">
              <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
              Application Timeline
            </div>
          </div>
        </div>
      ),
    },
  ];

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
                  <Button variant="ghost" size="sm" className="hover:bg-destructive/10 hover:text-destructive">
                    <User className="w-4 h-4 mr-2" />
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
                  <SheetContent side="right" className="w-[300px] bg-white dark:bg-neutral-900 border-border/20">

                    <div className="flex flex-col h-full">
                      {/* Header */}
                      <div className="py-6 border-b border-border/20">
                        <h2 className="text-xl font-semibold gradient-text">Navigation</h2>
                      </div>

                      {/* Navigation Links */}
                      <div className="flex-1 py-6">
                        <div className="space-y-2">

                          {/* Technical Analysis - Only show if profile completed */}
                          {canShowSmartAnalysis && (
                            <Link
                              to="/smart-analysis"
                              className="flex items-center px-4 py-3 text-base font-medium rounded-xl hover:text-primary hover:bg-primary/5 transition-all duration-200"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <Brain className="mr-3 h-5 w-5" />
                              Technical Analysis
                            </Link>
                          )}

                          {/* Career Quiz - Only show if profile completed but Technical Analysis not done */}
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
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
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
                  ? 'Technical Analysis completed!'
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
                    ? 'Take Technical Analysis and quiz'
                    : 'All tasks completed!'
                }
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Timeline Section */}
        <div className="mb-6 sm:mb-8 animate-slide-up">
          <div className="relative w-full overflow-clip">
            <Timeline data={timelineData} />
          </div>
        </div>


        {/* Main Features - Vertical stack with path connectors */}
        <div className="space-y-6">
          {/* Profile Management Card - Always shown */}
          <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-500 animate-slide-up bg-gradient-to-br from-white via-white to-orange-50 dark:from-background dark:via-background dark:to-orange-950/20 border-2 border-orange-200/50 dark:border-orange-800/20">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="relative z-10">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <User className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl font-bold bg-gradient-to-r from-gray-900 to-orange-600 bg-clip-text text-transparent dark:from-white dark:to-orange-400">
                    Profile Management
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300 mt-1">
                    Complete your personal information and unlock career guidance
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-orange-100 dark:border-orange-800/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                    <span className="font-medium text-gray-900 dark:text-white">Personal Information</span>
                  </div>
                  <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${userProfile?.profile_completed
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                    : 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400'
                    }`}>
                    {userProfile?.profile_completed ? 'Complete' : 'Pending'}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-orange-100 dark:border-orange-800/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="font-medium text-gray-900 dark:text-white">Academic Details</span>
                  </div>
                  <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${userProfile?.profile_completed
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                    : 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400'
                    }`}>
                    {userProfile?.profile_completed ? 'Complete' : 'Pending'}
                  </span>
                </div>
              </div>
              <Link to="/profile" className="block">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 h-12 text-base font-semibold rounded-xl">
                  {isFirstLogin ? 'Complete Profile' : 'Edit Profile'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Connector and Technical Analysis Card */}
          {canShowSmartAnalysis && (
            <>
              <div className="flex justify-center">
                <ArrowDown className="w-8 h-8 text-primary/50 animate-bounce" />
              </div>
              <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-500 animate-slide-up bg-gradient-to-br from-white via-white to-green-50 dark:from-background dark:via-background dark:to-green-950/20 border-2 border-green-200/50 dark:border-green-800/20">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative z-10">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Brain className="w-7 h-7 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="text-white text-xs font-bold">2</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold bg-gradient-to-r from-gray-900 to-green-600 bg-clip-text text-transparent dark:from-white dark:to-green-400">
                        Technical Analysis
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300 mt-1">
                        AI-powered aptitude and personality assessment
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="text-center py-6 space-y-4">
                    <div className="relative w-20 h-20 mx-auto">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/40 rounded-full flex items-center justify-center">
                        <Brain className="w-10 h-10 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="absolute inset-0 animate-ping">
                        <div className="w-20 h-20 border-2 border-green-300 dark:border-green-600 rounded-full opacity-75" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {userProfile?.smart_analysis_completed ? 'Analysis Complete!' : 'Ready for Analysis?'}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {userProfile?.smart_analysis_completed
                        ? 'Your comprehensive assessment is complete. View your detailed insights and career recommendations.'
                        : 'Complete our comprehensive assessment to discover your strengths and ideal career paths.'
                      }
                    </p>
                    <Link to="/smart-analysis" className="block">
                      <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 h-12 text-base font-semibold rounded-xl px-8">
                        {userProfile?.smart_analysis_completed ? 'View Results' : 'Start Analysis'}
                        <TrendingUp className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Connector and Career Quiz Card */}
          {canShowQuiz && (
            <>
              <div className="flex justify-center">
                <ArrowDown className="w-8 h-8 text-primary/50 animate-bounce" />
              </div>
              <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-500 animate-slide-up bg-gradient-to-br from-white via-white to-blue-50 dark:from-background dark:via-background dark:to-blue-950/20 border-2 border-blue-200/50 dark:border-blue-800/20">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative z-10">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <BookOpen className="w-7 h-7 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-purple-500 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="text-white text-xs font-bold">3</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent dark:from-white dark:to-blue-400">
                        Career Quiz
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300 mt-1">
                        Interactive questionnaire to find your perfect career match
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10 space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl border border-blue-200/50 dark:border-blue-800/30">
                    <div className="flex items-center space-x-3 mb-3">
                      <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="font-semibold text-gray-900 dark:text-white">Comprehensive Assessment</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div className="text-center p-2 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                        <div className="font-bold text-blue-600 dark:text-blue-400">15</div>
                        <div className="text-xs text-gray-600 dark:text-gray-300">Technical</div>
                      </div>
                      <div className="text-center p-2 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                        <div className="font-bold text-purple-600 dark:text-purple-400">30</div>
                        <div className="text-xs text-gray-600 dark:text-gray-300">Personal</div>
                      </div>
                      <div className="text-center p-2 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                        <div className="font-bold text-green-600 dark:text-green-400">25</div>
                        <div className="text-xs text-gray-600 dark:text-gray-300">Minutes</div>
                      </div>
                    </div>
                  </div>
                  <Link to="/quiz" className="block">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 h-12 text-base font-semibold rounded-xl">
                      Take Quiz
                      <BookOpen className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </>
          )}

          {/* Connector and College Explorer Card */}
          {canShowCollegeExplorer && (
            <>
              <div className="flex justify-center">
                <ArrowDown className="w-8 h-8 text-primary/50 animate-bounce" />
              </div>
              <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-500 animate-slide-up bg-gradient-to-br from-white via-white to-purple-50 dark:from-background dark:via-background dark:to-purple-950/20 border-2 border-purple-200/50 dark:border-purple-800/20">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative z-10">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <MapPin className="w-7 h-7 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="text-white text-xs font-bold">4</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold bg-gradient-to-r from-gray-900 to-purple-600 bg-clip-text text-transparent dark:from-white dark:to-purple-400">
                        College Explorer
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300 mt-1">
                        Find government colleges and admission details
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10 space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-purple-100 dark:border-purple-800/30">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">150+</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">Colleges</div>
                    </div>
                    <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-purple-100 dark:border-purple-800/30">
                      <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">50+</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">Cities</div>
                    </div>
                    <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-purple-100 dark:border-purple-800/30">
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">500+</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">Courses</div>
                    </div>
                  </div>
                  <Link to="/college-map" className="block">
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 h-12 text-base font-semibold rounded-xl">
                      Explore Colleges
                      <MapPin className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;