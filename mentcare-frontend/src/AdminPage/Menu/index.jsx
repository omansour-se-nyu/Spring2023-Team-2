import { useContext } from 'react';
import { HStack, VStack, Text, Image } from '@chakra-ui/react';
import { AdminContext } from '../context/AdminContext';
import MenuText from './MenuText';
import { v4 as uuid } from 'uuid';
import userPng from '../../assets/user.png';

const Menu = () => {
  const {
    overviewPage,
    setOverviewPage,
    staffManagementPage,
    setStaffManagementPage,
    monthlyReportsPage,
    setMonthlyReportsPage,
    compliancePage,
    setCompliancePage,
    setLogoutPage,
  } = useContext(AdminContext);

  const menuData = [
    { text: 'Overview', handleOnClick: () => setOverviewPage(true) },
    {
      text: 'Staff Management',
      handleOnClick: () => setStaffManagementPage(true),
    },
    {
      text: 'Monthly Reports',
      handleOnClick: () => setMonthlyReportsPage(true),
    },
    { text: 'HIPPA Compliance', handleOnClick: () => setCompliancePage(true) },
    { text: 'Logout', handleOnClick: () => setLogoutPage(true) },
  ];

  return (
    <>
      <HStack padding='10px'>
        <Image src={userPng} alt='user image png' height='80px' />
        <Text color='#FB5058' fontSize='4xl' fontWeight='bold'>
          admin
        </Text>
      </HStack>
      <VStack align='stretch' gap={5} padding='10px'>
        {menuData.map(({ text, handleOnClick }) => {
          let onPage = false;
          if (overviewPage && text === 'Overview') onPage = true;
          else if (staffManagementPage && text === 'Staff Management')
            onPage = true;
          else if (monthlyReportsPage && text === 'Monthly Reports')
            onPage = true;
          else if (compliancePage && text === 'HIPPA Compliance') onPage = true;
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

export default Menu;
