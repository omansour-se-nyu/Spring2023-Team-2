import { useContext } from 'react';
import { HStack, VStack, Text } from '@chakra-ui/react';
import { AdminContext } from '../context/AdminContext';
import MenuText from './MenuText';
import { v4 as uuid } from 'uuid';

const Menu = () => {
  const menuText = [
    'Overview',
    'User Management',
    'Settings',
    'Monthly Reports',
    'HIPPA Compliance',
  ];

  const {
    overviewPage,
    userManagementPage,
    settingsPage,
    monthlyReportsPage,
    compliancePage,
  } = useContext(AdminContext);

  return (
    <>
      <HStack padding='10px'>
        <p>Image</p>
        <Text color='#FB5058' fontSize='4xl' fontWeight='bold'>
          admin
        </Text>
      </HStack>
      <VStack align='stretch' gap={5} padding='10px'>
        {menuText.map((text) => {
          let onPage = false;
          if (overviewPage && text === 'Overview') onPage = true;
          else if (userManagementPage && text === 'User Management')
            onPage = true;
          else if (settingsPage && text === 'Settings') onPage = true;
          else if (monthlyReportsPage && text === 'Monthly Reports')
            onPage = true;
          else if (compliancePage && text === 'HIPPA Compliance') onPage = true;
          return <MenuText key={uuid()} text={text} onPage={onPage} />;
        })}
      </VStack>
    </>
  );
};

export default Menu;
