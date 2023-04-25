import { useState, useEffect } from 'react';
import { StaffContext } from './context/StaffContext';
import { Grid, GridItem } from '@chakra-ui/react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Nav from './Nav';
import Overview from './Overview';
import PatientListView from './Overview/OverviewDisplay/PatientListView';
import DailySummary from './Overview/OverviewDisplay/DailySummary';
import MonthlyReport from './Overview/OverviewDisplay/MonthlyReport';

const StaffPage = () => {
  const [overviewPage, setOverviewPage] = useState(true);
  const [patientManagementPage, setPatientManagementPage] = useState(false);
  const [dailySummaryPage, setDailySummaryPage] = useState(false);
  const [monthlyReportPage, setMonthlyReportPage] = useState(false);
  const [logoutPage, setLogoutPage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setOverviewPage(false);
    setPatientManagementPage(false);
    setDailySummaryPage(false);
    setMonthlyReportPage(false);
    navigate('/');
  }, [logoutPage]);

  useEffect(() => {
    if (patientManagementPage) {
      setOverviewPage(false);
      setLogoutPage(false);
      setDailySummaryPage(false);
      setMonthlyReportPage(false);
      navigate('/staff/records');
    }
  }, [patientManagementPage]);

  useEffect(() => {
    if (overviewPage) {
      setPatientManagementPage(false);
      setDailySummaryPage(false);
      setLogoutPage(false);
      setMonthlyReportPage(false);
      navigate('/staff');
    }
  }, [overviewPage]);

  useEffect(() => {
    if (dailySummaryPage) {
        setOverviewPage(false);
        setPatientManagementPage(false);
        setLogoutPage(false);
        setMonthlyReportPage(false);
        navigate('/staff/daily-summary');
    }
  }, [dailySummaryPage]);

  useEffect(() => {
    if (monthlyReportPage) {
        setOverviewPage(false);
        setPatientManagementPage(false);
        setLogoutPage(false);
        setDailySummaryPage(false);
        navigate('/staff/monthly-report');
    }
  }, [monthlyReportPage]);

  return (
    <StaffContext.Provider
      value={{
        overviewPage,
        setOverviewPage,
        patientManagementPage,
        setPatientManagementPage,
        monthlyReportPage,
        setMonthlyReportPage,
        dailySummaryPage,
        setDailySummaryPage,
        logoutPage,
        setLogoutPage,
      }}
    >
      <Grid templateColumns='repeat(12, 1fr)' height='100%'>
        <GridItem colSpan={2} backgroundColor='#F488C4'>
          <Nav />
        </GridItem>
        <GridItem colSpan={10} height='100%' width='100%'>
          <Routes>
            <Route exact path='/' element={<Overview />} />
            <Route path='/records' element={<PatientListView />} />
            <Route path='/daily-summary' element={<DailySummary />} />
            <Route path='/monthly-report' element={<MonthlyReport />} />
          </Routes>
        </GridItem>
      </Grid>
    </StaffContext.Provider>
  );
};

export default StaffPage;
