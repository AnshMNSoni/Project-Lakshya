import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignInPage from "./components/auth/SignInPage";
import SignUpPage from "./components/auth/SignUpPage";
import Dashboard from "./components/dashboard/Dashboard";
import ProfilePage from "./components/profile/ProfilePage";
import Analysis from "./pages/Analysis";
import Quiz from "./pages/Quiz"; // Personality Analysis
import Quiz2 from "./pages/Quiz2"; // Physical Appearance Analysis
import Results from "./pages/Results"; // Combined Results
import CollegeRecommendations from "./pages/CollegeRecommendations";
import CollegeMap from "./pages/CollegeMap";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SmartAnalysis from "./pages/SmartAnalysis";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="lakshya-ui-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/quiz" element={<Quiz />} /> {/* Personality Analysis */}
              <Route path="/quiz2" element={<Quiz2 />} /> {/* Physical Appearance Analysis */}
              <Route path="/results" element={<Results />} /> {/* Combined Results */}
              <Route path="/recommendations" element={<CollegeRecommendations />} />
              <Route path="/college-map" element={<CollegeMap />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/smart-analysis" element={<SmartAnalysis />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;