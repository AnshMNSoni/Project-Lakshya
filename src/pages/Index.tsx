import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, User, Brain, BookOpen, MapPin, Target, Users, TrendingUp, Award, ArrowRight, CheckCircle } from 'lucide-react';
import heroImage from '@/assets/hero-education.jpg';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <main className="relative overflow-hidden flex-1">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Lakshya - Smart Career Guidance Platform"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background/80 to-background/90" />
        </div>
        
        <div className="relative z-10 flex items-center justify-center min-h-[80vh] pt-16">
          <div className="text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 animate-slide-up">
            <div className="w-32 h-32 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-8 animate-glow">
              <Sparkles className="w-16 h-16 text-white" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-space-grotesk mb-6 leading-tight">
              Discover Your{' '}
              <span className="gradient-text">Lakshya</span>
              <br />
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-muted-foreground">with Smart AI Guidance</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed px-4">
              Unlock your potential with AI-powered career analysis, personalized college recommendations, 
              and smart guidance tailored for Indian students. Join thousands making informed education decisions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-20 px-4">
              <Link to="/sign-up" className="w-full sm:w-auto">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-6 h-auto w-full sm:w-auto">
                  Start Your Journey
                  <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/sign-in" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-6 h-auto glass-effect border-primary/20 w-full sm:w-auto">
                  I Have an Account
                </Button>
              </Link>
            </div>

            {/* Enhanced Robot Check */}
            <div className="flex items-center justify-center mb-12 px-4">
              <div className="glass-effect p-4 rounded-xl border border-primary/20 flex items-center space-x-3 bg-gradient-to-r from-primary/5 to-accent/5">
                <div className="w-6 h-6 border-2 border-primary rounded flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">I'm not a robot</span>
                <div className="text-xs text-muted-foreground bg-primary/10 px-2 py-1 rounded">
                  Verified by Lakshya AI
                </div>
              </div>
            </div>
            
            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">25K+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Students Guided</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-accent mb-2">1200+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Colleges Listed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-success mb-2">98%</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-warning mb-2">24/7</div>
                <div className="text-xs sm:text-sm text-muted-foreground">AI Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="relative z-10 py-20 bg-gradient-to-b from-transparent to-card/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-space-grotesk mb-4 px-4">
                Your Complete Career <span className="gradient-text">Guidance Journey</span>
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
                From AI-powered personality analysis to smart college recommendations - we guide you every step of the way
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 px-4">
              <div className="glass-effect p-6 sm:p-8 rounded-2xl text-center hover:shadow-glow transition-all duration-500 group">
                <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:animate-pulse">
                  <Brain className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Nature Analysis</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Advanced AI assessment analyzing your personality traits and natural abilities
                </p>
              </div>
              
              <div className="glass-effect p-6 sm:p-8 rounded-2xl text-center hover:shadow-accent-glow transition-all duration-500 group">
                <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:animate-pulse">
                  <BookOpen className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Career Assessment</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Smart quiz combining aptitude + interests for precise career matching
                </p>
              </div>
              
              <div className="glass-effect p-6 sm:p-8 rounded-2xl text-center hover:shadow-glow transition-all duration-500 group">
                <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-success rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:animate-pulse">
                  <Target className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Smart Recommendations</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Personalized college and stream suggestions based on your analysis
                </p>
              </div>

              <div className="glass-effect p-6 sm:p-8 rounded-2xl text-center hover:shadow-accent-glow transition-all duration-500 group">
                <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:animate-pulse">
                  <MapPin className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">College Explorer</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Interactive map showing nearby colleges with detailed information
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="relative z-10 py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-space-grotesk mb-6">
                  Why Students Choose <span className="gradient-text">Lakshya</span>
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground mb-8">
                  We combine advanced AI technology with deep understanding of the Indian education system 
                  to provide the most accurate and personalized career guidance.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-success" />
                    <span className="text-lg">AI-powered personality assessment</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-success" />
                    <span className="text-lg">Comprehensive college database</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-success" />
                    <span className="text-lg">Real-time career guidance</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-success" />
                    <span className="text-lg">Government college focus</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="glass-effect p-4 sm:p-6 rounded-xl text-center">
                  <Users className="w-8 sm:w-12 h-8 sm:h-12 text-primary mx-auto mb-2 sm:mb-4" />
                  <div className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">75,000+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Active Users</div>
                </div>
                <div className="glass-effect p-4 sm:p-6 rounded-xl text-center">
                  <TrendingUp className="w-8 sm:w-12 h-8 sm:h-12 text-accent mx-auto mb-2 sm:mb-4" />
                  <div className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">99%</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Accuracy Rate</div>
                </div>
                <div className="glass-effect p-4 sm:p-6 rounded-xl text-center">
                  <Award className="w-8 sm:w-12 h-8 sm:h-12 text-success mx-auto mb-2 sm:mb-4" />
                  <div className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">30+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Career Fields</div>
                </div>
                <div className="glass-effect p-4 sm:p-6 rounded-xl text-center">
                  <MapPin className="w-8 sm:w-12 h-8 sm:h-12 text-warning mx-auto mb-2 sm:mb-4" />
                  <div className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">1500+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Colleges Listed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative z-10 py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-space-grotesk mb-6 px-4">
              Ready to Discover Your <span className="gradient-text">Perfect Lakshya?</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto px-4">
              Join thousands of students who have found their ideal career direction with Lakshya's smart AI-powered guidance.
            </p>
            <Link to="/sign-up">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-lg px-12 py-6 h-auto animate-pulse-glow">
                Start Free Analysis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
