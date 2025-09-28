import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Check,
  X,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ProfessionalNavbar from "@/components/layout/ProfessionalNavbar";

const SignUpPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [robotVerified, setRobotVerified] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [captchaTheme, setCaptchaTheme] = useState<"light" | "dark">("light");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const { toast } = useToast();
  const navigate = useNavigate();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Detect theme for ReCAPTCHA safely
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setCaptchaTheme(isDark ? "dark" : "light");
  }, []);

  // reCAPTCHA handler
  const handleRecaptchaChange = (token: string | null) => {
    setRobotVerified(!!token);
  };

  // Password strength validation
  const validatePassword = (password: string) => {
    const criteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    const strength = Object.values(criteria).filter(Boolean).length;
    return { criteria, strength, isStrong: strength >= 4 };
  };

  // Mobile number validation (Indian format)
  const validateMobileNumber = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, "");
    return cleanPhone.length === 10 && /^[6-9]\d{9}$/.test(cleanPhone);
  };

  const passwordValidation = validatePassword(formData.password);
  const isMobileValid = validateMobileNumber(formData.phone);

  const resetRecaptcha = () => {
    recaptchaRef.current?.reset();
    setRobotVerified(false);
  };

  // Form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!robotVerified) {
      toast({
        variant: "destructive",
        title: "Verification Required",
        description: "Please complete the 'I'm not a robot' check.",
      });
      return;
    }

    if (!termsAccepted) {
      toast({
        variant: "destructive",
        title: "Terms Required",
        description: "Please accept the Terms and Conditions to continue",
      });
      resetRecaptcha();
      return;
    }

    if (!passwordValidation.isStrong) {
      toast({
        variant: "destructive",
        title: "Weak Password",
        description: "Please create a stronger password meeting all criteria",
      });
      resetRecaptcha();
      return;
    }

    if (!isMobileValid) {
      toast({
        variant: "destructive",
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number",
      });
      resetRecaptcha();
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Password Mismatch",
        description: "Passwords do not match",
      });
      resetRecaptcha();
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
          },
        },
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Sign Up Failed",
          description: error.message,
        });
        resetRecaptcha();
      } else {
        toast({
          title: "Account Created Successfully!",
          description: "Please check your email to verify your account.",
        });
        navigate("/sign-in");
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Sign Up Failed",
        description: "An unexpected error occurred. Please try again.",
      });
      resetRecaptcha();
    } finally {
      setIsLoading(false);
    }
  };

  // Input handler
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length <= 10) {
        setFormData({ ...formData, [name]: digitsOnly });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Password UI helpers
  const getPasswordStrengthColor = (strength: number) => {
    if (strength < 2) return "text-red-500";
    if (strength < 4) return "text-yellow-500";
    return "text-green-500";
  };

  const getPasswordStrengthText = (strength: number) => {
    if (strength < 2) return "Weak";
    if (strength < 4) return "Medium";
    return "Strong";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <ProfessionalNavbar hideAuthOptions={true} />
      <div className="min-h-screen flex">
        {/* Left side - Hero Image */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/SignupPic.jpg')" }}
          />
          <div className="absolute inset-0 bg-background/20 dark:bg-background/30" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-accent/30 to-primary/40 dark:from-primary/50 dark:via-accent/40 dark:to-primary/50" />
        </div>

        {/* Right side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center animate-slide-up">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center animate-glow">
                  <User className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold font-space-grotesk">
                Create Account
              </h2>
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
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="student@example.com"
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Mobile Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter 10-digit mobile number"
                        required
                        className={`pl-10 ${
                          formData.phone && !isMobileValid
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {formData.phone && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          {isMobileValid ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <X className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                    {formData.phone && !isMobileValid && (
                      <p className="text-xs text-red-500">
                        Please enter a valid 10-digit mobile number
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Create a strong password"
                        required
                        className="pl-10 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </Button>
                    </div>

                    {/* Strength */}
                    {formData.password && (
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Password Strength:</span>
                          <span
                            className={`${getPasswordStrengthColor(
                              passwordValidation.strength
                            )}`}
                          >
                            {getPasswordStrengthText(
                              passwordValidation.strength
                            )}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm your password"
                        required
                        className={`pl-10 pr-10 ${
                          formData.confirmPassword &&
                          formData.password !== formData.confirmPassword
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? <EyeOff /> : <Eye />}
                      </Button>
                    </div>
                    {formData.confirmPassword &&
                      formData.password !== formData.confirmPassword && (
                        <p className="text-xs text-red-500">
                          Passwords do not match
                        </p>
                      )}
                  </div>

                  {/* Captcha */}
                  <div className="space-y-2">
                    <Label>Human Verification</Label>
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                      onChange={handleRecaptchaChange}
                      theme={captchaTheme}
                    />
                  </div>

                  {/* Terms */}
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={termsAccepted}
                      onCheckedChange={(checked) =>
                        setTermsAccepted(checked === true)
                      }
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <Link
                        to="/privacy"
                        target="_blank"
                        className="text-primary underline"
                      >
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4">
                  <Button
                    type="submit"
                    disabled={isLoading || !robotVerified || !termsAccepted}
                    className="w-full bg-gradient-professional text-white"
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>

                  <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link
                      to="/sign-in"
                      className="text-primary font-medium underline"
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
