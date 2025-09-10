import { Link } from 'react-router-dom';
import { Sparkles, Github, Twitter, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card/30 border-t border-border/50 mt-auto backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Logo & Description */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold font-space-grotesk gradient-text">
                Lakshya
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Smart AI-powered career guidance platform helping students discover their perfect Lakshya (goal) and make informed education decisions.
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
              <Link to="https://www.termsfeed.com/live/171d1911-9316-4cbe-9977-595878a79860" target="_blank" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
            
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Contact</h3>
            <div className="space-y-2">
              <a 
                href="mailto:support@lakshya.ai" 
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>anshsoni702@gmail.com</span>
              </a>
            
            </div>
            <div className="flex space-x-2">
              <a href="https://github.com/AnshMNSoni/Project-Lakshya/" target="_blank" className="p-2 text-muted-foreground hover:text-primary transition-colors glass-effect rounded-lg">
                <Github className="w-4 h-4" />
              </a>
              <a href="mailto:anshsoni702@gmail.com" className="p-2 text-muted-foreground hover:text-primary transition-colors glass-effect rounded-lg">
                <Mail className="w-4 h-4" />

              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border/50">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-xs text-muted-foreground">
              © 2025 Lakshya. All rights reserved. Made for Smart India Hackathon.
            </p>
            <p className="text-xs text-muted-foreground mt-2 sm:mt-0">
              Empowering students through smart AI guidance • Find your Lakshya
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;