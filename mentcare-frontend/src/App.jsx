import { AppContext } from './context/AppContext';
import { useState } from 'react';
import LoginPage from './LoginPage';

// test Staff Dashboard
import StaffDashboard from './StaffDashboard';

function App() {
  const [isAdmin, setIsAdmin] = useState(true);
  const [isStaff, setIsStaff] = useState(false);

  return (
    <AppContext.Provider value={{ isAdmin, setIsAdmin, isStaff, setIsStaff }}>
      <LoginPage />
    </AppContext.Provider>
  );
}

export default App;
