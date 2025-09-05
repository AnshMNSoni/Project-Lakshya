import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Sparkles, Brain, TrendingUp, Target, Zap, Play, CheckCircle } from 'lucide-react';
import Footer from '@/components/layout/Footer';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useToast } from '@/hooks/use-toast';

const SmartAnalysis = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();

  const analysisSteps = [
    { title: 'Aptitude Assessment', description: 'Evaluate logical reasoning and problem-solving skills', duration: '10 min' },
    { title: 'Interest Profiling', description: 'Identify your areas of interest and passion', duration: '8 min' },
    { title: 'Personality Analysis', description: 'Understand your work style and preferences', duration: '12 min' },
    { title: 'Skills Evaluation', description: 'Assess your current skills and potential', duration: '10 min' }
  ];

  const handleStartAnalysis = () => {
    setIsStarted(true);
    toast({
      title: "Analysis Started!",
      description: "Your comprehensive career analysis has begun. Take your time with each section.",
    });
  };

  const handleNext = () => {
    if (currentStep < analysisSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      toast({
        title: "Analysis Complete!",
        description: "Your results are being processed. You'll receive detailed insights shortly.",
      });
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
        {!isStarted ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12 sm:mb-16 animate-slide-up">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-primary rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold font-space-grotesk mb-4 sm:mb-6">
                Smart <span className="gradient-text">Analysis</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
                Discover your true potential with our AI-powered comprehensive analysis. 
                Get personalized insights about your aptitude, interests, and ideal career paths.
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <Card className="glass-effect hover:shadow-card transition-all duration-300 text-center animate-slide-up">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">AI-Powered</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Advanced algorithms analyze your responses to provide accurate insights.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="glass-effect hover:shadow-card transition-all duration-300 text-center animate-slide-up">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Personalized</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Tailored recommendations based on your unique profile and preferences.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="glass-effect hover:shadow-card transition-all duration-300 text-center animate-slide-up">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-success rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Fast & Accurate</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Get comprehensive results in under 40 minutes with 95% accuracy.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="glass-effect hover:shadow-card transition-all duration-300 text-center animate-slide-up">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-warning to-warning-glow rounded-xl flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Actionable</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Receive specific recommendations and next steps for your career.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            {/* Analysis Steps */}
            <Card className="glass-effect hover:shadow-card transition-all duration-300 mb-16 animate-slide-up">
              <CardHeader>
                <CardTitle className="text-2xl text-center">What's Included in Your Analysis</CardTitle>
                <CardDescription className="text-center">
                  A comprehensive 4-step assessment designed to understand you completely
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {analysisSteps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-card/30 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{step.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                          {step.duration}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="text-center animate-slide-up">
              <Card className="glass-effect max-w-2xl mx-auto">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Ready to Discover Your Potential?</h2>
                  <p className="text-muted-foreground mb-6">
                    Start your comprehensive analysis now and get personalized career recommendations 
                    tailored specifically for you.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      size="lg" 
                      className="bg-gradient-primary hover:opacity-90"
                      onClick={handleStartAnalysis}
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Start Analysis
                    </Button>
                    <Link to="/quiz">
                      <Button size="lg" variant="outline">
                        Take Quick Quiz Instead
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          /* Analysis Interface */
          <div className="max-w-4xl mx-auto">
            {/* Progress */}
            <Card className="glass-effect mb-8 animate-slide-up">
              <CardHeader>
                <div className="flex justify-between items-center mb-4">
                  <CardTitle>Analysis Progress</CardTitle>
                  <span className="text-sm text-muted-foreground">
                    Step {currentStep + 1} of {analysisSteps.length}
                  </span>
                </div>
                <Progress value={(currentStep + 1) / analysisSteps.length * 100} className="mb-2" />
                <CardDescription>
                  {analysisSteps[currentStep].title} - {analysisSteps[currentStep].description}
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Current Step */}
            <Card className="glass-effect mb-8 animate-slide-up">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center mr-3">
                    <span className="text-white font-bold">{currentStep + 1}</span>
                  </div>
                  {analysisSteps[currentStep].title}
                </CardTitle>
                <CardDescription>
                  {analysisSteps[currentStep].description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Mock Question Interface */}
                <div className="p-6 bg-card/30 rounded-xl">
                  <h3 className="font-semibold mb-4">Sample Question:</h3>
                  <p className="mb-6">
                    Which of the following activities do you find most engaging and energizing?
                  </p>
                  <div className="space-y-3">
                    {[
                      'Solving complex mathematical problems',
                      'Creating artistic designs or content',
                      'Leading team discussions and projects',
                      'Analyzing data and patterns'
                    ].map((option, index) => (
                      <Button 
                        key={index}
                        variant="outline" 
                        className="w-full justify-start text-left h-auto p-4"
                      >
                        <div className="w-6 h-6 border-2 border-primary rounded-full mr-3 flex-shrink-0" />
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" disabled={currentStep === 0}>
                    Previous
                  </Button>
                  <Button onClick={handleNext} className="bg-gradient-primary hover:opacity-90">
                    {currentStep < analysisSteps.length - 1 ? 'Next' : 'Complete Analysis'}
                    {currentStep === analysisSteps.length - 1 && <CheckCircle className="w-4 h-4 ml-2" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SmartAnalysis;