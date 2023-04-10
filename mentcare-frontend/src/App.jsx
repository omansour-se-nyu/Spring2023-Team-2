import { AppContext } from './context/AppContext';
import { useState } from 'react';
import LoginPage from './LoginPage';

// test
import StaffPage from './StaffPage';

function App() {
  const [isAdmin, setIsAdmin] = useState(true);
  const [isStaff, setIsStaff] = useState(false);

  return (
    <AppContext.Provider value={{ isAdmin, setIsAdmin, isStaff, setIsStaff }}>
      <StaffPage />
    </AppContext.Provider>
  );
}

export default App;
