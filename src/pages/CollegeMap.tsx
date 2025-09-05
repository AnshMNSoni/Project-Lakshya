import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MapPin, Navigation, Search, Filter, Globe, Bot } from 'lucide-react';

const CollegeMap = () => {
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
              <div className="w-8 h-8 bg-gradient-to-br from-success to-success-glow rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold font-space-grotesk">College Explorer Map</h1>
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
              <Globe className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold font-space-grotesk mb-4">
              Interactive College Map
              <span className="block text-lg text-muted-foreground font-normal mt-2">
                Explore government colleges near you with advanced mapping
              </span>
            </h2>
          </div>

          {/* Coming Soon Card */}
          <Card className="glass-effect shadow-elevated animate-slide-up relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-success/5 via-primary/5 to-accent/5" />
            <CardHeader className="relative z-10 text-center pb-8">
              <div className="w-16 h-16 bg-gradient-success rounded-2xl flex items-center justify-center mx-auto mb-4 animate-glow">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-space-grotesk">
                Advanced Map Integration
              </CardTitle>
              <CardDescription className="text-base">
                Interactive mapping system with real-time college data and navigation features
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 space-y-8">
              {/* Map Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Navigation className="w-5 h-5 text-success" />
                    <span>Interactive Features</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-card/30 rounded-lg">
                      <span className="text-sm">Real-time Navigation</span>
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-card/30 rounded-lg">
                      <span className="text-sm">Distance Calculations</span>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-card/30 rounded-lg">
                      <span className="text-sm">Zoom & Pan Controls</span>
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-card/30 rounded-lg">
                      <span className="text-sm">Satellite View</span>
                      <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Search className="w-5 h-5 text-accent" />
                    <span>Smart Search & Filters</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-card/30 rounded-lg">
                      <span className="text-sm">Course-based Filtering</span>
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-card/30 rounded-lg">
                      <span className="text-sm">Distance Range</span>
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-card/30 rounded-lg">
                      <span className="text-sm">Admission Status</span>
                      <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-card/30 rounded-lg">
                      <span className="text-sm">Facility Types</span>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Preview Placeholder */}
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-success/10 via-primary/10 to-accent/10 rounded-xl border-2 border-dashed border-success/20 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Globe className="w-16 h-16 text-success mx-auto animate-float" />
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold font-space-grotesk">Interactive Map Preview</h4>
                      <p className="text-muted-foreground">
                        Fully interactive map with college locations, detailed information popups, and navigation features
                      </p>
                    </div>
                    
                    {/* Mock Map Elements */}
                    <div className="grid grid-cols-3 gap-4 mt-6 max-w-md mx-auto">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs text-muted-foreground">College Markers</span>
                      </div>
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <Navigation className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs text-muted-foreground">Navigation</span>
                      </div>
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                          <Filter className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs text-muted-foreground">Smart Filters</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-card/30 rounded-lg">
                  <div className="text-2xl font-bold text-success">500+</div>
                  <div className="text-sm text-muted-foreground">Mapped Colleges</div>
                </div>
                <div className="text-center p-4 bg-card/30 rounded-lg">
                  <div className="text-2xl font-bold text-accent">28</div>
                  <div className="text-sm text-muted-foreground">States</div>
                </div>
                <div className="text-center p-4 bg-card/30 rounded-lg">
                  <div className="text-2xl font-bold text-warning">Real-time</div>
                  <div className="text-sm text-muted-foreground">Updates</div>
                </div>
                <div className="text-center p-4 bg-card/30 rounded-lg">
                  <div className="text-2xl font-bold text-primary">GPS</div>
                  <div className="text-sm text-muted-foreground">Navigation</div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center p-8 bg-gradient-to-br from-success/5 via-primary/5 to-accent/5 rounded-xl border border-success/10">
                <MapPin className="w-12 h-12 text-success mx-auto mb-4 animate-float" />
                <h3 className="text-xl font-bold font-space-grotesk mb-2">Explore Colleges Visually</h3>
                <p className="text-muted-foreground mb-4">
                  Interactive map experience coming soon with advanced filtering and navigation capabilities
                </p>
                <Button className="bg-gradient-success hover:opacity-90">
                  Get Notified When Ready
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up">
            <Card className="glass-effect shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Navigation className="w-5 h-5 text-success" />
                  <span>Navigation Features</span>
                </CardTitle>
                <CardDescription>
                  Advanced mapping and navigation capabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-card/20 rounded-lg">
                    <span className="text-sm">Turn-by-turn directions</span>
                    <Navigation className="w-4 h-4 text-success" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-card/20 rounded-lg">
                    <span className="text-sm">Public transport info</span>
                    <Navigation className="w-4 h-4 text-success" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-card/20 rounded-lg">
                    <span className="text-sm">Travel time estimates</span>
                    <Navigation className="w-4 h-4 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-accent" />
                  <span>Smart Filtering</span>
                </CardTitle>
                <CardDescription>
                  Find exactly what you're looking for
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-card/20 rounded-lg">
                    <span className="text-sm">Course availability</span>
                    <Filter className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-card/20 rounded-lg">
                    <span className="text-sm">Admission deadlines</span>
                    <Filter className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-card/20 rounded-lg">
                    <span className="text-sm">Facility preferences</span>
                    <Filter className="w-4 h-4 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CollegeMap;