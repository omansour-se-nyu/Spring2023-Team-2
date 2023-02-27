import { ChakraProvider } from '@chakra-ui/react';
import { AppContext } from './context/AppContext';
import { useState } from 'react';
import LoginPage from './LoginPage';
import NoAccess from './NoAccess';

function App() {
  const [isAdmin, setIsAdmin] = useState(true);
  const [isStaff, setIsStaff] = useState(false);

  return (
    <ChakraProvider>
      <AppContext.Provider value={{ isAdmin, setIsAdmin, isStaff, setIsStaff }}>
        <NoAccess />
      </AppContext.Provider>
    </ChakraProvider>
  );
}

export default App;
