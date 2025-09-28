import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle, Star, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast"; // Added for toast notifications

const Quiz = () => {
  const navigate = useNavigate();
  const { toast } = useToast(); // Added toast hook
  const [currentStep, setCurrentStep] = useState(1);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [prediction, setPrediction] = useState<string | null>(null);
  const [isSmartAnalysisDone, setIsSmartAnalysisDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🔹 All questions
  const getQuestionsForStep = () => {
    return [
      // Step 1
      { id: 1, text: "I am the life of the party.", step: 1 },
      { id: 2, text: "I get stressed out easily.", step: 1 },
      { id: 3, text: "I am always prepared.", step: 1 },
      { id: 4, text: "I have a rich vocabulary.", step: 1 },
      { id: 5, text: "I don't talk a lot.", step: 1 },

      // Step 2
      { id: 6, text: "I am interested in people.", step: 2 },
      { id: 7, text: "I leave my belongings around.", step: 2 },
      { id: 8, text: "I have difficulty understanding abstract ideas.", step: 2 },
      { id: 9, text: "I feel comfortable around people.", step: 2 },
      { id: 10, text: "I insult people.", step: 2 },

      // Step 3
      { id: 11, text: "I pay attention to details.", step: 3 },
      { id: 12, text: "I worry about things.", step: 3 },
      { id: 13, text: "I have a vivid imagination.", step: 3 },
      { id: 14, text: "I keep in the background.", step: 3 },
      { id: 15, text: "I sympathize with others' feelings.", step: 3 },
    ];
  };

  useEffect(() => {
    const stepQuestions = getQuestionsForStep().filter(
      (q) => q.step === currentStep
    );
    setQuestions(stepQuestions);
    setCurrentQuestionIndex(0);
  }, [currentStep]);

  const allQuestions = getQuestionsForStep();
  const currentQuestion = questions[currentQuestionIndex];
  const globalIndex = allQuestions.findIndex(
    (q) => q.id === currentQuestion?.id
  );

  // 🔹 Progress bar %
  const progress = ((globalIndex + 1) / allQuestions.length) * 100;

  // 🔹 Handle answer selection (NO auto-increment)
  const handleAnswer = (questionId: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
    // Removed auto-increment logic here
  };
  // ... (before handleSubmit)

  // 🔹 Handle Next button click
  const handleNext = () => {
    // 🛑 Ensure an answer is selected before proceeding
    if (!answers[currentQuestion.id]) {
      toast({
        title: "Wait!",
        description: "Please select an option before proceeding.",
        variant: "default",
      });
      return;
    }

    // If there are more questions in the current step
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    // If this is the last question of the current step, move to the next step
    else if (currentStep < 3) { // Assuming 3 is the max step number
      setCurrentStep(currentStep + 1);
    }
  };

  // ... (rest of handleSubmit)
  // 🔹 Submit answers to Flask backend and navigate to Quiz2
  const handleSubmit = async () => {
    setIsSubmitting(true);
    const counts = [0, 0, 0, 0, 0];
    allQuestions.forEach((q) => {
      const option = answers[q.id];
      if (option) {
        const indexMap: Record<string, number> = {
          Disagree: 0,
          "Slightly disagree": 1,
          Neutral: 2,
          "Slightly agree": 3,
          Agree: 4,
        };
        counts[indexMap[option]] += 1;
      }
    });

    const total = allQuestions.length;
    const probabilities = counts.map((c) => c / total);
    const payload = { answers: [probabilities] };

    try {
      const response = await fetch("https://lakshya-backend-udf3.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }

      setPrediction(result.career_field);
      localStorage.setItem("personalityAnswers", JSON.stringify(answers));
      localStorage.setItem("personalityPrediction", result.career_field);

      toast({
        title: "Quiz 1 Complete!",
        description: "Proceeding to Physical Appearance Analysis.",
      });

      setTimeout(() => {
        navigate("/quiz2");
      }, 1000);
    } catch (error) {
      console.error("❌ Error submitting answers:", error);
      toast({
        title: "Error",
        description: `Failed to submit answers: ${error.message}. Proceeding to Quiz 2 anyway.`,
        variant: "destructive",
      });
      localStorage.setItem("personalityAnswers", JSON.stringify(answers)); // Store answers even on error
      setTimeout(() => {
        navigate("/quiz2");
      }, 1000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
                  Assessment Quiz
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Technical Analysis Section */}
      {!isSmartAnalysisDone ? (
        <div className="text-center py-8 animate-fade-in">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <Star className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-space-grotesk mb-2 sm:mb-4">
        Smart Analysis Required
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-md mx-auto">
        Before we begin the personality assessment, we need to perform a smart analysis to personalize your experience.
          </p>
          <Button
            className="bg-gradient-primary hover:bg-gradient-primary/90 text-white px-6 py-3 rounded-full transition-transform hover:scale-105"
            onClick={() => navigate("/smart-analysis")}
          >
        <Star className="w-4 h-4 mr-2" />
        Start Smart Analysis
          </Button>
        </div>
      ) : (
        <>
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Question Header */}
          <h3 className="font-semibold text-sm sm:text-base mb-2 sm:mb-4">
            Question {globalIndex + 1} of {allQuestions.length}:
          </h3>

          {/* Question Text */}
          <p className="mb-2 sm:mb-4 text-sm sm:text-base">
            {currentQuestion?.text || "Loading..."}
          </p>

          {/* Options */}
          <div className="flex flex-col space-y-2 sm:space-y-3">
            {[
              "Disagree",
              "Slightly disagree",
              "Neutral",
              "Slightly agree",
              "Agree",
            ].map((option) => (
              <Button
                key={option}
                variant={
                  answers[currentQuestion?.id] === option
                    ? "default"
                    : "outline"
                }
                className={`w-full h-auto py-1 sm:py-2 px-2 sm:px-4 text-xs sm:text-sm text-left ${answers[currentQuestion?.id] === option
                  ? "bg-gradient-primary"
                  : ""
                  } whitespace-normal break-words`}
                onClick={() =>
                  handleAnswer(currentQuestion?.id, option)
                }
                disabled={!currentQuestion}
              >
                {option}
              </Button>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6"> {/* Aesthetic contrast and spacing */}
            <Button
              onClick={() => {
                // Logic to go back: if not the first question of the step, go back a question, otherwise go back a step.
                if (currentQuestionIndex > 0) {
                  setCurrentQuestionIndex(currentQuestionIndex - 1);
                } else if (currentStep > 1) {
                  // Correctly go to the last question of the previous step
                  const prevQuestions = getQuestionsForStep().filter(q => q.step === currentStep - 1);
                  setCurrentStep(currentStep - 1);
                  setCurrentQuestionIndex(prevQuestions.length - 1);
                }
              }}
              disabled={currentStep === 1 && currentQuestionIndex === 0}
              variant="outline" // Changed for visual hierarchy
              className="border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              Previous
            </Button>

            {/* Next/Submit Button */}
            {(globalIndex + 1 < allQuestions.length) ? (
              <Button
                onClick={handleNext}
                disabled={!currentQuestion || !answers[currentQuestion?.id]} // Disabled until an answer is selected
                className="bg-primary hover:bg-primary/90 text-white font-semibold transition-transform duration-150 ease-in-out shadow-lg shadow-primary/50" // Contrasting primary style
              >
                Next <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!currentQuestion || !answers[currentQuestion?.id] || isSubmitting} // Should also be disabled on final question if no answer or while submitting
                className="bg-green-600 hover:bg-green-700 text-white font-semibold transition-transform duration-150 ease-in-out shadow-lg shadow-green-600/50" // Distinct "Submit/Success" color
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Next Quiz"
                )}
              </Button>
            )}
          </div>
        </>
      )}

      {/* Main Content */}
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
                This assessment consists of 2 phases: Personality Analysis and
                Physical Appearance Analysis, powered by machine learning
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
                This evaluation consists of 2 phases: Personality Analysis and
                Physical Appearance Analysis to discover your ideal career path
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
                    <CardTitle className="text-base sm:text-lg">
                      Personality Analysis
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Explore your work style preferences
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
                  <CardHeader className="pb-2 sm:pb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-success rounded-lg flex items-center justify-center mb-2 sm:mb-2">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <CardTitle className="text-base sm:text-lg">
                      Physical Appearance Analysis
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Evaluate your physical characteristics
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Card */}
          <Card className="glass-effect shadow-elevated animate-slide-up">
            <CardContent className="p-4 sm:p-6">
              {prediction ? (
                <div className="text-center py-8 animate-fade-in">
                  <Button
                    className="bg-gradient-primary hover:bg-gradient-primary/90 text-white px-6 py-2 rounded-full transition-transform hover:scale-105"
                    onClick={() => navigate("/dashboard")}
                  >
                    Back to Dashboard
                  </Button>
                </div>
              ) : (
                <>
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                      className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Question Header */}
                  <h3 className="font-semibold text-sm sm:text-base mb-2 sm:mb-4">
                    Question {globalIndex + 1} of {allQuestions.length}:
                  </h3>

                  {/* Question Text */}
                  <p className="mb-2 sm:mb-4 text-sm sm:text-base">
                    {currentQuestion?.text || "Loading..."}
                  </p>

                  {/* Options */}
                  <div className="flex flex-col space-y-2 sm:space-y-3">
                    {[
                      "Disagree",
                      "Slightly disagree",
                      "Neutral",
                      "Slightly agree",
                      "Agree",
                    ].map((option) => (
                      <Button
                        key={option}
                        variant={
                          answers[currentQuestion?.id] === option
                            ? "default"
                            : "outline"
                        }
                        className={`w-full h-auto py-1 sm:py-2 px-2 sm:px-4 text-xs sm:text-sm text-left ${answers[currentQuestion?.id] === option
                          ? "bg-gradient-primary"
                          : ""
                          } whitespace-normal break-words`}
                        onClick={() =>
                          handleAnswer(currentQuestion?.id, option)
                        }
                        disabled={!currentQuestion}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-6"> {/* Aesthetic contrast and spacing */}
                    <Button
                      onClick={() => {
                        // Logic to go back: if not the first question of the step, go back a question, otherwise go back a step.
                        if (currentQuestionIndex > 0) {
                          setCurrentQuestionIndex(currentQuestionIndex - 1);
                        } else if (currentStep > 1) {
                          // Correctly go to the last question of the previous step
                          const prevQuestions = getQuestionsForStep().filter(q => q.step === currentStep - 1);
                          setCurrentStep(currentStep - 1);
                          setCurrentQuestionIndex(prevQuestions.length - 1);
                        }
                      }}
                      disabled={currentStep === 1 && currentQuestionIndex === 0}
                      variant="outline" // Changed for visual hierarchy
                      className="border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                      Previous
                    </Button>

                    {/* Next/Submit Button */}
                    {(globalIndex + 1 < allQuestions.length) ? (
                      <Button
                        onClick={handleNext}
                        disabled={!currentQuestion || !answers[currentQuestion?.id]} // Disabled until an answer is selected
                        className="bg-primary hover:bg-primary/90 text-white font-semibold transition-transform duration-150 ease-in-out shadow-lg shadow-primary/50" // Contrasting primary style
                      >
                        Next <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        disabled={!currentQuestion || !answers[currentQuestion?.id] || isSubmitting} // Should also be disabled on final question if no answer or while submitting
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold transition-transform duration-150 ease-in-out shadow-lg shadow-green-600/50" // Distinct "Submit/Success" color
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Loading...
                          </>
                        ) : (
                          "Next Quiz"
                        )}
                      </Button>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Quiz;