import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import Loader from "@/components/ui/Loader";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignInPage from "./components/auth/SignInPage";
import SignUpPage from "./components/auth/SignUpPage";
import Dashboard from "./components/dashboard/Dashboard";
import ProfilePage from "./components/profile/ProfilePage";
import Analysis from "./pages/Analysis";
import Quiz from "./pages/Quiz";
import Quiz2 from "./pages/Quiz2";
import Results from "./pages/Results";
import CollegeRecommendations from "./pages/CollegeRecommendations";
import CollegeMap from "./pages/CollegeMap";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SmartAnalysis from "./pages/SmartAnalysis";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Match Loader's totalTime
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Loader isLoading={isLoading} />
            {!isLoading && (
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/sign-in" element={<SignInPage />} />
                  <Route path="/sign-up" element={<SignUpPage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/analysis" element={<Analysis />} />
                  <Route path="/quiz" element={<Quiz />} />
                  <Route path="/quiz2" element={<Quiz2 />} />
                  <Route path="/results" element={<Results />} />
                  <Route path="/recommendations" element={<CollegeRecommendations />} />
                  <Route path="/college-map" element={<CollegeMap />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/smart-analysis" element={<SmartAnalysis />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            )}
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;