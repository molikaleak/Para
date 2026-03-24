import { NavLink } from 'react-router-dom';
import { Home, Search, User } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const BottomNav = () => {
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: User, label: 'Account', path: '/account' },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md md:bottom-0 md:left-0 md:top-0 md:translate-x-0 md:w-64 md:h-screen md:flex-col md:justify-start md:gap-4 md:rounded-none md:border-r md:border-surface-highest md:shadow-none md:bg-surface-low glass md:glass-none rounded-3xl py-4 px-8 md:px-6 md:py-10 z-50 flex items-center justify-between border-none shadow-2xl shadow-black/40 transition-all duration-300">
      <div className="hidden md:block w-full mb-8 px-4">
        <h2 className="text-xl font-bold font-display text-primary tracking-wide">Para<span className="text-on-surface">Systems</span></h2>
        <p className="text-xs text-on-surface-variant mt-1">Verdant Terminal</p>
      </div>
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            twMerge(
              'flex flex-col md:flex-row items-center md:justify-start gap-1 md:gap-4 md:px-4 md:py-3 md:w-full md:rounded-xl transition-all duration-300',
              isActive ? 'text-primary md:bg-primary/10' : 'text-on-surface-variant md:hover:bg-surface-high'
            )
          }
        >
          <item.icon size={24} className="md:w-5 md:h-5" />
          <span className="text-xs md:text-sm font-medium font-manrope">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
