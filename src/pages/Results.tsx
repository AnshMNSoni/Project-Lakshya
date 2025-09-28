import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { GoogleGenerativeAI } from "@google/generative-ai";
import CollegeMap from "./CollegeMap"; // Import the CollegeMap component
import { X, Maximize2, Minimize2 } from "lucide-react"; // Import icons for fullscreen controls

const Results = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(false); // State to toggle map visibility
  const [isFullScreen, setIsFullScreen] = useState(false); // State to control full-screen mode
  const [mapLoading, setMapLoading] = useState(false); // State for map loading

  // Handle escape key for full-screen map
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showMap) {
        setShowMap(false);
      }
    };

    if (showMap) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset'; // Restore scroll
    };
  }, [showMap]);

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
        setRecommendations(["Freelance Writer", "UX/UI Designer", "Data Analyst", "Marketing Consultant"]);
      } finally {
        setLoading(false);
      }
    };

    generateRecommendations();
  }, [toast]);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 flex items-center justify-center p-4 sm:p-6 ${showMap ? 'overflow-hidden' : ''}`}>
      <Card className="w-full max-w-[90vw] sm:max-w-3xl mx-auto shadow-xl border-0 bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 sm:p-6 text-white">
          <CardTitle className="text-lg sm:text-2xl md:text-3xl font-bold text-center">
            Your Career Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {loading ? (
            <div className="text-center">
              <p className="text-base sm:text-lg text-gray-600 animate-pulse">
                Loading your career recommendations...
              </p>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 text-center">
                Top Career Paths for You
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {recommendations.map((career, index) => (
                  <li
                    key={index}
                    className="bg-gradient-to-br from-orange-100 to-orange-50 p-3 sm:p-4 rounded-lg shadow-inner text-center text-sm sm:text-base text-gray-700 hover:bg-orange-200 transition-colors duration-200"
                  >
                    {career}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <Button
                  onClick={() => navigate("/dashboard")}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base transition-all duration-300 hover:shadow-md w-full sm:w-auto"
                >
                  Back to Dashboard
                </Button>
                <Button
                  onClick={() => {
                    setMapLoading(true);
                    setTimeout(() => {
                      setShowMap(true);
                      setMapLoading(false);
                    }, 300);
                  }}
                  disabled={mapLoading}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base transition-all duration-300 hover:shadow-md w-full sm:w-auto flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {mapLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Loading Map...
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-4 h-4" />
                      Find Colleges
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Full Screen Map Overlay */}
      {showMap && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm animate-in fade-in duration-300 pointer-events-auto">
          {/* Header Controls */}
          <div className="absolute top-0 left-0 right-0 z-[70] bg-gradient-to-r from-orange-500/95 to-orange-600/95 backdrop-blur-md border-b border-orange-300/30 shadow-lg">
            <div className="flex items-center justify-between p-4 max-w-7xl mx-auto relative z-[71]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Maximize2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">College Explorer</h2>
                  <p className="text-xs text-orange-100">• Find colleges near you</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Close button clicked'); // Debug log
                    setShowMap(false);
                  }}
                  className="text-white hover:bg-red-500/30 p-2 rounded-lg transition-colors cursor-pointer border-none bg-transparent z-50 relative"
                  title="Close Full Screen (ESC)"
                  type="button"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className="absolute inset-0 pt-20 animate-in slide-in-from-bottom duration-500">
            <div className="w-full h-full rounded-t-xl overflow-hidden shadow-2xl">
              <CollegeMap />
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Results;