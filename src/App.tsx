import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { useThemeStore } from './store/themeStore';
import Login from './pages/Login';
import Home from './pages/Home';
import Search from './pages/Search';
import ItemDetail from './pages/ItemDetail';
import Account from './pages/Account';
import Insights from './pages/Insights';
import BottomNav from './components/BottomNav';

function App() {
  const { isAuthenticated } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <div className="min-h-screen bg-surface text-on-surface font-manrope pb-24 md:pb-0 md:pl-64 w-full">
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/search" element={isAuthenticated ? <Search /> : <Navigate to="/login" />} />
          <Route path="/item/:id" element={isAuthenticated ? <ItemDetail /> : <Navigate to="/login" />} />
          <Route path="/account" element={isAuthenticated ? <Account /> : <Navigate to="/login" />} />
          <Route path="/insights" element={isAuthenticated ? <Insights /> : <Navigate to="/login" />} />
        </Routes>
        
        {isAuthenticated && <BottomNav />}
      </div>
    </Router>
  );
}

export default App;
