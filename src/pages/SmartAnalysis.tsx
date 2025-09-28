import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Sparkles,
  Brain,
  TrendingUp,
  Target,
  Zap,
  Play,
  Clock,
  CheckCircle,
  Star,
  BarChart3,
  Users,
  Award,
  Lightbulb,
  Pencil,
  Save,
  Loader2,
} from "lucide-react";
import Footer from "@/components/layout/Footer";
import { AnimatedThemeToggler } from "@/magicui/animated-theme-toggler";
import { LakshyaBreadcrumb } from "@/components/common/LakshyaBreadcrumb";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const SmartAnalysis = () => {
  const { userProfile, user, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [interests, setInterests] = useState(userProfile?.academic_info?.interests || "");
  const [aspirations, setAspirations] = useState(userProfile?.academic_info?.aspirations || "");
  const navigate = useNavigate();

  // Sync state with userProfile data
  useEffect(() => {
    if (userProfile?.academic_info) {
      setInterests(userProfile.academic_info.interests || "");
      setAspirations(userProfile.academic_info.aspirations || "");
    }
  }, [userProfile]);

  const analysisFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Assessment",
      description:
        "Advanced machine learning algorithms analyze your responses to provide accurate insights",
      color: "text-blue-500",
    },
    {
      icon: Target,
      title: "Personalized Recommendations",
      description:
        "Get tailored career suggestions based on your unique profile and preferences",
      color: "text-green-500",
    },
    {
      icon: TrendingUp,
      title: "Growth Tracking",
      description:
        "Monitor your progress and development over time with detailed analytics",
      color: "text-purple-500",
    },
    {
      icon: Award,
      title: "Skill Mapping",
      description:
        "Identify your strengths and areas for improvement across various domains",
      color: "text-orange-500",
    },
  ];

  const analysisSteps = [
    {
      title: "Aptitude Assessment",
      description: "Evaluate logical reasoning and problem-solving skills",
      duration: "10 min",
      icon: Brain,
      questions: 25,
    },
    {
      title: "Interest Profiling",
      description: "Identify your areas of interest and passion",
      duration: "8 min",
      icon: Lightbulb,
      questions: 20,
    },
    {
      title: "Personality Analysis",
      description: "Understand your work style and preferences",
      duration: "12 min",
      icon: Users,
      questions: 30,
    },
    {
      title: "Skills Evaluation",
      description: "Assess your current skills and potential",
      duration: "10 min",
      icon: BarChart3,
      questions: 22,
    },
  ];

  const benefits = [
    "Discover hidden talents and strengths",
    "Get personalized career roadmaps",
    "Understand your learning style",
    "Identify skill gaps and opportunities",
    "Receive industry-specific insights",
    "Connect with relevant resources",
  ];

  const handleAnalysisStart = () => {
    setIsAnalyzing(true);
    localStorage.setItem("quizAccessAllowed", "true");
    setTimeout(() => {
      navigate("/quiz");
    }, 3000);
  };

  const handleSave = async () => {
    if (!user || !userProfile) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "User not found. Please try logging in again.",
      });
      return;
    }

    setIsSaving(true);

    try {
      // Prepare the updated academic info
      const updatedAcademicInfo = {
        ...userProfile.academic_info,
        interests: interests.trim(),
        aspirations: aspirations.trim(),
      };

      // Update profile in database
      const { error } = await supabase
        .from('profiles')
        .update({
          academic_info: updatedAcademicInfo,
        })
        .eq('user_id', user.id);

      if (error) {
        throw error;
      }

      // Refresh profile data to get updated information
      await refreshProfile();

      toast({
        title: "Profile Updated",
        description: "Your interests and aspirations have been saved successfully.",
      });

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Failed to save changes. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      handleSave();
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-effect border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="p-2 sm:px-3">
                  <ArrowLeft className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Back to Dashboard</span>
                </Button>
              </Link>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 sm:space-x-3"
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-bold font-space-grotesk gradient-text">
                  Lakshya
                </span>
              </Link>
              <AnimatedThemeToggler className="h-8 w-8" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <LakshyaBreadcrumb />

        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16 animate-slide-up">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-primary rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-pulse">
            <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold font-space-grotesk mb-4 sm:mb-6">
            Technical <span className="gradient-text">Analysis</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 mb-6">
            Discover your true potential with our AI-powered comprehensive
            analysis. Get personalized insights about your aptitude, interests, and
            ideal career paths.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>40 minutes total</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              <span>97 questions</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              <span>Instant results</span>
            </div>
          </div>
        </div>

        {/* User Profile Card */}
        {userProfile && (
          <Card className="glass-effect hover:shadow-card transition-all duration-300 mb-12 animate-slide-up border-l-4 border-l-gradient-primary">
            <CardHeader className="flex flex-row justify-between items-start">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Your Current Profile
                </CardTitle>
                <CardDescription>Based on your provided information</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEditToggle}
                disabled={isSaving}
                className="flex items-center gap-1"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="hidden sm:inline">Saving...</span>
                  </>
                ) : isEditing ? (
                  <>
                    <Save className="w-4 h-4" />
                    <span className="hidden sm:inline">Save</span>
                  </>
                ) : (
                  <>
                    <Pencil className="w-4 h-4" />
                    <span className="hidden sm:inline">Edit</span>
                  </>
                )}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-yellow-500" />
                    Areas of Interest
                  </h4>
                  {isEditing ? (
                    <Textarea
                      value={interests}
                      onChange={(e) => setInterests(e.target.value)}
                      placeholder="Enter your areas of interest (e.g., Technology, Science, Arts, Sports, etc.)"
                      className="w-full min-h-[80px] resize-none"
                      rows={3}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {userProfile?.academic_info?.interests ||
                        "Not provided - we'll help you discover them!"}
                    </p>
                  )}
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Award className="w-4 h-4 text-green-500" />
                    Career Aspirations
                  </h4>
                  {isEditing ? (
                    <Textarea
                      value={aspirations}
                      onChange={(e) => setAspirations(e.target.value)}
                      placeholder="Enter your career aspirations and goals (e.g., Software Engineer, Doctor, Teacher, etc.)"
                      className="w-full min-h-[80px] resize-none"
                      rows={3}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {userProfile?.academic_info?.aspirations ||
                        "Not provided - let's explore your potential!"}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {analysisFeatures.map((feature, index) => (
            <Card
              key={index}
              className="glass-effect hover:shadow-card hover:scale-105 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-muted/30 flex items-center justify-center ${feature.color}`}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <Card className="glass-effect mb-12 animate-slide-up">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-2">What You'll Discover</CardTitle>
            <CardDescription>Unlock insights that will shape your future</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center animate-slide-up">
          <Card className="glass-effect max-w-2xl mx-auto overflow-hidden">
            <CardContent className="p-8 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary opacity-5 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-primary opacity-5 rounded-full translate-y-12 -translate-x-12"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-primary rounded-2xl flex items-center justify-center">
                  <Play className="w-8 h-8 text-white" />
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold mb-4 font-space-grotesk">
                  Ready to Discover Your{" "}
                  <span className="gradient-text">Potential</span>?
                </h2>

                <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                  Take the first step towards understanding yourself better. Our AI
                  will analyze your responses and provide personalized insights to
                  guide your career journey.
                </p>

                {!isAnalyzing ? (
                  <Button
                    size="lg"
                    className="bg-gradient-primary hover:opacity-90 px-8 py-4 text-lg font-semibold"
                    onClick={handleAnalysisStart}
                  >
                    <Brain className="w-5 h-5 mr-2" />
                    Analyze & Start Quiz
                  </Button>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm text-muted-foreground">
                      Initializing your personalized analysis...
                    </p>
                  </div>
                )}

                <p className="text-xs text-muted-foreground mt-6">
                  Free assessment • No registration required • Instant results
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center animate-slide-up">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>10,000+ students analyzed</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>98% accuracy rate</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>Trusted by educators</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SmartAnalysis;