import { Link } from 'react-router-dom';
import { Sparkles, Github, Twitter, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card/30 border-t border-border/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold font-space-grotesk gradient-text">
                EduGuide
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              AI-powered digital guidance platform helping students make informed education decisions and discover their perfect career path.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Quick Access</h3>
            <nav className="space-y-2">
              <Link to="/dashboard" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Link to="/analysis" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Analysis
              </Link>
              <Link to="/quiz" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Career Quiz
              </Link>
              <Link to="/recommendations" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Recommendations
              </Link>
              <Link to="/college-map" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                College Map
              </Link>
            </nav>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Features</h3>
            <nav className="space-y-2">
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
              <Link to="/privacy" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>support@eduguide.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+91 12345 67890</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <a href="#" className="p-2 text-muted-foreground hover:text-primary transition-colors glass-effect rounded-lg">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 text-muted-foreground hover:text-primary transition-colors glass-effect rounded-lg">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 text-muted-foreground hover:text-primary transition-colors glass-effect rounded-lg">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/50">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">
              © 2025 EduGuide. All rights reserved. Made for Smart India Hackathon.
            </p>
            <p className="text-xs text-muted-foreground mt-2 sm:mt-0">
              Empowering students through AI-powered guidance
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;