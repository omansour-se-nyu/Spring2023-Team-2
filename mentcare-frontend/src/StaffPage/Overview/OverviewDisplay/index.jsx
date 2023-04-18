import { Grid, GridItem } from '@chakra-ui/react';
import CardSelection from './CardSelection';
import { v4 as uuid } from 'uuid';
import patientIcon from '../../../assets/patientIcon.png';
import database from '../../../assets/database.png';
import logout from '../../../assets/logout.png';
import { useNavigate } from 'react-router-dom';
import { StaffContext } from '../../context/StaffContext';
import { useContext } from 'react';

const OverviewDisplay = () => {
  const navigate = useNavigate();
  const { setPatientManagementPage } = useContext(StaffContext);
  const { setLogoutPage } = useContext(StaffContext);

  const handleOnClickPatientView = () => {
    console.log("Patient View");
    setPatientManagementPage(true);
    navigate('/staff/records');
  };

  // logout if successful
  const logoutOnClick = () => {
    console.log("Logout");
    setLogoutPage(true);
    navigate('/');
  };

  const cardTitleImages = [
    // import images link when it is imported later
    ['Patients', patientIcon, handleOnClickPatientView],
    ['Logout', logout, logoutOnClick],
  ];

  return (
    <Grid templateColumns='repeat(2, 1fr)' gap='5' padding='30px' height='50%'>
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

export default OverviewDisplay;
