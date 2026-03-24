import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { User, LogOut, Moon, Sun } from 'lucide-react';

const Account = () => {
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className="p-8 max-w-lg md:max-w-5xl md:mx-0 md:pl-12 bg-surface min-h-screen w-full mx-auto">
      <header className="mb-12 pt-8 text-center md:text-left">
        <h1 className="text-3xl font-bold font-display text-on-surface mb-2">Account Settings</h1>
        <p className="text-on-surface-variant">Manage your warehouse profile</p>
      </header>

      {/* Profile Header */}
      <div className="bg-surface-low rounded-[2rem] p-8 mb-10 flex items-center gap-6 border-none text-on-surface">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary border-2 border-primary/30 shrink-0">
          <User size={40} />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-display text-on-surface">{user?.name}</h2>
          <p className="text-on-surface-variant font-medium">{user?.email}</p>
          <div className="mt-2 px-3 py-1 bg-surface-high rounded-full text-[10px] font-bold text-primary inline-flex items-center gap-1 uppercase tracking-wider">
            Admin Access
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <button 
          onClick={toggleTheme}
          className="w-full h-16 rounded-2xl bg-surface-low text-on-surface font-bold flex items-center justify-between px-6 transition-all active:scale-95"
        >
          <div className="flex items-center gap-3">
            {theme === 'dark' ? <Sun size={22} className="text-amber-400" /> : <Moon size={22} className="text-indigo-400" />}
            <span>{theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
          </div>
        </button>

        <button 
          onClick={logout}
          className="w-full h-16 rounded-2xl bg-surface-low text-error font-bold flex items-center justify-center gap-3 transition-all active:scale-95"
        >
          <LogOut size={22} />
          Sign Out of Terminal
        </button>
      </div>
    </div>
  );
};

export default Account;
