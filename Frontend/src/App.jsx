import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { getToken, logout } from './services/authService';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (getToken()) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isLoggedIn ? (
        <div>
          <div className="flex justify-end p-4">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
          <Dashboard />
        </div>
      ) : (
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;