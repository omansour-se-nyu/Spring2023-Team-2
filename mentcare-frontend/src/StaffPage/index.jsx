import { useState } from 'react';
import { StaffContext } from './context/StaffContext';
import { Grid, GridItem } from '@chakra-ui/react';
import Nav from './Nav';
import Overview from './Overview';

const StaffPage = () => {
  const [overviewPage, setOverviewPage] = useState(true);
  const [patientManagementPage, setPatientManagementPage] = useState(false);
  const [messagesPage, setMessagesPage] = useState(false);
  const [medicationsPage, setMedicationsPage] = useState(false);
  const [documentsPage, setDocumentsPage] = useState(false);
  const [databasePage, setDatabasePage] = useState(false);
  const [logoutPage, setLogoutPage] = useState(false);

  return (
    <StaffContext.Provider
      value={{
        overviewPage,
        setOverviewPage,
        patientManagementPage,
        setPatientManagementPage,
        messagesPage,
        setMessagesPage,
        medicationsPage,
        setMedicationsPage,
        documentsPage,
        setDocumentsPage,
        databasePage,
        setDatabasePage,
        logoutPage,
        setLogoutPage,
      }}
    >
      <Grid templateColumns='repeat(12, 1fr)' height='100%'>
        <GridItem colSpan={3} backgroundColor='#F488C4'>
          <Nav />
        </GridItem>
        <GridItem colSpan={9}>
          <Overview />
        </GridItem>
      </Grid>
    </StaffContext.Provider>
  );
};

export default StaffPage;
