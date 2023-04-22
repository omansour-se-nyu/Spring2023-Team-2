import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { Grid, GridItem } from '@chakra-ui/react';
import CardSelection from './CardSelection';
import { v4 as uuid } from 'uuid';
import usersIcon from '../../../assets/usersIcon.png';
import settingsIcon from '../../../assets/settingsIcon.png';
import reportsIcon from '../../../assets/reportsIcon.png';
import hipaaIcon from '../../../assets/HIPAA_Icon.png';
import { useNavigate } from 'react-router-dom';

const DashboardMainDisplay = () => {
  const { setCompliancePage, setStaffManagementPage } =
    useContext(AdminContext);

  const handleOnClickCompliance = () => {
    setCompliancePage(true);
  };

  const handleOnClickStaffManagementPage = () => {
    setStaffManagementPage(true);
  };

  const cardTitleImages = [
    // import images link when it is imported later
    ['Staff Management', usersIcon, handleOnClickStaffManagementPage],
    ['Settings', settingsIcon, () => {}],
    ['Monthly Reports', reportsIcon, () => {}],
    ['HIPPA Compliance', hipaaIcon, handleOnClickCompliance],
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
