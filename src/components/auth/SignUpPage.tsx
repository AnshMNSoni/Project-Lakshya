import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Mail, Lock, User, Phone, Shield, Sparkles, Check, X, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import heroImage from '@/assets/hero-education.jpg';
import ProfessionalNavbar from '@/components/layout/ProfessionalNavbar';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [robotVerified, setRobotVerified] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [captchaCode, setCaptchaCode] = useState('');
  const [userCaptchaInput, setUserCaptchaInput] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  // Generate random captcha code
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
    setUserCaptchaInput('');
    setRobotVerified(false);
  };

  // Initialize captcha on component mount
  React.useEffect(() => {
    generateCaptcha();
  }, []);

  // Verify captcha
  const verifyCaptcha = () => {
    if (userCaptchaInput.toUpperCase() === captchaCode) {
      setRobotVerified(true);
      toast({
        title: "Verification Successful",
        description: "Human verification completed!",
      });
    } else {
      setRobotVerified(false);
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: "Please enter the correct captcha code",
      });
      generateCaptcha();
    }
  };

  // Password strength validation
  const validatePassword = (password) => {
    const criteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    const strength = Object.values(criteria).filter(Boolean).length;
    return { criteria, strength, isStrong: strength >= 4 };
  };

  // Mobile number validation
  const validateMobileNumber = (phone) => {
    const cleanPhone = phone.replace(/\D/g, ''); // Remove non-digits
    return cleanPhone.length === 10 && /^[6-9]\d{9}$/.test(cleanPhone); // Indian mobile format
  };

  const passwordValidation = validatePassword(formData.password);
  const isMobileValid = validateMobileNumber(formData.phone);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!robotVerified) {
      toast({
        variant: "destructive",
        title: "Verification Required",
        description: "Please complete the Human verification",
      });
      return;
    }

    if (!termsAccepted) {
      toast({
        variant: "destructive",
        title: "Terms Required",
        description: "Please accept the Terms and Conditions to continue",
      });
      return;
    }

    if (!passwordValidation.isStrong) {
      toast({
        variant: "destructive",
        title: "Weak Password",
        description: "Please create a stronger password meeting all criteria",
      });
      return;
    }

    if (!isMobileValid) {
      toast({
        variant: "destructive",
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Password Mismatch",
        description: "Passwords do not match",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: formData.fullName,
            phone: formData.phone,
          }
        }
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Sign Up Failed",
          description: error.message,
        });
      } else {
        toast({
          title: "Account Created Successfully!",
          description: "Please check your email to verify your account.",
        });
        navigate('/sign-in');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign Up Failed",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // For phone number, allow only digits and limit to 10
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length <= 10) {
        setFormData({
          ...formData,
          [name]: digitsOnly
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const getPasswordStrengthColor = (strength) => {
    if (strength < 2) return 'text-red-500';
    if (strength < 4) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getPasswordStrengthText = (strength) => {
    if (strength < 2) return 'Weak';
    if (strength < 4) return 'Medium';
    return 'Strong';
  };

  return (
      <div className="min-h-screen bg-background flex flex-col relative">
        <ProfessionalNavbar hideAuthOptions={true} />
        <div className="min-h-screen flex">
    
      {/* Left side - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0">
          {/* <img
            src={heroImage}
            alt="EduGuide - Smart Career Guidance"
            className="w-full h-full object-cover"
          /> */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10" />
        </div>
        <div className="relative z-10 flex flex-col justify-center p-12">
          <div className="animate-float">
            <Sparkles className="w-16 h-16 mb-6 text-accent-glow" />
          </div>
          <h1 className="text-5xl font-bold mb-6 font-space-grotesk">
            Begin Your
            <span className="block bg-gradient-professional bg-clip-text text-transparent">Learning Journey</span>
          </h1>
          <p className="text-xl mb-8 font-space-grotesk">
            Join thousands of students who have discovered their perfect career path through our AI-powered guidance platform.
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-accent-glow rounded-full animate-pulse" />
              <span className="font-space-grotesk">Personalized aptitude assessment</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-success-glow rounded-full animate-pulse" />
              <span className="font-space-grotesk">Career path recommendations</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-warning-glow rounded-full animate-pulse" />
              <span className="font-space-grotesk">College admission guidance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Sign Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center animate-slide-up">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center animate-glow">
                <User className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold font-space-grotesk">Create Account</h2>
            <p className="text-muted-foreground mt-2">
              Start your educational journey with EduGuide
            </p>
          </div>

          <Card className="glass-effect shadow-card animate-slide-up">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
              <CardDescription className="text-center">
                Create your account to get personalized guidance
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="pl-10 bg-card/50 border-border/50 focus:border-primary transition-colors"
                      required
                    />
                  </div>
                </div>

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
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Mobile Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`pl-10 bg-card/50 border-border/50 focus:border-primary transition-colors ${
                        formData.phone && !isMobileValid ? 'border-red-500' : ''
                      }`}
                      required
                    />
                    {formData.phone && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {isMobileValid ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <X className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                  {formData.phone && !isMobileValid && (
                    <p className="text-xs text-red-500 mt-1">
                      Please enter a valid 10-digit mobile number
                    </p>
                  )}
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
                      placeholder="Create a strong password"
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
                  
                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Password Strength:</span>
                        <span className={`text-xs font-medium ${getPasswordStrengthColor(passwordValidation.strength)}`}>
                          {getPasswordStrengthText(passwordValidation.strength)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className={`flex items-center space-x-1 ${passwordValidation.criteria.length ? 'text-green-600' : 'text-red-500'}`}>
                          {passwordValidation.criteria.length ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                          <span>8+ characters</span>
                        </div>
                        <div className={`flex items-center space-x-1 ${passwordValidation.criteria.uppercase ? 'text-green-600' : 'text-red-500'}`}>
                          {passwordValidation.criteria.uppercase ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                          <span>Uppercase</span>
                        </div>
                        <div className={`flex items-center space-x-1 ${passwordValidation.criteria.lowercase ? 'text-green-600' : 'text-red-500'}`}>
                          {passwordValidation.criteria.lowercase ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                          <span>Lowercase</span>
                        </div>
                        <div className={`flex items-center space-x-1 ${passwordValidation.criteria.number ? 'text-green-600' : 'text-red-500'}`}>
                          {passwordValidation.criteria.number ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                          <span>Number</span>
                        </div>
                        <div className={`flex items-center space-x-1 ${passwordValidation.criteria.special ? 'text-green-600' : 'text-red-500'}`}>
                          {passwordValidation.criteria.special ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                          <span>Special char</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`pl-10 pr-10 bg-card/50 border-border/50 focus:border-primary transition-colors ${
                        formData.confirmPassword && formData.password !== formData.confirmPassword ? 'border-red-500' : ''
                      }`}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-xs text-red-500 mt-1">
                      Passwords do not match
                    </p>
                  )}
                </div>

                {/* Enhanced Robot Verification with Visual Captcha */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Human Verification</Label>
                  <div className="border border-border/50 rounded-lg p-4 bg-card/30">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Shield className={`w-5 h-5 ${robotVerified ? 'text-green-500' : 'text-muted-foreground'}`} />
                        <span className="text-sm font-medium">
                          {robotVerified ? 'Verified' : 'Please verify you are not a robot'}
                        </span>
                      </div>
                      {robotVerified && (
                        <Check className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                    
                    {!robotVerified && (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 border border-gray-300 rounded font-mono text-lg tracking-wider select-none"
                            style={{
                              background: 'linear-gradient(45deg, #be972cff, #99572bff)',
                              fontFamily: 'monospace',
                              fontSize: '18px',
                              letterSpacing: '4px',
                              textDecoration: 'line-through',
                              textDecorationStyle: 'wavy',
                              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                            }}
                          >
                            {captchaCode}
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={generateCaptcha}
                            className="p-2"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Input
                            id="captcha"
                            type="text"
                            placeholder="Enter the code above"
                            value={userCaptchaInput}
                            onChange={(e) => setUserCaptchaInput(e.target.value)}
                            maxLength={6}
                            className={`
                              bg-card/50 border-border/50 focus:border-primary transition-colors
                              flex-1 
                            `}
                            required
                          />

                          <Button
                            type="button"
                            onClick={verifyCaptcha}
                            disabled={userCaptchaInput.length !== 6}
                            className="px-4 py-2 bg-primary hover:bg-primary/90"
                          >
                            Verify
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Terms and Conditions Checkbox */}
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-4 border border-border/50 rounded-lg bg-card/30">
                    <Checkbox
                      id="terms-checkbox"
                      checked={termsAccepted}
                      onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary mt-0.5"
                    />
                    <div className="flex-1">
                      <Label 
                        htmlFor="terms-checkbox" 
                        className="text-sm cursor-pointer leading-relaxed"
                      >
                        I agree to the{' '}
                        <Link 
                          to="/terms" 
                          className="text-primary hover:text-primary-glow underline"
                          target="_blank"
                        >
                          Terms and Conditions
                        </Link>
                        {' '}and{' '}
                        <Link 
                          to="/privacy" 
                          className="text-primary hover:text-primary-glow underline"
                          target="_blank"
                        >
                          Privacy Policy
                        </Link>
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        By creating an account, you agree to our terms of service and privacy policy.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="w-full bg-gradient-professional hover:opacity-90 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
                  disabled={isLoading || !robotVerified || !termsAccepted}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
                
                <div className="text-center text-xs sm:text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link
                    to="/sign-in"
                    className="text-primary hover:text-primary-glow transition-colors font-medium"
                  >
                    Sign in here
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
      </div>
    
  );
};

export default SignUpPage;