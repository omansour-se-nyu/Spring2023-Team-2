import { Grid, GridItem } from '@chakra-ui/react';
import CardSelection from './CardSelection';
import { v4 as uuid } from 'uuid';
import patientIcon from '../../../assets/patientIcon.png';
import database from '../../../assets/database.png';
import summary from '../../../assets/clipboard-list.png';
import logout from '../../../assets/logout.png';
import report from '../../../assets/file-medical-alt.png';
import { useNavigate } from 'react-router-dom';
import { StaffContext } from '../../context/StaffContext';
import { useContext } from 'react';

const OverviewDisplay = () => {
  const navigate = useNavigate();
  const { setPatientManagementPage } = useContext(StaffContext);
  const { setLogoutPage } = useContext(StaffContext);
  const { setDailySummaryPage } = useContext(StaffContext);
  const { setMonthlyReportPage } = useContext(StaffContext);

  const summaryOnClick = () => {
    console.log("Get Daily Summary");
    setDailySummaryPage(true);
    navigate('/staff/daily-summary');
  };

  const handleOnClickPatientView = () => {
    console.log('Patient View');
    setPatientManagementPage(true);
    navigate('/staff/records');
  };

  const monthlyReportOnClick = () => {
    console.log('Monthly Reports');
    setMonthlyReportPage(true);
    navigate('/staff/monthly-report');
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
    ['Daily Summary', summary, summaryOnClick],
    ['Monthly Report', report, monthlyReportOnClick],
    ['Logout', logout, logoutOnClick],
  ];

  return (
    <Grid templateColumns='repeat(4, 1fr)' gap='5' padding='30px' height='100%'>
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
