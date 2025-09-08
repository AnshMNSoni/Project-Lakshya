import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Sparkles, Target, Users, Zap, Heart, Award, BookOpen } from 'lucide-react';
import Footer from '@/components/layout/Footer';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

const About = () => {
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
              <Link to="/dashboard" className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-bold font-space-grotesk gradient-text">
                  Lakshya
                </span>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16 animate-slide-up">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold font-space-grotesk mb-4 sm:mb-6">
            About <span className="gradient-text">Lakshya</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Empowering Indian students to discover their true potential through AI-powered 
            career guidance and personalized educational pathways.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="glass-effect hover:shadow-card transition-all duration-300 animate-slide-up">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                To democratize quality career guidance and make it accessible to every Indian student, 
                regardless of their background. We believe every student deserves the opportunity to 
                discover their strengths and pursue their dreams with confidence.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="glass-effect hover:shadow-card transition-all duration-300 animate-slide-up">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                To create a future where every student in India has access to personalized, 
                data-driven career guidance that helps them make informed decisions about their 
                education and career paths, leading to a more skilled and fulfilled workforce.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 animate-slide-up">
            What Makes Lakshya Special
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-effect hover:shadow-card transition-all duration-300 text-center animate-slide-up">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <CardTitle>AI-Powered Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Advanced machine learning algorithms analyze your aptitude, interests, 
                  and personality to provide accurate career recommendations.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass-effect hover:shadow-card transition-all duration-300 text-center animate-slide-up">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-success rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Comprehensive Database</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Access information about thousands of government colleges, courses, 
                  and career paths across India, all in one platform.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass-effect hover:shadow-card transition-all duration-300 text-center animate-slide-up">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-warning to-warning-glow rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Student-Centric</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Designed specifically for Indian students, understanding local 
                  educational systems, cultural contexts, and career opportunities.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 mb-16 animate-slide-up">
          <h2 className="text-3xl font-bold text-center mb-8">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <div className="text-sm text-muted-foreground">Students Guided</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Colleges Listed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Career Paths</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-warning mb-2">95%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* Team Values */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-8 animate-slide-up">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-card/30 rounded-xl animate-slide-up">
              <Award className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Excellence</h3>
              <p className="text-sm text-muted-foreground">
                Committed to providing the highest quality guidance and resources.
              </p>
            </div>
            <div className="p-6 bg-card/30 rounded-xl animate-slide-up">
              <Users className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Accessibility</h3>
              <p className="text-sm text-muted-foreground">
                Making career guidance accessible to students from all backgrounds.
              </p>
            </div>
            <div className="p-6 bg-card/30 rounded-xl animate-slide-up">
              <Heart className="w-12 h-12 text-success mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Empathy</h3>
              <p className="text-sm text-muted-foreground">
                Understanding and addressing the unique challenges faced by Indian students.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center animate-slide-up">
          <h2 className="text-2xl font-bold mb-4">Ready to Discover Your Lakshya?</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of students who have already found their path to success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90">
                Get Started Today
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;