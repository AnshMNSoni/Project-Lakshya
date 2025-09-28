import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Sparkles, 
  User, 
  LogOut, 
  Settings, 
  Menu, 
  Brain,
  BookOpen,
  MapPin,
  Target
} from 'lucide-react';
import { AnimatedThemeToggler } from '@/magicui/animated-theme-toggler';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProfessionalNavbarProps {
  isAuthenticated?: boolean;
  hideAuthOptions?: boolean; // Controls visibility of auth options
}

const ProfessionalNavbar = ({ isAuthenticated = false, hideAuthOptions = false }: ProfessionalNavbarProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    // TODO: Implement logout logic with Supabase
    window.location.href = '/';
  };

  const features = [
    {
      title: 'Technical Analysis',
      description: 'AI-powered personality and career assessment',
      href: '/smart-analysis',
      icon: Brain,
    },
    {
      title: 'Career Quiz',
      description: 'Discover your ideal career path',
      href: '/quiz',
      icon: BookOpen,
    },
    {
      title: 'College Explorer',
      description: 'Find colleges that match your profile',
      href: '/college-map',
      icon: MapPin,
    },
    {
      title: 'Recommendations',
      description: 'Personalized college suggestions',
      href: '/recommendations',
      icon: Target,
    },
  ];

  const NavLinks = ({ mobile = false, onItemClick }: { mobile?: boolean; onItemClick?: () => void }) => (
    <NavigationMenuItem>
      <NavigationMenuLink
        asChild
        className={cn(
          'text-foreground hover:text-primary transition-colors',
          isActive('/') && 'text-primary'
        )}
      >
        {/* <Link to="/" onClick={onItemClick}>Home</Link> */}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );

  return (
    <header className="glass-effect border-b border-border/50 sticky top-0 z-50 backdrop-blur-xl bg-background/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-professional rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold font-space-grotesk text-foreground">
                  Lakshya
                </span>
                <span className="text-xs text-muted-foreground -mt-1">Career Guidance</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                {isAuthenticated && (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-foreground hover:text-primary">
                      Features
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-4 w-[400px] lg:w-[500px] lg:grid-cols-2">
                        {features.map((feature) => (
                          <NavigationMenuLink key={feature.href} asChild>
                            <Link
                              to={feature.href}
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="flex items-center space-x-3 mb-2">
                                <feature.icon className="w-5 h-5 text-primary" />
                                <div className="text-sm font-medium leading-none">
                                  {feature.title}
                                </div>
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {feature.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )}
                <NavLinks />
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle - Always visible */}
            <AnimatedThemeToggler className="h-8 w-8" />

            {!hideAuthOptions && (
              <div className="flex items-center space-x-2">
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
                        <SheetContent side="right" className="w-[300px] glass-effect bg-background/95">
                          <div className="flex flex-col space-y-4 mt-8">
                            <div className="pb-4 border-b border-border/20">
                              <h3 className="font-semibold text-sm text-muted-foreground mb-3">Features</h3>
                              {features.map((feature) => (
                                <Link
                                  key={feature.href}
                                  to={feature.href}
                                  className="flex items-center px-3 py-2 text-base font-medium hover:text-primary transition-colors"
                                  onClick={() => setIsOpen(false)}
                                >
                                  <feature.icon className="w-4 h-4 mr-2" />
                                  {feature.title}
                                </Link>
                              ))}
                            </div>
                            <div className="pb-4 border-b border-border/20">
                              <h3 className="font-semibold text-sm text-muted-foreground mb-3">Navigation</h3>
                              <NavLinks mobile onItemClick={() => setIsOpen(false)} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-sm text-muted-foreground mb-3">Account</h3>
                              <Link 
                                to="/profile" 
                                className="flex items-center px-3 py-2 text-base font-medium hover:text-primary transition-colors"
                                onClick={() => setIsOpen(false)}
                              >
                                <User className="w-4 h-4 mr-2" />
                                Profile
                              </Link>
                              <Link 
                                to="/settings" 
                                className="flex items-center px-3 py-2 text-base font-medium hover:text-primary transition-colors"
                                onClick={() => setIsOpen(false)}
                              >
                                <Settings className="w-4 h-4 mr-2" />
                                Settings
                              </Link>
                              <button 
                                onClick={() => { handleLogout(); setIsOpen(false); }}
                                className="flex items-center px-3 py-2 text-base font-medium hover:text-destructive transition-colors text-left w-full"
                              >
                                <LogOut className="w-4 h-4 mr-2" />
                                Log out
                              </button>
                            </div>
                          </div>
                        </SheetContent>
                      </Sheet>
                    )}

                    {/* Profile Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-2 ring-primary/20 hover:ring-primary/40 transition-all">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="" alt="Profile" />
                            <AvatarFallback className="bg-gradient-professional text-white text-sm font-semibold">
                              U
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 glass-effect bg-background/95 border-border/20" align="end">
                        <DropdownMenuItem asChild>
                          <Link to="/profile" className="flex items-center cursor-pointer">
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/settings" className="flex items-center cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Log out</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : (
                  <>
                    {/* Mobile Menu Button */}
                    {isMobile ? (
                      <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Menu className="h-5 w-5" />
                          </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[280px] glass-effect bg-background/95">
                          <div className="flex flex-col space-y-4 mt-8">
                            <NavLinks mobile onItemClick={() => setIsOpen(false)} />
                            <hr className="border-border/20" />
                            <Link 
                              to="/sign-in"
                              className="flex items-center px-3 py-2 text-base font-medium hover:text-primary transition-colors"
                              onClick={() => setIsOpen(false)}
                            >
                              Sign In
                            </Link>
                            <Link 
                              to="/sign-up"
                              className="flex items-center px-3 py-2 text-base font-medium bg-gradient-professional text-white rounded-lg text-center justify-center"
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
                          <Button variant="ghost" size="sm" className="font-medium">
                            Sign In
                          </Button>
                        </Link>
                        <Link to="/sign-up">
                          <Button size="sm" className="bg-gradient-professional hover:opacity-90 shadow-lg">
                            Get Started
                          </Button>
                        </Link>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProfessionalNavbar;