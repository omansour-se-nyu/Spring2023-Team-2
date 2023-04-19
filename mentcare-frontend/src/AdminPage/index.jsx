import { useState, useEffect } from 'react';
import { AdminContext } from './context/AdminContext';
import { Grid, GridItem } from '@chakra-ui/react';
import Menu from './Menu';
import Dashboard from './Dashboard';
import { Routes, Route } from 'react-router-dom';
import HIPPACompliance from './Dashboard/DashboardMainDisplay/HIPPACompliance';
import UserManagement from './Dashboard/DashboardMainDisplay/UserManagement';

const AdminPage = () => {
  const [overviewPage, setOverviewPage] = useState(true);
  const [userManagementPage, setUserManagementPage] = useState(false);
  const [settingsPage, setSettingsPage] = useState(false);
  const [monthlyReportsPage, setMonthlyReportsPage] = useState(false);
  const [compliancePage, setCompliancePage] = useState(false);

  useEffect(() => {
    setUserManagementPage(false);
    setSettingsPage(false);
    setMonthlyReportsPage(false);
    setCompliancePage(false);
  }, [overviewPage]);

  useEffect(() => {
    setOverviewPage(false);
    setSettingsPage(false);
    setMonthlyReportsPage(false);
    setCompliancePage(false);
  }, [userManagementPage]);

  useEffect(() => {
    setOverviewPage(false);
    setUserManagementPage(false);
    setMonthlyReportsPage(false);
    setCompliancePage(false);
  }, [settingsPage]);

  useEffect(() => {
    setOverviewPage(false);
    setUserManagementPage(false);
    setSettingsPage(false);
    setCompliancePage(false);
  }, [monthlyReportsPage]);

  useEffect(() => {
    setOverviewPage(false);
    setUserManagementPage(false);
    setSettingsPage(false);
    setMonthlyReportsPage(false);
  }, [compliancePage]);

  return (
    <AdminContext.Provider
      value={{
        overviewPage,
        setOverviewPage,
        userManagementPage,
        setUserManagementPage,
        settingsPage,
        setSettingsPage,
        monthlyReportsPage,
        setMonthlyReportsPage,
        compliancePage,
        setCompliancePage,
      }}
    >
      <Grid templateColumns='repeat(12, 1fr)' height='100%'>
        <GridItem colSpan={3} backgroundColor='#F488C4'>
          <Menu />
        </GridItem>
        <GridItem colSpan={9}>
          <Routes>
            <Route exact path='/' element={<Dashboard />} />
            <Route path='/compliance' element={<HIPPACompliance />} />
            <Route path='/user-management' element={<UserManagement />} />
          </Routes>
        </GridItem>
      </Grid>
    </AdminContext.Provider>
  );
};

export default AdminPage;
