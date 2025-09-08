import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, GraduationCap, Clock, Star, TrendingUp, MapPin, Users, Bot } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const CollegeRecommendations = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar isAuthenticated={true} />
      
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Back Button */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="hover:bg-card/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          {/* Hero Section */}
          <div className="text-center animate-slide-up">
            <div className="w-24 h-24 bg-gradient-to-br from-warning to-warning-glow rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <GraduationCap className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold font-space-grotesk mb-4">
              Smart College Recommendations
              <span className="block text-lg text-muted-foreground font-normal mt-2">
                AI-powered matching based on your profile and preferences
              </span>
            </h2>
          </div>

          {/* Coming Soon Card */}
          <Card className="glass-effect shadow-elevated animate-slide-up relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-warning/5 via-primary/5 to-accent/5" />
            <CardHeader className="relative z-10 text-center pb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-warning to-warning-glow rounded-2xl flex items-center justify-center mx-auto mb-4 animate-glow">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-space-grotesk">
                Intelligent College Matching System
              </CardTitle>
              <CardDescription className="text-base">
                Advanced algorithms to match you with the perfect government colleges based on your career analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 space-y-8">
              {/* Feature Preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-warning" />
                    <span>Smart Matching Criteria</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-card/30 rounded-lg">
                      <span className="text-sm">Career Goals Alignment</span>
                      <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-card/30 rounded-lg">
                      <span className="text-sm">Academic Performance</span>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-card/30 rounded-lg">
                      <span className="text-sm">Location Preferences</span>
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-card/30 rounded-lg">
                      <span className="text-sm">Admission Requirements</span>
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Star className="w-5 h-5 text-accent" />
                    <span>College Information</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-card/30 rounded-lg">
                      <span className="text-sm">Course Availability</span>
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-card/30 rounded-lg">
                      <span className="text-sm">Admission Process</span>
                      <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-card/30 rounded-lg">
                      <span className="text-sm">Scholarship Options</span>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-card/30 rounded-lg">
                      <span className="text-sm">Infrastructure Details</span>
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>

              {/* College Database Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-card/30 rounded-lg">
                  <div className="text-2xl font-bold text-warning">500+</div>
                  <div className="text-sm text-muted-foreground">Government Colleges</div>
                </div>
                <div className="text-center p-4 bg-card/30 rounded-lg">
                  <div className="text-2xl font-bold text-accent">100+</div>
                  <div className="text-sm text-muted-foreground">Degree Programs</div>
                </div>
                <div className="text-center p-4 bg-card/30 rounded-lg">
                  <div className="text-2xl font-bold text-success">28</div>
                  <div className="text-sm text-muted-foreground">States Covered</div>
                </div>
                <div className="text-center p-4 bg-card/30 rounded-lg">
                  <div className="text-2xl font-bold text-primary">AI</div>
                  <div className="text-sm text-muted-foreground">Powered</div>
                </div>
              </div>

              {/* Development Progress */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Development Status</span>
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-success/10 to-success/5 rounded-lg border border-success/20">
                    <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">✓</span>
                    </div>
                    <div>
                      <div className="font-medium">College Database Collection</div>
                      <div className="text-sm text-muted-foreground">Comprehensive data from 500+ government institutions</div>
                    </div>
                    <span className="text-xs bg-success/20 text-success px-2 py-1 rounded ml-auto">Complete</span>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-warning/10 to-warning/5 rounded-lg border border-warning/20">
                    <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">⚡</span>
                    </div>
                    <div>
                      <div className="font-medium">Recommendation Engine</div>
                      <div className="text-sm text-muted-foreground">ML algorithms for intelligent college-student matching</div>
                    </div>
                    <span className="text-xs bg-warning/20 text-warning px-2 py-1 rounded ml-auto">In Progress</span>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-muted/10 to-muted/5 rounded-lg border border-muted/20">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-xs text-muted-foreground font-bold">3</span>
                    </div>
                    <div>
                      <div className="font-medium">Map Integration & UI</div>
                      <div className="text-sm text-muted-foreground">Interactive map view and user interface development</div>
                    </div>
                    <span className="text-xs bg-muted/20 text-muted-foreground px-2 py-1 rounded ml-auto">Planned</span>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center p-8 bg-gradient-to-br from-warning/5 via-primary/5 to-accent/5 rounded-xl border border-warning/10">
                <MapPin className="w-12 h-12 text-warning mx-auto mb-4 animate-float" />
                <h3 className="text-xl font-bold font-space-grotesk mb-2">Personalized College Discovery</h3>
                <p className="text-muted-foreground mb-4">
                  Get matched with government colleges that align perfectly with your career goals and preferences
                </p>
                <Button className="bg-gradient-to-r from-warning to-warning-glow hover:opacity-90">
                  Notify When Ready
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Features Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up">
            <Card className="glass-effect shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-warning" />
                  <span>Location-Based Search</span>
                </CardTitle>
                <CardDescription>
                  Find colleges in your preferred locations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-card/20 rounded-lg">
                    <span className="text-sm">State-wise filtering</span>
                    <Star className="w-4 h-4 text-warning" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-card/20 rounded-lg">
                    <span className="text-sm">Distance calculations</span>
                    <Star className="w-4 h-4 text-warning" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-card/20 rounded-lg">
                    <span className="text-sm">Transport connectivity</span>
                    <Star className="w-4 h-4 text-warning" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-accent" />
                  <span>Detailed Profiles</span>
                </CardTitle>
                <CardDescription>
                  Comprehensive college information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-card/20 rounded-lg">
                    <span className="text-sm">Faculty information</span>
                    <Star className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-card/20 rounded-lg">
                    <span className="text-sm">Infrastructure details</span>
                    <Star className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-card/20 rounded-lg">
                    <span className="text-sm">Alumni networks</span>
                    <Star className="w-4 h-4 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* What You'll Get */}
          <Card className="glass-effect shadow-card animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                <span>What You'll Discover</span>
              </CardTitle>
              <CardDescription>
                Comprehensive insights for informed decision-making
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold">Perfect Matches</h4>
                  <p className="text-sm text-muted-foreground">
                    Colleges that align with your career goals, interests, and academic performance
                  </p>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mx-auto">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold">Location Insights</h4>
                  <p className="text-sm text-muted-foreground">
                    Detailed information about college locations, accessibility, and nearby amenities
                  </p>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-gradient-success rounded-xl flex items-center justify-center mx-auto">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold">Admission Guidance</h4>
                  <p className="text-sm text-muted-foreground">
                    Step-by-step admission process, requirements, and important deadlines
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

export default CollegeRecommendations;