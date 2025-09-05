import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Star, Users, Calendar, ExternalLink, Phone, Mail } from 'lucide-react';

interface College {
  id: string;
  name: string;
  location: string;
  rating: number;
  students: number;
  established: number;
  courses: string[];
  cutoff: string;
  distance: string;
  facilities: string[];
  contact: {
    phone: string;
    email: string;
    website: string;
  };
}

interface RecommendationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  field: string;
}

const mockColleges: College[] = [
  {
    id: "1",
    name: "Government Engineering College, Mumbai",
    location: "Mumbai, Maharashtra",
    rating: 4.5,
    students: 2500,
    established: 1962,
    courses: ["Computer Science", "Electronics", "Mechanical", "Civil"],
    cutoff: "85% (General Category)",
    distance: "2.5 km from you",
    facilities: ["Library", "Labs", "Hostel", "Sports Complex", "Wi-Fi"],
    contact: {
      phone: "+91 22 1234 5678",
      email: "admissions@gecmumbai.edu.in",
      website: "www.gecmumbai.edu.in"
    }
  },
  {
    id: "2",
    name: "Government Medical College, Mumbai",
    location: "Mumbai, Maharashtra", 
    rating: 4.7,
    students: 800,
    established: 1845,
    courses: ["MBBS", "MD", "MS", "Diploma Courses"],
    cutoff: "600+ NEET Score",
    distance: "5.2 km from you",
    facilities: ["Hospital", "Library", "Research Labs", "Hostel", "Cafeteria"],
    contact: {
      phone: "+91 22 9876 5432",
      email: "dean@gmcmumbai.edu.in", 
      website: "www.gmcmumbai.edu.in"
    }
  },
  {
    id: "3",
    name: "Government Polytechnic Institute",
    location: "Mumbai, Maharashtra",
    rating: 4.2,
    students: 1200,
    established: 1975,
    courses: ["Diploma in Engineering", "Vocational Courses", "Skill Development"],
    cutoff: "60% (Class 10th)",
    distance: "3.8 km from you",
    facilities: ["Workshops", "Computer Labs", "Placement Cell", "Library"],
    contact: {
      phone: "+91 22 5555 6666",
      email: "info@gpimumbai.edu.in",
      website: "www.gpimumbai.edu.in"
    }
  }
];

const RecommendationsModal = ({ isOpen, onClose, field }: RecommendationsModalProps) => {
  const handleViewDetails = (collegeId: string) => {
    // TODO: Navigate to detailed college page or show coming soon
    console.log('View details for college:', collegeId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto glass-effect">
        <DialogHeader>
          <DialogTitle className="text-2xl font-space-grotesk">
            Recommended Colleges for {field}
          </DialogTitle>
          <DialogDescription>
            Based on your quiz results and location, here are the best government colleges for you
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {mockColleges.map((college) => (
            <Card key={college.id} className="glass-effect hover:shadow-card transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <CardTitle className="text-lg font-space-grotesk">{college.name}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{college.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-warning fill-warning" />
                        <span>{college.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{college.students} students</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Est. {college.established}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-success/20 text-success">
                    {college.distance}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Available Courses</h4>
                      <div className="flex flex-wrap gap-2">
                        {college.courses.map((course) => (
                          <Badge key={course} variant="outline" className="text-xs">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Cutoff</h4>
                      <p className="text-sm text-muted-foreground">{college.cutoff}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Facilities</h4>
                      <div className="flex flex-wrap gap-2">
                        {college.facilities.map((facility) => (
                          <Badge key={facility} variant="secondary" className="text-xs">
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Contact Info</h4>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-3 h-3" />
                          <span>{college.contact.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-3 h-3" />
                          <span>{college.contact.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-border/50">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDetails(college.id)}
                    className="glass-effect"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      Save
                    </Button>
                    <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                      Apply Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            Showing {mockColleges.length} colleges near you
          </p>
          <div className="space-x-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button className="bg-gradient-primary hover:opacity-90">
              View All on Map
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecommendationsModal;