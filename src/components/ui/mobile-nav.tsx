import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, Home, User, Brain, BookOpen, Map, Settings, LogOut } from 'lucide-react';

interface MobileNavProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

const MobileNav = ({ isAuthenticated = false, onLogout }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navigationLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: User, authRequired: true },
    { path: '/analysis', label: 'Analysis', icon: Brain, authRequired: true },
    { path: '/quiz', label: 'Quiz', icon: BookOpen, authRequired: true },
    { path: '/college-map', label: 'Colleges', icon: Map, authRequired: true },
  ];

  const closeMenu = () => setIsOpen(false);

  const filteredLinks = navigationLinks.filter(link => 
    !link.authRequired || (link.authRequired && isAuthenticated)
  );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="right" className="w-[300px] glass-effect border-border/20 backdrop-blur-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between py-4 border-b border-border/20">
            <h2 className="text-lg font-semibold">Navigation</h2>
            <Button variant="ghost" size="sm" onClick={closeMenu}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 py-6">
            <div className="space-y-2">
              {filteredLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={`flex items-center px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 ${
                    isActive(link.path) 
                      ? 'text-primary bg-primary/10 shadow-sm' 
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                  onClick={closeMenu}
                >
                  <link.icon className="mr-3 h-5 w-5" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-border/20 pt-4 pb-6">
            {isAuthenticated ? (
              <div className="space-y-2">
                <Link 
                  to="/profile" 
                  className="flex items-center px-4 py-3 text-base font-medium rounded-xl hover:text-primary hover:bg-primary/5 transition-all duration-200"
                  onClick={closeMenu}
                >
                  <User className="mr-3 h-5 w-5" />
                  Profile
                </Link>
                <Link 
                  to="/settings" 
                  className="flex items-center px-4 py-3 text-base font-medium rounded-xl hover:text-primary hover:bg-primary/5 transition-all duration-200"
                  onClick={closeMenu}
                >
                  <Settings className="mr-3 h-5 w-5" />
                  Settings
                </Link>
                <button 
                  onClick={() => { onLogout?.(); closeMenu(); }}
                  className="flex items-center w-full px-4 py-3 text-base font-medium rounded-xl hover:text-destructive hover:bg-destructive/5 transition-all duration-200"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Log out
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link 
                  to="/sign-in"
                  className="block px-4 py-3 text-base font-medium text-center rounded-xl border border-primary/20 hover:bg-primary/5 transition-all duration-200"
                  onClick={closeMenu}
                >
                  Sign In
                </Link>
                <Link 
                  to="/sign-up"
                  className="block px-4 py-3 text-base font-medium text-center bg-gradient-primary text-white rounded-xl hover:opacity-90 transition-opacity shadow-lg"
                  onClick={closeMenu}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;