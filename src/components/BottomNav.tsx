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
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md glass rounded-3xl py-4 px-8 z-50 flex items-center justify-between border-none shadow-2xl shadow-black/40">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            twMerge(
              'flex flex-col items-center gap-1 transition-all duration-300',
              isActive ? 'text-primary' : 'text-on-surface-variant'
            )
          }
        >
          <item.icon size={24} />
          <span className="text-xs font-medium font-manrope">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
