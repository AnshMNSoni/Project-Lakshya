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
    { title: 'Personality Analysis', description: 'Understand your work style and preferences', subTitle: '', duration: '12 min' },
    { title: 'Physical Appearance Analysis', description: 'Assess your physical traits and characteristics', subTitle: '', duration: '15 min' },
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
    {
      id: 'Physical-0',
      text: 'Body Frame',
      options: ['Thin and Lean', 'Medium', 'Well Built'],
    },
    {
      id: 'Physical-1',
      text: 'Type of Hair',
      options: ['Dry and with Split Ends', 'Normal, Thin, More Hair Fall', 'Greasy, Heavy'],
    },
    {
      id: 'Physical-2',
      text: 'Color of Hair',
      options: ['Pale Brown', 'Red or Brown', 'Jet Black'],
    },
    {
      id: 'Physical-3',
      text: 'Skin',
      options: ['Dry, Rough', 'Soft, More Sweating, Acne', 'Moist, Greasy'],
    },
    {
      id: 'Physical-4',
      text: 'Complexion',
      options: ['Dark, Blackish', 'Pink to Red', 'Glowing, White'],
    },
    {
      id: 'Physical-5',
      text: 'Body Weight',
      options: ['Low, Difficult to Put on Weight', 'Medium, Can Easily Lose or Gain Weight', 'Overweight, Difficult to Lose Weight'],
    },
    {
      id: 'Physical-6',
      text: 'Nails',
      options: ['Blackish, Small, Brittle', 'Reddish, Small', 'Pinkish, Big, Smooth'],
    },
    {
      id: 'Physical-7',
      text: 'Size and Color of the Teeth',
      options: ['Very Big or Very Small, Irregular, Blackish', 'Medium Sized, Yellowish', 'Large, Shining White'],
    },
    {
      id: 'Physical-8',
      text: 'Pace of Performing Work',
      options: ['Fast, Always in Hurry', 'Medium, Energetic', 'Slow, Steady'],
    },
    {
      id: 'Physical-9',
      text: 'Mental Activity',
      options: ['Quick, Restless', 'Smart Intellect, Aggressive', 'Calm, Stable'],
    },
    {
      id: 'Physical-10',
      text: 'Memory',
      options: ['Short Term Bad', 'Good Memory', 'Long Term is Best'],
    },
    {
      id: 'Physical-11',
      text: 'Grasping Power',
      options: ['Grasps Quickly but not Completely and Forgets Quickly', 'Grasps Quickly but Completely and have Good Memory', 'Grasps Late and Retains for Longer Time'],
    },
    {
      id: 'Physical-12',
      text: 'Sleep Pattern',
      options: ['Interrupted, Less', 'Moderate', 'Sleepy, Lazy'],
    },
    {
      id: 'Physical-13',
      text: 'Intolerance to Weather Conditions',
      options: ['Aversion to Cold', 'Aversion to Heat', 'Aversion to Moist, Rainy and Cool Weather'],
    },
    {
      id: 'Physical-14',
      text: 'Reactions Under Adverse Situation',
      options: ['Anxiety, Worry, Irritability', 'Anger, Aggression', 'Calm, Reclusive, Sometimes Depressive'],
    },
    {
      id: 'Physical-15',
      text: 'Mood',
      options: ['Changes Quickly have Frequent Mood Swings', 'Changes Slowly', 'Stable Constant'],
    },
    {
      id: 'Physical-16',
      text: 'Eating Habit',
      options: ['Eats Quickly Without Chewing Properly', 'Eats at a Moderate Speed', 'Chews Food Properly'],
    },
    {
      id: 'Physical-17',
      text: 'Hunger',
      options: ['Irregular, Any Time', 'Sudden Hunger Pangs, Sharp Hunger', 'Can Skip any Meal Easily'],
    },
    {
      id: 'Physical-18',
      text: 'Body Temperature',
      options: ['Less than Normal, Hands and Feet are Cold', 'More than Normal, Face and Forehead Hot', 'Normal, Hands and Feet Slightly Cold'],
    },
    {
      id: 'Physical-19',
      text: 'Joints',
      options: ['Weak, Noise on Movement', 'Healthy with Optimal Strength', 'Heavy Weight Bearing'],
    },
    {
      id: 'Physical-20',
      text: 'Nature',
      options: ['Timid, Jealous', 'Egoistic, Fearless', 'Forgiving, Grateful, Not Greedy'],
    },
    {
      id: 'Physical-21',
      text: 'Body Energy',
      options: ['Becomes Low in Evening, Fatigues After Less Work', 'Moderate, Gets Tired After Medium Work', 'Excellent Energy Throughout Day Not Easily Fatigued'],
    },
    {
      id: 'Physical-22',
      text: 'Eyeball',
      options: ['Unsteady, Fast Moving', 'Moving Slowly', 'Steady'],
    },
    {
      id: 'Physical-23',
      text: 'Quality of Voice',
      options: ['Rough with Broken Words', 'Fast, Commanding', 'Soft and Deep'],
    },
    {
      id: 'Physical-24',
      text: 'Dreams',
      options: ['Sky, Wind, Flying, Objects and Confusion', 'Fire, Light, Bright Colors, Violence', 'Water Pools, Gardens and Good Relationships'],
    },
    {
      id: 'Physical-25',
      text: 'Social Relations',
      options: ['Make Less Friends Prefers Solitude', 'Good No. of Friends', 'Love to Socialize. Relationships are Longer Lasting'],
    },
    {
      id: 'Physical-26',
      text: 'Wealth',
      options: ['Spends Without Thinking Much', 'Saves but Spends on Valuable Things', 'Prefers More Savings'],
    },
    {
      id: 'Physical-27',
      text: 'Bowel Movements',
      options: ['Dry, Hard, Blackish, Scanty Stools', 'Soft, Yellowish, Loose Stools', 'Heavy, Thick, Sticky Stools'],
    },
    {
      id: 'Physical-28',
      text: 'Walking Pace',
      options: ['Quick, Fast With Long Steps', 'Average, Steady', 'Slow with Short Steps'],
    },
    {
      id: 'Physical-29',
      text: 'Communication Skills',
      options: ['Fast, Irrelevant Talk, Speech not Clear', 'Good Speakers with Genuine Argumentative Skills', 'Authoritative, Firm and Little Speech'],
    },
  ];

  const personalityResponseOptions = [
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
          options: personalityResponseOptions,
        }))
      ),
      ...physicalAppearanceQuestions.map((q) => ({
        ...q,
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
                <h1 className="text-lg font-bold font-space-grotesk sm:text-xl">Career Assessment Quiz</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
        <div className="space-y-4 sm:space-y-6">
          {/* Hero Section */}
          <div className="text-center animate-slide-up">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-pulse-glow">
              <BookOpen className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-space-grotesk mb-2 sm:mb-4">
              Interactive Career Assessment
              <span className="block text-base sm:text-lg text-muted-foreground font-normal mt-1 sm:mt-2">
                This assessment consists of 2 phases: Personality Analysis and Physical Appearance Analysis, powered by machine learning
              </span>
            </h2>
          </div>

          {/* Quiz Overview */}
          <Card className="glass-effect shadow-elevated animate-slide-up relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-success/5 via-primary/5 to-accent/5" />
            <CardHeader className="relative z-10 p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl font-space-grotesk text-center">
                Comprehensive Assessment Suite (2 Phases)
              </CardTitle>
              <CardDescription className="text-center text-sm sm:text-base">
                This evaluation consists of 2 phases: Personality Analysis and Physical Appearance Analysis to discover your ideal career path
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 p-4 sm:p-6 space-y-4 sm:space-y-8">
              {/* Quiz Sections */}
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
                  <CardHeader className="pb-2 sm:pb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-success rounded-lg flex items-center justify-center mb-2 sm:mb-2">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <CardTitle className="text-base sm:text-lg">Personality Analysis</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Explore your work style preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="p-2 sm:p-4">
                    <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <div className="w-1.5 h-1.5 sm:w-1.5 sm:h-1.5 bg-success rounded-full" />
                        <span>Communication style</span>
                      </div>
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <div className="w-1.5 h-1.5 sm:w-1.5 sm:h-1.5 bg-success rounded-full" />
                        <span>Leadership qualities</span>
                      </div>
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <div className="w-1.5 h-1.5 sm:w-1.5 sm:h-1.5 bg-success rounded-full" />
                        <span>Team dynamics</span>
                      </div>
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <div className="w-1.5 h-1.5 sm:w-1.5 sm:h-1.5 bg-success rounded-full" />
                        <span>Problem-solving approach</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
                  <CardHeader className="pb-2 sm:pb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-success rounded-lg flex items-center justify-center mb-2 sm:mb-2">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <CardTitle className="text-base sm:text-lg">Physical Appearance Analysis</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Evaluate your physical characteristics</CardDescription>
                  </CardHeader>
                  <CardContent className="p-2 sm:p-4">
                    <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <div className="w-1.5 h-1.5 sm:w-1.5 sm:h-1.5 bg-success rounded-full" />
                        <span>Body frame and weight</span>
                      </div>
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <div className="w-1.5 h-1.5 sm:w-1.5 sm:h-1.5 bg-success rounded-full" />
                        <span>Hair and skin type</span>
                      </div>
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <div className="w-1.5 h-1.5 sm:w-1.5 sm:h-1.5 bg-success rounded-full" />
                        <span>Physical activity levels</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quiz Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
                <div className="text-center p-2 sm:p-4 bg-card/30 rounded-lg">
                  <div className="text-lg sm:text-2xl font-bold text-primary">45</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Total Questions</div>
                </div>
                <div className="text-center p-2 sm:p-4 bg-card/30 rounded-lg">
                  <div className="text-lg sm:text-2xl font-bold text-accent">27</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Minutes</div>
                </div>
                <div className="text-center p-2 sm:p-4 bg-card/30 rounded-lg">
                  <div className="text-lg sm:text-2xl font-bold text-success">15+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Career Paths</div>
                </div>
                <div className="text-center p-2 sm:p-4 bg-card/30 rounded-lg">
                  <div className="text-lg sm:text-2xl font-bold text-warning">AI</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Powered</div>
                </div>
              </div>

              {/* Quiz Interface */}
              {!isStarted ? (
                <div className="text-center p-4 sm:p-8 bg-gradient-to-br from-primary/5 via-accent/5 to-success/5 rounded-lg sm:rounded-xl border border-primary/10">
                  <Play className="w-8 h-8 sm:w-12 sm:h-12 text-primary mx-auto mb-2 sm:mb-4 animate-float" />
                  <h3 className="text-lg sm:text-xl font-bold font-space-grotesk mb-2">Ready to Start Your Quiz?</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
                    Begin the interactive career assessment with 2 phases to discover your ideal career path with personalized recommendations.
                  </p>
                  <Button
                    className="w-full sm:w-auto bg-gradient-success hover:opacity-90 text-sm sm:text-base py-2 sm:py-2 px-4 sm:px-6"
                    onClick={handleStartQuiz}
                  >
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                    Start Quiz
                  </Button>
                  <div className="mt-2 sm:mt-4">
                    <Link to="/college-map">
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto text-sm sm:text-base py-2 sm:py-2 px-4 sm:px-6"
                      >
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Explore Colleges Instead
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 sm:space-y-8">
                  {/* Progress */}
                  <Card className="glass-effect mb-4 sm:mb-8 animate-slide-up">
                    <CardHeader className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row justify-between items-center mb-2 sm:mb-4">
                        <CardTitle className="text-lg sm:text-2xl">Quiz Progress</CardTitle>
                        <span className="text-xs sm:text-sm text-muted-foreground mt-2 sm:mt-0">
                          Phase {currentStep + 1} of {quizSteps.length}
                        </span>
                      </div>
                      <Progress value={progress} className="mb-2 sm:mb-2" />
                      <CardDescription className="text-xs sm:text-sm">
                        {quizSteps[currentStep].title} - {quizSteps[currentStep].description}
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  {/* Current Step */}
                  <Card className="glass-effect mb-4 sm:mb-8 animate-slide-up">
                    <CardHeader className="p-4 sm:p-6">
                      <CardTitle className="text-xl sm:text-2xl flex items-center">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-primary rounded-xl flex items-center justify-center mr-2 sm:mr-3">
                          <span className="text-white font-bold text-sm sm:text-base">{currentStep + 1}</span>
                        </div>
                        {quizSteps[currentStep].title}
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm">
                        {quizSteps[currentStep].description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 space-y-4">
                      {/* Question Interface */}
                      <div className="p-2 sm:p-6 bg-card/30 rounded-lg sm:rounded-xl">
                        <h3 className="font-semibold text-sm sm:text-base mb-2 sm:mb-4">Question {currentQuestionIndex + 1} of {questions.length}:</h3>
                        <p className="mb-2 sm:mb-4 text-sm sm:text-base">{questions[currentQuestionIndex]?.text || 'Loading...'}</p>
                        <div className="flex flex-col space-y-2 sm:space-y-3">
                          {(questions[currentQuestionIndex]?.options || []).map((option) => (
                            <Button
                              key={option}
                              variant={answers[questions[currentQuestionIndex]?.id] === option ? 'default' : 'outline'}
                              className={`w-full h-auto py-1 sm:py-2 px-2 sm:px-4 text-xs sm:text-sm text-left ${answers[questions[currentQuestionIndex]?.id] === option ? 'bg-gradient-primary' : ''} whitespace-normal break-words`}
                              onClick={() => handleAnswer(questions[currentQuestionIndex]?.id, option)}
                              disabled={!questions[currentQuestionIndex]?.options}
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
                        <Button
                          variant="outline"
                          disabled={isPreviousDisabled()}
                          className="w-full sm:w-auto text-sm sm:text-base py-1 sm:py-2 px-2 sm:px-4"
                          onClick={handlePrevious}
                        >
                          Previous
                        </Button>
                        {currentStep === quizSteps.length - 1 && currentQuestionIndex === questions.length - 1 && (
                          <Button
                            onClick={handleCompleteQuiz}
                            className="w-full sm:w-auto bg-gradient-primary hover:opacity-90 text-sm sm:text-base py-1 sm:py-2 px-2 sm:px-4"
                            disabled={!answers[questions[currentQuestionIndex]?.id]}
                          >
                            Complete Quiz
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
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
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center space-x-1 sm:space-x-2 text-base sm:text-xl">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
                <span>How the Assessment Works</span>
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Scientifically designed evaluation process across 2 phases
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
                  <div className="text-center space-y-2">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto">
                      <span className="text-white font-bold text-sm sm:text-base">1</span>
                    </div>
                    <h4 className="font-semibold text-sm sm:text-base">Answer Questions</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Complete a series of questions across 2 phases: Personality and Physical Appearance
                    </p>
                  </div>

                  <div className="text-center space-y-2">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-accent rounded-xl flex items-center justify-center mx-auto">
                      <span className="text-white font-bold text-sm sm:text-base">2</span>
                    </div>
                    <h4 className="font-semibold text-sm sm:text-base">AI Analysis</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Advanced algorithms analyze your responses to identify patterns and preferences
                    </p>
                  </div>

                  <div className="text-center space-y-2">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-success rounded-xl flex items-center justify-center mx-auto">
                      <span className="text-white font-bold text-sm sm:text-base">3</span>
                    </div>
                    <h4 className="font-semibold text-sm sm:text-base">Get Results</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Receive detailed insights about your strengths, interests, and traits
                    </p>
                  </div>

                  <div className="text-center space-y-2">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-warning to-warning-glow rounded-xl flex items-center justify-center mx-auto">
                      <span className="text-white font-bold text-sm sm:text-base">4</span>
                    </div>
                    <h4 className="font-semibold text-sm sm:text-base">Career Matches</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Get personalized career recommendations with education pathways
                    </p>
                  </div>
                </div>

                <div className="p-2 sm:p-6 bg-gradient-to-r from-primary/5 via-accent/5 to-success/5 rounded-lg sm:rounded-xl border border-primary/10">
                  <h4 className="font-semibold text-sm sm:text-base mb-2 sm:mb-3">What Makes Our Assessment Special</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-success" />
                      <span>Research-based question design</span>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-success" />
                      <span>Machine learning powered analysis</span>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-success" />
                      <span>Personalized career matching</span>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-success" />
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