import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, User, Settings, LogOut } from 'lucide-react';

interface MobileMenuProps {
  isAuthenticated: boolean;
  onLogout: () => void;
  isActive: (path: string) => boolean;
}

const MobileMenu = ({ isAuthenticated, onLogout, isActive }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/college-map', label: 'Colleges' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        
        <SheetContent side="right" className="w-[280px] glass-effect border-border/20">
          <div className="flex flex-col space-y-4 mt-8">
            {isAuthenticated ? (
              <>
                {/* Navigation Links */}
                <div className="space-y-2">
                  {navigationLinks.map((link) => (
                    <Link 
                      key={link.path}
                      to={link.path} 
                      className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                        isActive(link.path) 
                          ? 'text-primary bg-primary/10' 
                          : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                      }`}
                      onClick={closeMenu}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                
                <hr className="border-border/20" />
                
                {/* Profile Links */}
                <div className="space-y-2">
                  <Link 
                    to="/profile" 
                    className="flex items-center px-3 py-2 text-base font-medium rounded-lg hover:text-primary hover:bg-primary/5 transition-colors"
                    onClick={closeMenu}
                  >
                    <User className="mr-3 h-4 w-4" />
                    Profile
                  </Link>
                  <Link 
                    to="/settings" 
                    className="flex items-center px-3 py-2 text-base font-medium rounded-lg hover:text-primary hover:bg-primary/5 transition-colors"
                    onClick={closeMenu}
                  >
                    <Settings className="mr-3 h-4 w-4" />
                    Settings
                  </Link>
                  <button 
                    onClick={() => { onLogout(); closeMenu(); }}
                    className="flex items-center px-3 py-2 text-base font-medium rounded-lg hover:text-destructive hover:bg-destructive/5 transition-colors w-full text-left"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Log out
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <Link 
                  to="/sign-in"
                  className="block px-3 py-2 text-base font-medium text-center rounded-lg border border-primary/20 hover:bg-primary/5 transition-colors"
                  onClick={closeMenu}
                >
                  Sign In
                </Link>
                <Link 
                  to="/sign-up"
                  className="block px-3 py-2 text-base font-medium text-center bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity"
                  onClick={closeMenu}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;