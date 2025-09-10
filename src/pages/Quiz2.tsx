import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, BookOpen, CheckCircle, Play, MapPin } from "lucide-react";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Quiz2 = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);

  const physicalAppearanceQuestions = [
    { id: "Physical-0", text: "Body Frame", options: ["Thin and Lean", "Medium", "Well Built"] },
    { id: "Physical-1", text: "Type of Hair", options: ["Dry and with Split Ends", "Normal, Thin, More Hair Fall", "Greasy, Heavy"] },
    { id: "Physical-2", text: "Color of Hair", options: ["Pale Brown", "Red or Brown", "Jet Black"] },
    { id: "Physical-3", text: "Skin", options: ["Dry, Rough", "Soft, More Sweating, Acne", "Moist, Greasy"] },
    { id: "Physical-4", text: "Complexion", options: ["Dark, Blackish", "Pink to Red", "Glowing, White"] },
    { id: "Physical-5", text: "Body Weight", options: ["Low, Difficult to Put on Weight", "Medium, Can Easily Lose or Gain Weight", "Overweight, Difficult to Lose Weight"] },
    { id: "Physical-6", text: "Nails", options: ["Blackish, Small, Brittle", "Reddish, Small", "Pinkish, Big, Smooth"] },
    { id: "Physical-7", text: "Size and Color of the Teeth", options: ["Very Big or Very Small, Irregular, Blackish", "Medium Sized, Yellowish", "Large, Shining White"] },
    { id: "Physical-8", text: "Pace of Performing Work", options: ["Fast, Always in Hurry", "Medium, Energetic", "Slow, Steady"] },
    { id: "Physical-9", text: "Mental Activity", options: ["Quick, Restless", "Smart Intellect, Aggressive", "Calm, Stable"] },
    { id: "Physical-10", text: "Memory", options: ["Short Term Bad", "Good Memory", "Long Term is Best"] },
    { id: "Physical-11", text: "Grasping Power", options: ["Grasps Quickly but not Completely and Forgets Quickly", "Grasps Quickly but Completely and have Good Memory", "Grasps Late and Retains for Longer Time"] },
    { id: "Physical-12", text: "Sleep Pattern", options: ["Interrupted, Less", "Moderate", "Sleepy, Lazy"] },
    { id: "Physical-13", text: "Intolerance to Weather Conditions", options: ["Aversion to Cold", "Aversion to Heat", "Aversion to Moist, Rainy and Cool Weather"] },
    { id: "Physical-14", text: "Reactions Under Adverse Situation", options: ["Anxiety, Worry, Irritability", "Anger, Aggression", "Calm, Reclusive, Sometimes Depressive"] },
    { id: "Physical-15", text: "Mood", options: ["Changes Quickly have Frequent Mood Swings", "Changes Slowly", "Stable Constant"] },
    { id: "Physical-16", text: "Eating Habit", options: ["Eats Quickly Without Chewing Properly", "Eats at a Moderate Speed", "Chews Food Properly"] },
    { id: "Physical-17", text: "Hunger", options: ["Irregular, Any Time", "Sudden Hunger Pangs, Sharp Hunger", "Can Skip any Meal Easily"] },
    { id: "Physical-18", text: "Body Temperature", options: ["Less than Normal, Hands and Feet are Cold", "More than Normal, Face and Forehead Hot", "Normal, Hands and Feet Slightly Cold"] },
    { id: "Physical-19", text: "Joints", options: ["Weak, Noise on Movement", "Healthy with Optimal Strength", "Heavy Weight Bearing"] },
    { id: "Physical-20", text: "Nature", options: ["Timid, Jealous", "Egoistic, Fearless", "Forgiving, Grateful, Not Greedy"] },
    { id: "Physical-21", text: "Body Energy", options: ["Becomes Low in Evening, Fatigues After Less Work", "Moderate, Gets Tired After Medium Work", "Excellent Energy Throughout Day Not Easily Fatigued"] },
    { id: "Physical-22", text: "Eyeball", options: ["Unsteady, Fast Moving", "Moving Slowly", "Steady"] },
    { id: "Physical-23", text: "Quality of Voice", options: ["Rough with Broken Words", "Fast, Commanding", "Soft and Deep"] },
    { id: "Physical-24", text: "Dreams", options: ["Sky, Wind, Flying, Objects and Confusion", "Fire, Light, Bright Colors, Violence", "Water Pools, Gardens and Good Relationships"] },
    { id: "Physical-25", text: "Social Relations", options: ["Make Less Friends Prefers Solitude", "Good No. of Friends", "Love to Socialize. Relationships are Longer Lasting"] },
    { id: "Physical-26", text: "Wealth", options: ["Spends Without Thinking Much", "Saves but Spends on Valuable Things", "Prefers More Savings"] },
    { id: "Physical-27", text: "Bowel Movements", options: ["Dry, Hard, Blackish, Scanty Stools", "Soft, Yellowish, Loose Stools", "Heavy, Thick, Sticky Stools"] },
    { id: "Physical-28", text: "Walking Pace", options: ["Quick, Fast With Long Steps", "Average, Steady", "Slow with Short Steps"] },
    { id: "Physical-29", text: "Communication Skills", options: ["Fast, Irrelevant Talk, Speech not Clear", "Good Speakers with Genuine Argumentative Skills", "Authoritative, Firm and Little Speech"] },
  ];

  useEffect(() => {
    setQuestions(physicalAppearanceQuestions);
    // Auto-start if coming from Quiz1
    const personalityAnswers = localStorage.getItem("personalityAnswers");
    if (personalityAnswers) {
      setIsStarted(true);
      toast({
        title: "Quiz 2 Started!",
        description: "Physical Appearance Analysis has begun.",
      });
    }
  }, [toast]);

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleCompleteQuiz = async () => {
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `
        Analyze the following answers from a physical appearance quiz based on Ayurveda doshas (Vata, Pitta, Kapha).
        Each question has options corresponding to Vata (first), Pitta (second), Kapha (third).
        Determine the dominant dosha(s) and provide a brief analysis for career recommendations.
        Answers: ${JSON.stringify(answers)}
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const analysis = response.text();

      localStorage.setItem("physicalAnswers", JSON.stringify(answers));
      localStorage.setItem("physicalAnalysis", analysis);

      toast({
        title: "Quiz Complete!",
        description: "Physical appearance analysis completed. Navigating to results.",
      });

      setTimeout(() => {
        navigate("/results");
      }, 2000);
    } catch (error) {
      console.error("Error with Gemini API:", error);
      toast({
        title: "Error",
        description: "Failed to analyze with Gemini API. Navigating to results anyway.",
        variant: "destructive",
      });
      localStorage.setItem("physicalAnswers", JSON.stringify(answers)); // Store answers even on error
      setTimeout(() => {
        navigate("/results");
      }, 2000);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const isPreviousDisabled = () => {
    return currentQuestionIndex === 0;
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleStartQuiz = () => {
    setIsStarted(true);
    toast({
      title: "Quiz Started!",
      description: "Physical Appearance Analysis has begun.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="glass-effect border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
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
                <h1 className="text-lg font-bold font-space-grotesk sm:text-xl">
                  Physical Appearance Analysis Quiz
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
        <div className="space-y-4 sm:space-y-6">
          <div className="text-center animate-slide-up">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-pulse-glow">
              <BookOpen className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-space-grotesk mb-2 sm:mb-4">
              Physical Appearance Analysis
              <span className="block text-base sm:text-lg text-muted-foreground font-normal mt-1 sm:mt-2">
                Assess your physical traits, powered by AI
              </span>
            </h2>
          </div>

          <Card className="glass-effect shadow-elevated animate-slide-up relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-success/5 via-primary/5 to-accent/5" />
            <CardHeader className="relative z-10 p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl font-space-grotesk text-center">
                Physical Appearance Assessment
              </CardTitle>
              <CardDescription className="text-center text-sm sm:text-base">
                Evaluate your physical characteristics for career insights
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 p-4 sm:p-6 space-y-4 sm:space-y-8">
              {!isStarted ? (
                <div className="text-center p-4 sm:p-8 bg-gradient-to-br from-primary/5 via-accent/5 to-success/5 rounded-lg sm:rounded-xl border border-primary/10">
                  <Play className="w-8 h-8 sm:w-12 sm:h-12 text-primary mx-auto mb-2 sm:mb-4 animate-float" />
                  <h3 className="text-lg sm:text-xl font-bold font-space-grotesk mb-2">Ready to Start?</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
                    Begin the physical appearance analysis quiz.
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
                        Explore Colleges
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 sm:space-y-8">
                  <Card className="glass-effect mb-4 sm:mb-8 animate-slide-up">
                    <CardHeader className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row justify-between items-center mb-2 sm:mb-4">
                        <CardTitle className="text-lg sm:text-2xl">Quiz Progress</CardTitle>
                      </div>
                      <Progress value={progress} className="mb-2 sm:mb-2" />
                      <CardDescription className="text-xs sm:text-sm">
                        Assess your physical traits and characteristics
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="glass-effect mb-4 sm:mb-8 animate-slide-up">
                    <CardHeader className="p-4 sm:p-6">
                      <CardTitle className="text-xl sm:text-2xl flex items-center">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-primary rounded-xl flex items-center justify-center mr-2 sm:mr-3">
                          <span className="text-white font-bold text-sm sm:text-base">1</span>
                        </div>
                        Physical Appearance Analysis
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm">
                        Assess your physical traits and characteristics
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 space-y-4">
                      <div className="p-2 sm:p-6 bg-card/30 rounded-lg sm:rounded-xl">
                        <h3 className="font-semibold text-sm sm:text-base mb-2 sm:mb-4">
                          Question {currentQuestionIndex + 1} of {questions.length}:
                        </h3>
                        <p className="mb-2 sm:mb-4 text-sm sm:text-base">
                          {questions[currentQuestionIndex]?.text || "Loading..."}
                        </p>
                        <div className="flex flex-col space-y-2 sm:space-y-3">
                          {(questions[currentQuestionIndex]?.options || []).map((option) => (
                            <Button
                              key={option}
                              variant={answers[questions[currentQuestionIndex]?.id] === option ? "default" : "outline"}
                              className={`w-full h-auto py-1 sm:py-2 px-2 sm:px-4 text-xs sm:text-sm text-left ${
                                answers[questions[currentQuestionIndex]?.id] === option ? "bg-gradient-primary" : ""
                              } whitespace-normal break-words`}
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
                        {currentQuestionIndex === questions.length - 1 && (
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Quiz2;