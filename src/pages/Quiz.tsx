import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, BookOpen, Clock, CheckCircle, Play, MapPin, Sparkles } from 'lucide-react';
import Footer from '@/components/layout/Footer';
import { useToast } from '@/hooks/use-toast';

const Quiz = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isStarted, setIsStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);

  const quizSteps = [
    { title: 'Personality Analysis', description: 'Understand your work style and preferences', duration: '12 min' },
    { title: 'Physical Appearance Analysis', description: 'Assess your physical traits and characteristics', duration: '15 min' },
  ];

  const personalityQuestions = {
    Extraversion: [
      'I enjoy being the center of attention.',
      'I feel energized when I spend time with many people.',
      'I like to start conversations.',
    ],
    Neuroticism: [
      'I often feel anxious or tense.',
      'I get upset easily.',
      'I worry about many different things.',
    ],
    Agreeableness: [
      'I sympathize with others’ feelings.',
      'I am interested in other people’s problems.',
      'I take time out for others.',
    ],
    Conscientiousness: [
      'I like to plan everything in detail.',
      'I follow through on commitments.',
      'I pay attention to details.',
    ],
    Openness: [
      'I enjoy trying new activities.',
      'I like to think about abstract ideas.',
      'I have a vivid imagination.',
    ],
  };

  const physicalAppearanceQuestions = [
    'My body frame is Thin and Lean.',
    'My body frame is Medium.',
    'My body frame is Well Built.',
    'My hair is Dry and with Split Ends.',
    'My hair is Normal, Thin, More Hair Fall.',
    'My hair is Greasy, Heavy.',
    'My hair color is Pale Brown.',
    'My hair color is Red or Brown.',
    'My hair color is Jet Black.',
    'My skin is Dry, Rough.',
    'My skin is Soft, More Sweating, Acne.',
    'My skin is Moist, Greasy.',
    'My complexion is Dark, Blackish.',
    'My complexion is Pink to Red.',
    'My complexion is Glowing, White.',
    'My body weight is Low, Difficult to Put on Weight.',
    'My body weight is Medium, Can Easily Lose or Gain Weight.',
    'My body weight is Overweight, Difficult to Lose Weight.',
    'My nails are Blackish, Small, Brittle.',
    'My nails are Reddish, Small.',
    'My nails are Pinkish, Big, Smooth.',
    'My teeth are Very Big or Very Small, Irregular, Blackish.',
    'My teeth are Medium Sized, Yellowish.',
    'My teeth are Large, Shining White.',
    'My pace of performing work is Fast, Always in Hurry.',
    'My pace of performing work is Medium, Energetic.',
    'My pace of performing work is Slow, Steady.',
    'My mental activity is Quick, Restless.',
    'My mental activity is Smart Intellect, Aggressive.',
    'My mental activity is Calm, Stable.',
  ];

  const responseOptions = [
    'Disagree',
    'Slightly Disagree',
    'Neutral',
    'Slightly Agree',
    'Agree',
  ];

  // Generate questions for all steps
  const getQuestionsForStep = () => {
    const allQuestions = [
      ...Object.entries(personalityQuestions).flatMap(([trait, questions]) =>
        questions.map((q, index) => ({
          id: `${trait}-${index}`,
          text: q,
          trait,
          step: 0, // Personality Analysis step
        }))
      ),
      ...physicalAppearanceQuestions.map((q, index) => ({
        id: `Physical-${index}`,
        text: q,
        category: 'PhysicalAppearance',
        step: 1, // Physical Appearance Analysis step
      })),
    ];
    return allQuestions;
  };

  // Update questions based on current step
  useEffect(() => {
    const stepQuestions = getQuestionsForStep().filter(q => q.step === currentStep);
    setQuestions(stepQuestions);
    setCurrentQuestionIndex(0); // Reset index when step changes
  }, [currentStep]);

  const handleStartQuiz = () => {
    setIsStarted(true);
    toast({
      title: "Quiz Started!",
      description: "Your career assessment quiz has begun. Take your time with each section.",
    });
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));

    // Move to next question within the current step
    const currentStepQuestions = questions.length;
    if (currentQuestionIndex < currentStepQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentStep < quizSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleCompleteQuiz = () => {
    toast({
      title: "Quiz Complete!",
      description: "Great job! Your results are being processed for personalized recommendations.",
    });
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      const prevStepQuestions = getQuestionsForStep().filter(q => q.step === currentStep - 1);
      setQuestions(prevStepQuestions);
      setCurrentQuestionIndex(prevStepQuestions.length - 1);
    }
  };

  // Determine if the Previous button should be disabled
  const isPreviousDisabled = () => {
    return currentStep === 0 && currentQuestionIndex === 0;
  };

  // Calculate progress based on total questions across all steps
  const totalQuestions = getQuestionsForStep().length;
  const currentQuestionNumber = getQuestionsForStep()
    .slice(0, currentStep * questions.length + currentQuestionIndex + 1)
    .length;
  const progress = (currentQuestionNumber / totalQuestions) * 100;

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
              <div className="w-8 h-8 bg-gradient-success rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold font-space-grotesk">Career Assessment Quiz</h1>
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
              <BookOpen className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold font-space-grotesk mb-4">
              Interactive Career Assessment
              <span className="block text-lg text-muted-foreground font-normal mt-2">
                This assessment consists of 2 phases: Personality Analysis and Physical Appearance Analysis, powered by machine learning
              </span>
            </h2>
          </div>

          {/* Quiz Overview */}
          <Card className="glass-effect shadow-elevated animate-slide-up relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-success/5 via-primary/5 to-accent/5" />
            <CardHeader className="relative z-10">
              <CardTitle className="text-2xl font-space-grotesk text-center">
                Comprehensive Assessment Suite (2 Phases)
              </CardTitle>
              <CardDescription className="text-center text-base">
                This evaluation consists of 2 phases: Personality Analysis and Physical Appearance Analysis to discover your ideal career path
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 space-y-8">
              {/* Quiz Sections */}
              <div className="grid grid-cols-1 gap-6">
                <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
                  <CardHeader className="pb-3">
                    <div className="w-10 h-10 bg-gradient-success rounded-lg flex items-center justify-center mb-2">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-lg">Personality Traits</CardTitle>
                    <CardDescription>Explore your work style preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-success rounded-full" />
                        <span>Communication style</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-success rounded-full" />
                        <span>Leadership qualities</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-success rounded-full" />
                        <span>Team dynamics</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-success rounded-full" />
                        <span>Problem-solving approach</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
                  <CardHeader className="pb-3">
                    <div className="w-10 h-10 bg-gradient-success rounded-lg flex items-center justify-center mb-2">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-lg">Physical Appearance</CardTitle>
                    <CardDescription>Evaluate your physical characteristics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-success rounded-full" />
                        <span>Body frame and weight</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-success rounded-full" />
                        <span>Hair and skin type</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-success rounded-full" />
                        <span>Physical activity levels</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quiz Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-card/30 rounded-lg">
                  <div className="text-2xl font-bold text-primary">45</div>
                  <div className="text-sm text-muted-foreground">Total Questions</div>
                </div>
                <div className="text-center p-4 bg-card/30 rounded-lg">
                  <div className="text-2xl font-bold text-accent">27</div>
                  <div className="text-sm text-muted-foreground">Minutes</div>
                </div>
                <div className="text-center p-4 bg-card/30 rounded-lg">
                  <div className="text-2xl font-bold text-success">15+</div>
                  <div className="text-sm text-muted-foreground">Career Paths</div>
                </div>
                <div className="text-center p-4 bg-card/30 rounded-lg">
                  <div className="text-2xl font-bold text-warning">AI</div>
                  <div className="text-sm text-muted-foreground">Powered</div>
                </div>
              </div>

              {/* Quiz Interface */}
              {!isStarted ? (
                <div className="text-center p-8 bg-gradient-to-br from-primary/5 via-accent/5 to-success/5 rounded-xl border border-primary/10">
                  <Play className="w-12 h-12 text-primary mx-auto mb-4 animate-float" />
                  <h3 className="text-xl font-bold font-space-grotesk mb-2">Ready to Start Your Quiz?</h3>
                  <p className="text-muted-foreground mb-6">
                    Begin the interactive career assessment to discover your ideal career path with personalized recommendations.
                  </p>
                  <Button
                    className="bg-gradient-success hover:opacity-90"
                    onClick={handleStartQuiz}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Quiz
                  </Button>
                  <div className="mt-4">
                    <Link to="/college-map">
                      <Button variant="outline" className="w-full">
                        <MapPin className="w-4 h-4 mr-2" />
                        Explore Colleges Instead
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Progress */}
                  <Card className="glass-effect mb-8 animate-slide-up">
                    <CardHeader>
                      <div className="flex justify-between items-center mb-4">
                        <CardTitle>Quiz Progress</CardTitle>
                        <span className="text-sm text-muted-foreground">
                          Step {currentStep + 1} of {quizSteps.length}
                        </span>
                      </div>
                      <Progress value={progress} className="mb-2" />
                      <CardDescription>
                        {quizSteps[currentStep].title} - {quizSteps[currentStep].description}
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
                        {quizSteps[currentStep].title}
                      </CardTitle>
                      <CardDescription>
                        {quizSteps[currentStep].description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Question Interface */}
                      <div className="p-6 bg-card/30 rounded-xl">
                        <h3 className="font-semibold mb-4">Question {currentQuestionIndex + 1} of {questions.length}:</h3>
                        <p className="mb-4">{questions[currentQuestionIndex].text}</p>
                        <div className="space-y-3">
                          {responseOptions.map((option) => (
                            <Button
                              key={option}
                              variant={answers[questions[currentQuestionIndex].id] === option ? 'default' : 'outline'}
                              className={`w-full h-auto py-2 px-4 text-left ${answers[questions[currentQuestionIndex].id] === option ? 'bg-gradient-primary' : ''}`}
                              onClick={() => handleAnswer(questions[currentQuestionIndex].id, option)}
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button
                          variant="outline"
                          disabled={isPreviousDisabled()}
                          onClick={handlePrevious}
                        >
                          Previous
                        </Button>
                        {currentStep === quizSteps.length - 1 && currentQuestionIndex === questions.length - 1 && (
                          <Button
                            onClick={handleCompleteQuiz}
                            className="bg-gradient-primary hover:opacity-90"
                            disabled={!answers[questions[currentQuestionIndex].id]}
                          >
                            Complete Quiz
                            <CheckCircle className="w-4 h-4 ml-2" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card className="glass-effect shadow-card animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-success" />
                <span>How the Assessment Works</span>
              </CardTitle>
              <CardDescription>
                Scientifically designed evaluation process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h4 className="font-semibold">Answer Questions</h4>
                    <p className="text-sm text-muted-foreground">
                      Complete a series of carefully crafted questions across multiple dimensions
                    </p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mx-auto">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h4 className="font-semibold">AI Analysis</h4>
                    <p className="text-sm text-muted-foreground">
                      Advanced algorithms analyze your responses to identify patterns and preferences
                    </p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-gradient-success rounded-xl flex items-center justify-center mx-auto">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h4 className="font-semibold">Get Results</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive detailed insights about your strengths, interests, and personality
                    </p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-warning to-warning-glow rounded-xl flex items-center justify-center mx-auto">
                      <span className="text-white font-bold">4</span>
                    </div>
                    <h4 className="font-semibold">Career Matches</h4>
                    <p className="text-sm text-muted-foreground">
                      Get personalized career recommendations with education pathways
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-primary/5 via-accent/5 to-success/5 rounded-xl border border-primary/10">
                  <h4 className="font-semibold mb-3">What Makes Our Assessment Special</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>Research-based question design</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>Machine learning powered analysis</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>Personalized career matching</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>Regular updates and improvements</span>
                    </div>
                  </div>
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

export default Quiz;