import { useState, useEffect } from 'react';
import { StaffContext } from './context/StaffContext';
import { Grid, GridItem } from '@chakra-ui/react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Nav from './Nav';
import Overview from './Overview';
import PatientListView from './Overview/OverviewDisplay/PatientListView';

const StaffPage = () => {
  const [overviewPage, setOverviewPage] = useState(true);
  const [patientManagementPage, setPatientManagementPage] = useState(false);
  const [databasePage, setDatabasePage] = useState(false);
  const [logoutPage, setLogoutPage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setOverviewPage(false);
    setPatientManagementPage(false);
    setDatabasePage(false);
  }, [logoutPage]);

  useEffect(() => {
    if (patientManagementPage) {
      setOverviewPage(false);
      setLogoutPage(false);
      setDatabasePage(false);
      navigate('/staff/records');
    }
  }, [patientManagementPage]);

  useEffect(() => {
    setOverviewPage(false);
    setPatientManagementPage(false);
    setLogoutPage(false);
  }, [databasePage]);

  useEffect(() => {
    if (overviewPage) {
      setDatabasePage(false);
      setPatientManagementPage(false);
      setLogoutPage(false);
      navigate('/staff');
    }
  }, [overviewPage]);

  return (
    <StaffContext.Provider
      value={{
        overviewPage,
        setOverviewPage,
        patientManagementPage,
        setPatientManagementPage,
        databasePage,
        setDatabasePage,
        logoutPage,
        setLogoutPage,
      }}
    >
      <Grid templateColumns='repeat(12, 1fr)' height='100%'>
        <GridItem colSpan={2} backgroundColor='#F488C4'>
          <Nav />
        </GridItem>
        <GridItem colSpan={10}>
          <Routes>
            <Route exact path='/' element={<Overview />} />
            <Route path='/records' element={<PatientListView />} />
          </Routes>
        </GridItem>
      </Grid>
    </StaffContext.Provider>
  );
};

export default StaffPage;
