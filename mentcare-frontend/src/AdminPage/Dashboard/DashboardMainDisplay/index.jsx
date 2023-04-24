import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { Grid, GridItem } from '@chakra-ui/react';
import CardSelection from './CardSelection';
import { v4 as uuid } from 'uuid';
import usersIcon from '../../../assets/usersIcon.png';
import reportsIcon from '../../../assets/reportsIcon.png';
import hipaaIcon from '../../../assets/HIPAA_Icon.png';
import logoutIcon from '../../../assets/logout.png';

const DashboardMainDisplay = () => {
  const { setCompliancePage, setStaffManagementPage, setLogoutPage } =
    useContext(AdminContext);

  const handleOnClickCompliance = () => {
    setCompliancePage(true);
  };

  const handleOnClickStaffManagementPage = () => {
    setStaffManagementPage(true);
  };

  const handleOnClickLogoutPage = async () => {
    const url = 'http://127.0.0.1:8000/logout/';
    const data = {};
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      const loginResponse = await fetch(url, config).then((res) => res.json());
      const { status } = loginResponse;
      if (status === 'Success') {
        setLogoutPage(true);
      }
    } catch (err) {
      console.log('error from logging out:', err);
    }
  };

  const cardTitleImages = [
    ['Staff Management', usersIcon, handleOnClickStaffManagementPage],
    ['Monthly Reports', reportsIcon, () => {}],
    ['HIPPA Compliance', hipaaIcon, handleOnClickCompliance],
    ['Logout', logoutIcon, handleOnClickLogoutPage],
  ];

  return (
    <Grid templateColumns='repeat(2, 1fr)' gap='5' padding='30px' height='100%'>
      {cardTitleImages.map(([title, imageLink, handleOnClick]) => (
        <GridItem colSpan={1} key={uuid()}>
          <CardSelection
            title={title}
            imageLink={imageLink}
            handleOnClick={handleOnClick}
          />
        </GridItem>
      ))}
    </Grid>
  );
};

export default DashboardMainDisplay;
