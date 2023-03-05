import { Flex, Stack, Button } from '@chakra-ui/react';
import MentcareLogo from '../../assets/MentcareLogo';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';

const LeftPanel = () => {
  const { isAdmin, setIsAdmin, isStaff, setIsStaff } = useContext(AppContext);

  const handleClickUser = (e) => {
    const user = e.target.innerText;
    if (user === 'staff') {
      setIsStaff((value) => true);
      setIsAdmin((value) => false);
    } else if (user === 'admin') {
      setIsStaff((value) => false);
      setIsAdmin((value) => true);
    }
  };

  return (
    <Flex
      height='100%'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
    >
      <MentcareLogo />
      <Stack direction='row' gap='20px'>
        <Button
          borderRadius='80px'
          width='100px'
          backgroundColor='#EC408B'
          color='#FFFFFF'
          opacity={isStaff ? '100%' : '50%'}
          fontweight='medium'
          onClick={handleClickUser}
        >
          staff
        </Button>
        <Button
          borderRadius='80px'
          width='100px'
          backgroundColor='#EC408B'
          color='#FFFFFF'
          opacity={isAdmin ? '100%' : '50%'}
          fontWeight='medium'
          onClick={handleClickUser}
        >
          admin
        </Button>
      </Stack>
    </Flex>
  );
};

export default LeftPanel;
