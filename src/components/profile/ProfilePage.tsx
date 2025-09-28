import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, User, Save, Edit3, Sparkles, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, userProfile, refreshProfile } = useAuth();

  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    dateOfBirth: '',
    gender: '',
    currentClass: '',
    schoolName: '',
    city: '',
    state: '',
    interests: '',
    aspirations: '',
  });

  // Load profile data on component mount
  useEffect(() => {
    if (userProfile && user) {
      // Check if mobile is missing but available in user metadata
      const phoneFromMetadata = user.user_metadata?.phone;
      const shouldUpdateMobile = !userProfile.mobile && phoneFromMetadata;

      // Debug logging
      console.log('Profile Debug:', {
        profileMobile: userProfile.mobile,
        metadataPhone: phoneFromMetadata,
        shouldUpdate: shouldUpdateMobile,
        userMetadata: user.user_metadata
      });

      setProfileData({
        fullName: userProfile.name || '',
        email: user?.email || '',
        mobile: userProfile.mobile || phoneFromMetadata || '',
        dateOfBirth: userProfile.academic_info?.dateOfBirth || '',
        gender: userProfile.academic_info?.gender || '',
        currentClass: userProfile.academic_info?.currentClass || '',
        schoolName: userProfile.academic_info?.schoolName || '',
        city: userProfile.academic_info?.city || '',
        state: userProfile.academic_info?.state || '',
        interests: userProfile.academic_info?.interests || '',
        aspirations: userProfile.academic_info?.aspirations || '',
      });
      setDataLoading(false);

      // Auto-update profile with mobile from metadata if missing
      if (shouldUpdateMobile) {
        updateMobileFromMetadata(phoneFromMetadata);
      }

      // Auto-enable editing for first-time users
      if (!userProfile.profile_completed) {
        setIsEditing(true);
      }
    }
  }, [userProfile, user]);

  // Function to update mobile number from user metadata
  const updateMobileFromMetadata = async (phone: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ mobile: phone })
        .eq('user_id', user!.id);

      if (error) {
        console.error('Error updating mobile from metadata:', error);
        toast({
          variant: "destructive",
          title: "Update Failed",
          description: "Could not update mobile number from sign-up data.",
        });
      } else {
        // Refresh profile to get updated data
        await refreshProfile();
        console.log('Mobile number updated from sign-up data');
        toast({
          title: "Mobile Updated",
          description: "Mobile number has been retrieved from your sign-up data.",
        });
      }
    } catch (error) {
      console.error('Error updating mobile from metadata:', error);
    }
  };

  // Function to manually fetch mobile from user metadata
  const fetchMobileFromMetadata = async () => {
    if (!user) return;

    try {
      // Get fresh user data
      const { data: { user: freshUser }, error } = await supabase.auth.getUser();
      
      if (error) {
        throw error;
      }

      const phoneFromMetadata = freshUser?.user_metadata?.phone;
      
      if (phoneFromMetadata && !userProfile?.mobile) {
        await updateMobileFromMetadata(phoneFromMetadata);
      } else if (!phoneFromMetadata) {
        toast({
          variant: "destructive",
          title: "No Mobile Found",
          description: "No mobile number found in your sign-up data. Please enter it manually.",
        });
      } else {
        toast({
          title: "Already Updated",
          description: "Mobile number is already available in your profile.",
        });
      }
    } catch (error) {
      console.error('Error fetching mobile from metadata:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not retrieve mobile number from sign-up data.",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData({
      ...profileData,
      [field]: value
    });
  };

  const handleSave = async () => {
    if (!user) return;

    setIsLoading(true);

    try {
      // Prepare academic info object
      const academic_info = {
        dateOfBirth: profileData.dateOfBirth,
        gender: profileData.gender,
        currentClass: profileData.currentClass,
        schoolName: profileData.schoolName,
        city: profileData.city,
        state: profileData.state,
        interests: profileData.interests,
        aspirations: profileData.aspirations,
      };

      // Update profile in database
      const { error } = await supabase
        .from('profiles')
        .update({
          name: profileData.fullName,
          mobile: profileData.mobile,
          academic_info: academic_info,
          profile_completed: true,
        })
        .eq('user_id', user.id);

      if (error) {
        throw error;
      }

      // Refresh profile data
      await refreshProfile();

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated. You can now access all features!",
      });

      setIsEditing(false);

      // If this was first-time completion, redirect to dashboard
      if (!userProfile?.profile_completed) {
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original values
    if (userProfile) {
      setProfileData({
        fullName: userProfile.name || '',
        email: user?.email || '',
        mobile: userProfile.mobile || '',
        dateOfBirth: userProfile.academic_info?.dateOfBirth || '',
        gender: userProfile.academic_info?.gender || '',
        currentClass: userProfile.academic_info?.currentClass || '',
        schoolName: userProfile.academic_info?.schoolName || '',
        city: userProfile.academic_info?.city || '',
        state: userProfile.academic_info?.state || '',
        interests: userProfile.academic_info?.interests || '',
        aspirations: userProfile.academic_info?.aspirations || '',
      });
    }
  };

  if (dataLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-effect border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 justify-between">

            {/* Left: Dashboard Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="hover:bg-card/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Dashboard
            </Button>

            {/* Right: Profile Settings */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-lg font-bold font-space-grotesk">Profile Settings</h1>
            </div>
          </div>
        </div>
      </header>


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Profile Header */}
          <div className="text-center animate-slide-up">
            <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-glow">
              <User className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold font-space-grotesk">{profileData.fullName || 'Student'}</h2>
            <p className="text-muted-foreground">
              {userProfile?.profile_completed ? 'Profile Complete' : 'Profile Setup Required'}
            </p>
          </div>

          {/* Profile Form */}
          <Card className="glass-effect shadow-card animate-slide-up">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <CardTitle className="flex items-center space-x-2">

                    <span>Personal Information</span>
                  </CardTitle>
                  <CardDescription>
                    {isEditing ? 'Update your personal details' : 'View your profile information'}
                  </CardDescription>
                </div>
                {!isEditing ? (
                  <Button onClick={handleEdit} className="bg-gradient-primary hover:opacity-90">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="space-x-2">
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="bg-gradient-success hover:opacity-90"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={profileData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    disabled={!isEditing}
                    className="bg-card/50 border-border/50 focus:border-primary transition-colors"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    disabled={true}
                    className="bg-card/50 border-border/50 focus:border-primary transition-colors"
                  />
                  <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number *</Label>
                  <Input
                    id="mobile"
                    value={profileData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Enter your 10-digit mobile number"
                    className="bg-card/50 border-border/50 focus:border-primary transition-colors"
                    maxLength={10}
                    required
                  />
                  {!profileData.mobile && !isEditing && (
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">Mobile number not found</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={fetchMobileFromMetadata}
                        className="text-xs h-6 px-2"
                      >
                        Fetch from Sign-up
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={profileData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    disabled={!isEditing}
                    className="bg-card/50 border-border/50 focus:border-primary transition-colors"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <Select
                    value={profileData.gender}
                    onValueChange={(value) => handleInputChange('gender', value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="bg-card/50 border-border/50 focus:border-primary">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentClass">Current Class *</Label>
                  <Select
                    value={profileData.currentClass}
                    onValueChange={(value) => handleInputChange('currentClass', value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="bg-card/50 border-border/50 focus:border-primary">
                      <SelectValue placeholder="Select current class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10th">10th Standard</SelectItem>
                      <SelectItem value="11th">11th Standard</SelectItem>
                      <SelectItem value="12th">12th Standard</SelectItem>
                      <SelectItem value="graduated">Graduated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Academic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold font-space-grotesk">Academic Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="schoolName">School/Institution Name *</Label>
                    <Input
                      id="schoolName"
                      value={profileData.schoolName}
                      onChange={(e) => handleInputChange('schoolName', e.target.value)}
                      disabled={!isEditing}
                      className="bg-card/50 border-border/50 focus:border-primary transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={profileData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      disabled={!isEditing}
                      className="bg-card/50 border-border/50 focus:border-primary transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="state">State *</Label>
                    <Select
                      value={profileData.state}
                      onValueChange={(value) => handleInputChange('state', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="bg-card/50 border-border/50 focus:border-primary">
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                        <SelectItem value="Delhi">Delhi</SelectItem>
                        <SelectItem value="Karnataka">Karnataka</SelectItem>
                        <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                        <SelectItem value="Gujarat">Gujarat</SelectItem>
                        <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                        <SelectItem value="West Bengal">West Bengal</SelectItem>
                        <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                        <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
                        <SelectItem value="Bihar">Bihar</SelectItem>
                        <SelectItem value="Madhya Pradesh">Madhya Pradesh</SelectItem>
                        <SelectItem value="Odisha">Odisha</SelectItem>
                        <SelectItem value="Punjab">Punjab</SelectItem>
                        <SelectItem value="Kerala">Kerala</SelectItem>
                        <SelectItem value="Haryana">Haryana</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Interests and Aspirations */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold font-space-grotesk">Interests & Goals</h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="interests">Areas of Interest *</Label>
                    <Textarea
                      id="interests"
                      value={profileData.interests}
                      onChange={(e) => handleInputChange('interests', e.target.value)}
                      disabled={!isEditing}
                      placeholder="e.g., Science, Technology, Arts, Sports, Mathematics..."
                      className="bg-card/50 border-border/50 focus:border-primary transition-colors resize-none"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="aspirations">Career Aspirations *</Label>
                    <Textarea
                      id="aspirations"
                      value={profileData.aspirations}
                      onChange={(e) => handleInputChange('aspirations', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Share your career goals and what you hope to achieve..."
                      className="bg-card/50 border-border/50 focus:border-primary transition-colors resize-none"
                      rows={4}
                      required
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Card */}
          <Card className="glass-effect shadow-card animate-slide-up">
            <CardHeader>
              <CardTitle>Profile Completion Status</CardTitle>
              <CardDescription>
                {userProfile?.profile_completed
                  ? "Your profile is complete! You now have access to all features."
                  : "Complete your profile to unlock personalized career guidance"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Profile Status</span>
                  <span className="text-sm text-muted-foreground">
                    {userProfile?.profile_completed ? '100% Complete' : '25% Complete'}
                  </span>
                </div>
                <div className="w-full bg-muted/20 rounded-full h-2">
                  <div
                    className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: userProfile?.profile_completed ? '100%' : '25%' }}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Basic Information</span>
                    <span className={userProfile?.profile_completed ? "text-success" : "text-warning"}>
                      {userProfile?.profile_completed ? "✓ Complete" : "⚡ Required"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Academic Details</span>
                    <span className={userProfile?.profile_completed ? "text-success" : "text-warning"}>
                      {userProfile?.profile_completed ? "✓ Complete" : "⚡ Required"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Interests & Goals</span>
                    <span className={userProfile?.profile_completed ? "text-success" : "text-warning"}>
                      {userProfile?.profile_completed ? "✓ Complete" : "⚡ Required"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Technical Analysis</span>
                    <span className={userProfile?.smart_analysis_completed ? "text-success" : "text-muted-foreground"}>
                      {userProfile?.smart_analysis_completed ? "✓ Complete" : "◦ Available after profile completion"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;