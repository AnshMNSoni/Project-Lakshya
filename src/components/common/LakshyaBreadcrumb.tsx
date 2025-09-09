import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDownIcon, SlashIcon, HomeIcon } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrum';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Route mapping for breadcrumb display
const routeMap: Record<string, { title: string; parent?: string }> = {
  '/': { title: 'Dashboard' },
  '/profile': { title: 'Profile', parent: '/' },
  '/quiz': { title: 'Interest Quiz', parent: '/' },
  '/analysis': { title: 'Analysis', parent: '/' },
  '/smart-analysis': { title: 'Smart Analysis', parent: '/analysis' },
  '/colleges': { title: 'Colleges', parent: '/' },
  '/college-map': { title: 'College Map', parent: '/colleges' },
  '/college-recommendations': { title: 'Recommendations', parent: '/colleges' },
  '/about': { title: 'About', parent: '/' },
  '/contact': { title: 'Contact', parent: '/' },
};

export function ProjectBreadcrumb() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  // Build breadcrumb items based on current path
  const breadcrumbItems = [];
  
  // Always start with home/dashboard
  breadcrumbItems.push({
    href: '/',
    title: 'Dashboard',
    isHome: true
  });
  
  // Add path segments
  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const routeInfo = routeMap[currentPath];
    
    if (routeInfo) {
      breadcrumbItems.push({
        href: currentPath,
        title: routeInfo.title,
        isLast: index === pathSegments.length - 1
      });
    }
  });

  return (
    <div className="mb-6">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={item.href}>
              <BreadcrumbItem>
                {item.isLast ? (
                  <BreadcrumbPage className="flex items-center gap-2">
                    {item.title}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={item.href} className="flex items-center gap-2">
                      {item.isHome && <HomeIcon className="w-4 h-4" />}
                      {item.title}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadcrumbItems.length - 1 && (
                <BreadcrumbSeparator>
                  <SlashIcon />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

// Extended breadcrumb with dropdown for college-related pages
export function CollegeBreadcrumbWithDropdown() {
  const location = useLocation();
  
  return (
    <div className="mb-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" className="flex items-center gap-2">
                <HomeIcon className="w-4 h-4" />
                Dashboard
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5">
                Colleges
                <ChevronDownIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="glass-effect border border-border/50">
                <DropdownMenuItem asChild>
                  <Link to="/college-map" className="w-full">
                    Interactive Map
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/college-recommendations" className="w-full">
                    Recommendations
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/colleges" className="w-full">
                    Browse All
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>
              {location.pathname === '/college-map' && 'Interactive Map'}
              {location.pathname === '/college-recommendations' && 'Recommendations'}
              {location.pathname === '/colleges' && 'Browse All'}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

// Simple themed breadcrumb example
export function LakshyaBreadcrumb() {
  return (
    <div className="mb-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" className="flex items-center gap-2">
                <HomeIcon className="w-4 h-4" />
                Dashboard
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5">
                Features
                <ChevronDownIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="glass-effect border border-border/50">
                <DropdownMenuItem asChild>
                  <Link to="/quiz" className="w-full">
                    Interest Quiz
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/analysis" className="w-full">
                    Analysis
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/smart-analysis" className="w-full">
                    Smart Analysis
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Smart Analysis</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
