import { useContext } from 'react';
import { HStack, VStack, Text, Image } from '@chakra-ui/react';
import { StaffContext } from '../context/StaffContext';
import MenuText from '../../AdminPage/Menu/MenuText';
import { v4 as uuid } from 'uuid';
import userPng from '../../assets/user.png';

const Nav = () => {
  const navText = ['Overview', 'Patients', 'Database', 'Logout'];

  const {
    overviewPage,
    setOverviewPage,
    patientManagementPage,
    setPatientManagementPage,
    databasePage,
    setDatabasePage,
    logoutPage,
  } = useContext(StaffContext);

  const navData = [
    { text: 'Overview', handleOnClick: () => setOverviewPage(true) },
    {
      text: 'Patients',
      handleOnClick: () => setPatientManagementPage(true),
    },
    {
      text: 'Database',
      handleOnClick: () => {},
    },
    { text: 'Logout', handleOnClick: () => {} },
  ];

  return (
    <>
      <HStack padding='10px'>
        <Image src={userPng} alt='user image png' height='80px' />
        <Text color='#FB5058' fontSize='4xl' fontWeight='bold'>
          staff
        </Text>
      </HStack>
      <VStack align='stretch' gap={5} padding='10px'>
        {navData.map(({ text, handleOnClick }) => {
          let onPage = false;
          if (overviewPage && text === 'Overview') onPage = true;
          else if (patientManagementPage && text === 'Patients') onPage = true;
          else if (databasePage && text === 'Database') onPage = true;
          else if (logoutPage && text === 'Logout') onPage = true;
          return (
            <MenuText
              key={uuid()}
              text={text}
              onPage={onPage}
              handleOnClick={handleOnClick}
            />
          );
        })}
      </VStack>
    </>
  );
};

export default Nav;
