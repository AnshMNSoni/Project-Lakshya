import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock, User, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import heroImage from '@/assets/hero-education.jpg';
import ProfessionalNavbar from '@/components/layout/ProfessionalNavbar';

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    mobile: '',
    password: ''
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!/^\d{10}$/.test(formData.mobile)) {
      toast({
        variant: "destructive",
        title: "Invalid Mobile Number",
        description: "Mobile number must be exactly 10 digits",
      });
      return false;
    }

    if (formData.password.length < 8) {
      toast({
        variant: "destructive",
        title: "Weak Password",
        description: "Password must be at least 8 characters long",
      });
      return false;
    }

    if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(formData.password)) {
      toast({
        variant: "destructive",
        title: "Weak Password",
        description: "Password must contain at least one letter and one number",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Sign In Failed",
          description: error.message,
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "Successfully signed in to Lakshya",
        });
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign In Failed",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <ProfessionalNavbar hideAuthOptions={true} />
      <main className="flex-1">
        <div className="min-h-[calc(100vh-64px)] flex">
          {/* Left side - Hero Image */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/FrontPage.jpg')" }}
          />

          {/* Dark/Light Theme Overlay - appears above background image with reduced opacity */}
          <div className="absolute inset-0 bg-background/20 dark:bg-background/30" />

          {/* Background Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-accent/30 to-primary/40 dark:from-primary/50 dark:via-accent/40 dark:to-primary/50" />

          {/* Foreground Content */}
          <div className="relative z-10 flex flex-col justify-center p-12 text-foreground">
            {/* You can add signup-related content here later if needed */}
          </div>
        </div>


          {/* Right side - Sign In Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
            <div className="w-full max-w-md space-y-8">
              <div className="text-center animate-slide-up">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-professional rounded-2xl flex items-center justify-center animate-glow">
                    <User className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold font-space-grotesk">Welcome Back</h2>
                <p className="text-muted-foreground mt-2">
                  Sign in to continue your educational journey
                </p>
              </div>

              <Card className="glass-effect shadow-card animate-slide-up">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl text-center">Sign In</CardTitle>
                  <CardDescription className="text-center">
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="student@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="pl-10 bg-card/50 border-border/50 focus:border-primary transition-colors"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mobile" className="text-sm font-medium">
                        Mobile Number
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="mobile"
                          name="mobile"
                          type="tel"
                          placeholder="9876543210"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          className="pl-10 bg-card/50 border-border/50 focus:border-primary transition-colors"
                          maxLength={10}
                          required
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">Enter 10-digit mobile number</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="pl-10 pr-10 bg-card/50 border-border/50 focus:border-primary transition-colors"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Min 8 characters with letters and numbers
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <Link
                        to="/forgot-password"
                        className="text-sm text-primary hover:text-primary-glow transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </CardContent>

                  <CardFooter className="flex flex-col space-y-4">
                    <Button
                      type="submit"
                      className="w-full bg-gradient-professional hover:opacity-90 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-glow"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Signing In...
                        </>
                      ) : (
                        'Sign In'
                      )}
                    </Button>

                    <div className="text-center text-sm text-muted-foreground">
                      Don't have an account?{' '}
                      <Link
                        to="/sign-up"
                        className="text-primary hover:text-primary-glow transition-colors font-medium"
                      >
                        Sign up here
                      </Link>
                    </div>
                  </CardFooter>
                </form>
              </Card>

              <div className="text-center text-xs text-muted-foreground">
                By signing in, you agree to our{' '}
                
                <Link to="https://www.termsfeed.com/live/171d1911-9316-4cbe-9977-595878a79860" target="_blank" className="text-primary hover:text-primary-glow">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignInPage;