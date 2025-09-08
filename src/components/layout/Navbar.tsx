import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Sparkles, User, LogOut, Settings, Menu, X } from 'lucide-react';
import { AnimatedThemeToggler } from '@/magicui/animated-theme-toggler';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';

interface NavbarProps {
  isAuthenticated?: boolean;
}

const Navbar = ({ isAuthenticated = false }: NavbarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    // TODO: Implement logout logic with Supabase
    navigate('/');
  };

  const navigationLinks: any[] = []; // Navigation moved to dashboard

  const NavLinks = ({ mobile = false, onItemClick }: { mobile?: boolean; onItemClick?: () => void }) => (
    <>
      {navigationLinks.map((link) => (
        <Link 
          key={link.path}
          to={link.path} 
          className={`${mobile ? 'block px-3 py-2 text-base' : 'text-sm'} font-medium transition-colors hover:text-primary ${
            isActive(link.path) ? 'text-primary' : 'text-muted-foreground'
          }`}
          onClick={onItemClick}
        >
          {link.label}
        </Link>
      ))}
    </>
  );

  return (
    <header className="glass-effect border-b border-border/50 sticky top-0 z-50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Theme Toggle */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-3 hover-scale">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold font-space-grotesk gradient-text">
                Lakshya
              </span>
            </Link>
            
            {/* Theme Toggle - positioned next to logo */}
            <div className="hidden sm:block">
              <AnimatedThemeToggler className="h-8 w-8" />
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Mobile theme toggle */}
            <div className="sm:hidden">
              <AnimatedThemeToggler className="h-8 w-8" />
            </div>

            {isAuthenticated ? (
              <>
                {/* Mobile Menu Button */}
                {isMobile && (
                  <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="sm" className="md:hidden">
                        <Menu className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[280px] glass-effect">
                      <div className="flex flex-col space-y-4 mt-8">
                        <NavLinks mobile onItemClick={() => setIsOpen(false)} />
                        <hr className="border-border/20" />
                        <Link 
                          to="/profile" 
                          className="block px-3 py-2 text-base font-medium hover:text-primary transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          Profile
                        </Link>
                        <Link 
                          to="/settings" 
                          className="block px-3 py-2 text-base font-medium hover:text-primary transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          Settings
                        </Link>
                        <button 
                          onClick={() => { handleLogout(); setIsOpen(false); }}
                          className="block px-3 py-2 text-base font-medium hover:text-destructive transition-colors text-left"
                        >
                          Log out
                        </button>
                      </div>
                    </SheetContent>
                  </Sheet>
                )}

                {/* Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" alt="Profile" />
                        <AvatarFallback className="bg-gradient-primary text-white">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 glass-effect" align="end">
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                {/* Mobile Menu for Guest Users */}
                {isMobile ? (
                  <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Menu className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[280px] glass-effect">
                      <div className="flex flex-col space-y-4 mt-8">
                        <Link 
                          to="/sign-in"
                          className="block px-3 py-2 text-base font-medium hover:text-primary transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          Sign In
                        </Link>
                        <Link 
                          to="/sign-up"
                          className="block px-3 py-2 text-base font-medium bg-gradient-primary text-white rounded-lg text-center"
                          onClick={() => setIsOpen(false)}
                        >
                          Get Started
                        </Link>
                      </div>
                    </SheetContent>
                  </Sheet>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Link to="/sign-in">
                      <Button variant="ghost" size="sm">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/sign-up">
                      <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;