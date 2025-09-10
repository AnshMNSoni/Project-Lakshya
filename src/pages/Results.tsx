import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Results = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateRecommendations = async () => {
      try {
        const personalityAnswers = JSON.parse(localStorage.getItem("personalityAnswers") || "{}");
        const personalityPrediction = localStorage.getItem("personalityPrediction") || "Not available";
        const physicalAnswers = JSON.parse(localStorage.getItem("physicalAnswers") || "{}");
        const physicalAnalysis = localStorage.getItem("physicalAnalysis") || "Not available";

        if (Object.keys(personalityAnswers).length === 0 || Object.keys(physicalAnswers).length === 0) {
          throw new Error("Missing quiz data");
        }

        // ✅ Use env variable, not hardcoded key
        const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY as string);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
          Based on the following data, provide ONLY a JSON array of 3–5 career path names (no explanations).
          Example output: ["Career 1", "Career 2", "Career 3"]

          - Personality quiz: Prediction = ${personalityPrediction}, Answers = ${JSON.stringify(personalityAnswers)}
          - Physical appearance quiz (Ayurveda doshas: Vata, Pitta, Kapha): Analysis = ${physicalAnalysis}, Answers = ${JSON.stringify(physicalAnswers)}
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().trim();

        // ✅ Try parsing directly, fallback to regex if extra text is present
        let parsed: string[] = [];
        try {
          parsed = JSON.parse(text);
        } catch {
          const match = text.match(/\[.*\]/s);
          if (match) {
            parsed = JSON.parse(match[0]);
          }
        }

        if (parsed.length > 0) {
          setRecommendations(parsed);
        } else {
          throw new Error("Invalid AI response format");
        }
      } catch (error) {
        console.error("Error generating recommendations:", error);
        toast({
          title: "Error",
          description: "Failed to generate recommendations. Using default fallback.",
          variant: "destructive",
        });
        setRecommendations(["Freelance Writer", "UX/UI Designer", "Data Analyst", "Marketing Consultant"]); // fallback
      } finally {
        setLoading(false);
      }
    };

    generateRecommendations();
  }, [toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 flex items-center justify-center p-4 sm:p-6">
      <Card className="w-full max-w-4xl mx-auto shadow-xl border-0 bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-center">
            Your Career Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 sm:p-8 space-y-6">
          {loading ? (
            <div className="text-center">
              <p className="text-lg sm:text-xl text-gray-600 animate-pulse">
                Loading your career recommendations...
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center mb-4">
                Top Career Paths for You
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendations.map((career, index) => (
                  <li
                    key={index}
                    className="bg-gradient-to-br from-orange-100 to-orange-50 p-4 rounded-lg shadow-inner text-center text-sm sm:text-base text-gray-700 hover:bg-orange-200 transition-colors duration-200"
                  >
                    {career}
                  </li>
                ))}
              </ul>
              <div className="text-center">
                <Button
                  onClick={() => navigate("/dashboard")}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-lg text-sm sm:text-base transition-all duration-300 hover:shadow-md"
                >
                  Back to Dashboard
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Results;
