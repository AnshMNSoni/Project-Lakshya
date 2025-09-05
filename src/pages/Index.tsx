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
            alt="EduGuide - Smart Career Guidance Platform"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background/80 to-background/90" />
        </div>
        
        <div className="relative z-10 flex items-center justify-center min-h-[80vh] pt-16">
          <div className="text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 animate-slide-up">
            <div className="w-32 h-32 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-8 animate-glow">
              <Sparkles className="w-16 h-16 text-white" />
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold font-space-grotesk mb-6 leading-tight">
              Shape Your{' '}
              <span className="gradient-text">Future</span>
              <br />
              <span className="text-4xl md:text-5xl text-muted-foreground">with AI Guidance</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
              Discover your perfect career path through AI-powered analysis, personalized recommendations, 
              and comprehensive college guidance. Join thousands of students making informed education decisions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
              <Link to="/sign-up">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-lg px-12 py-6 h-auto">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/sign-in">
                <Button size="lg" variant="outline" className="text-lg px-12 py-6 h-auto glass-effect border-primary/20">
                  I Have an Account
                </Button>
              </Link>
            </div>
            
            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                <div className="text-sm text-muted-foreground">Students Guided</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Colleges Listed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warning mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">AI Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="relative z-10 py-20 bg-gradient-to-b from-transparent to-card/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold font-space-grotesk mb-4">
                Your Complete Career <span className="gradient-text">Guidance Journey</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                From personality analysis to college selection, we guide you every step of the way
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="glass-effect p-8 rounded-2xl text-center hover:shadow-glow transition-all duration-500 group">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Smart Analysis</h3>
                <p className="text-muted-foreground leading-relaxed">
                  AI-powered personality and aptitude assessment to understand your strengths
                </p>
              </div>
              
              <div className="glass-effect p-8 rounded-2xl text-center hover:shadow-accent-glow transition-all duration-500 group">
                <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Career Quiz</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Interactive questionnaire combining interests with real career opportunities
                </p>
              </div>
              
              <div className="glass-effect p-8 rounded-2xl text-center hover:shadow-glow transition-all duration-500 group">
                <div className="w-16 h-16 bg-gradient-success rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Recommendations</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Personalized course and career recommendations based on your profile
                </p>
              </div>

              <div className="glass-effect p-8 rounded-2xl text-center hover:shadow-accent-glow transition-all duration-500 group">
                <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">College Explorer</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Discover nearby government colleges with detailed information and reviews
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="relative z-10 py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold font-space-grotesk mb-6">
                  Why Students Choose <span className="gradient-text">EduGuide</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  We combine cutting-edge AI technology with deep understanding of the Indian education system 
                  to provide the most accurate and helpful career guidance.
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

              <div className="grid grid-cols-2 gap-6">
                <div className="glass-effect p-6 rounded-xl text-center">
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <div className="text-2xl font-bold mb-2">50,000+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div className="glass-effect p-6 rounded-xl text-center">
                  <TrendingUp className="w-12 h-12 text-accent mx-auto mb-4" />
                  <div className="text-2xl font-bold mb-2">98%</div>
                  <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                </div>
                <div className="glass-effect p-6 rounded-xl text-center">
                  <Award className="w-12 h-12 text-success mx-auto mb-4" />
                  <div className="text-2xl font-bold mb-2">25+</div>
                  <div className="text-sm text-muted-foreground">Career Fields</div>
                </div>
                <div className="glass-effect p-6 rounded-xl text-center">
                  <MapPin className="w-12 h-12 text-warning mx-auto mb-4" />
                  <div className="text-2xl font-bold mb-2">1000+</div>
                  <div className="text-sm text-muted-foreground">Colleges Listed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative z-10 py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold font-space-grotesk mb-6">
              Ready to Discover Your <span className="gradient-text">Perfect Career Path?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of students who have found their ideal career direction with EduGuide's AI-powered guidance.
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
