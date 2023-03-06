import { ChakraProvider } from '@chakra-ui/react';
import { AppContext } from './context/AppContext';
import { useState } from 'react';
import LoginPage from './LoginPage';

// test Staff Dashboard
import StaffDashboard from './StaffDashboard';

function App() {
  const [isAdmin, setIsAdmin] = useState(true);
  const [isStaff, setIsStaff] = useState(false);

  return (
    <ChakraProvider>
      <AppContext.Provider value={{ isAdmin, setIsAdmin, isStaff, setIsStaff }}>
        <StaffDashboard />
      </AppContext.Provider>
    </ChakraProvider>
  );
}

export default App;
