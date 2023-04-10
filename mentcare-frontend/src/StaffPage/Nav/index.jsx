import { useContext } from 'react';
import { HStack, VStack, Text, Image } from '@chakra-ui/react';
import { StaffContext } from '../context/StaffContext';
import StaffNavText from './StaffNavText';
import { v4 as uuid } from 'uuid';
import userPng from '../../assets/user.png';

const Nav = () => {
  const navText = [
    'Overview',
    'Patients',
    'Database',
    'Logout',
  ];

  const {
    overviewPage,
    patientViewPage,
    databasePage,
    logoutPage,
  } = useContext(StaffContext);

  return (
    <>
      <HStack padding='10px'>
        <Image src={userPng} alt='user image png' height='80px' />
        <Text color='#FB5058' fontSize='4xl' fontWeight='bold'>
          staff
        </Text>
      </HStack>
      <VStack align='stretch' gap={5} padding='10px'>
        {navText.map((text) => {
          let onPage = false;
          if (overviewPage && text === 'Overview')
            onPage = true;
          else if (patientViewPage && text === 'Patients')
            onPage = true;
          else if (databasePage && text === 'Database')
            onPage = true;
          else if (logoutPage && text === 'Logout')
            onPage = true;
          return <StaffNavText key={uuid()} text={text} onPage={onPage} />;
        })}
      </VStack>
    </>
  );
};

export default Nav;
