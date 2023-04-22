import { useState, useEffect } from 'react';
import { AdminContext } from './context/AdminContext';
import { Grid, GridItem } from '@chakra-ui/react';
import Menu from './Menu';
import Dashboard from './Dashboard';
import { Routes, Route } from 'react-router-dom';
import HIPPACompliance from './Dashboard/DashboardMainDisplay/HIPPACompliance';
import StaffManagement from './Dashboard/DashboardMainDisplay/StaffManagement';

const AdminPage = () => {
  const [overviewPage, setOverviewPage] = useState(true);
  const [StaffManagementPage, setStaffManagementPage] = useState(false);
  const [settingsPage, setSettingsPage] = useState(false);
  const [monthlyReportsPage, setMonthlyReportsPage] = useState(false);
  const [compliancePage, setCompliancePage] = useState(false);

  useEffect(() => {
    setStaffManagementPage(false);
    setSettingsPage(false);
    setMonthlyReportsPage(false);
    setCompliancePage(false);
  }, [overviewPage]);

  useEffect(() => {
    setOverviewPage(false);
    setSettingsPage(false);
    setMonthlyReportsPage(false);
    setCompliancePage(false);
  }, [StaffManagementPage]);

  useEffect(() => {
    setOverviewPage(false);
    setStaffManagementPage(false);
    setMonthlyReportsPage(false);
    setCompliancePage(false);
  }, [settingsPage]);

  useEffect(() => {
    setOverviewPage(false);
    setStaffManagementPage(false);
    setSettingsPage(false);
    setCompliancePage(false);
  }, [monthlyReportsPage]);

  useEffect(() => {
    setOverviewPage(false);
    setStaffManagementPage(false);
    setSettingsPage(false);
    setMonthlyReportsPage(false);
  }, [compliancePage]);

  return (
    <AdminContext.Provider
      value={{
        overviewPage,
        setOverviewPage,
        StaffManagementPage,
        setStaffManagementPage,
        settingsPage,
        setSettingsPage,
        monthlyReportsPage,
        setMonthlyReportsPage,
        compliancePage,
        setCompliancePage,
      }}
    >
      <Grid templateColumns='repeat(12, 1fr)' height='100%' width='100%'>
        <GridItem colSpan={2} backgroundColor='#F488C4'>
          <Menu />
        </GridItem>
        <GridItem colSpan={10} height='100%' width='100%'>
          <Routes>
            <Route exact path='/' element={<Dashboard />} />
            <Route path='/compliance' element={<HIPPACompliance />} />
            <Route path='/user-management' element={<StaffManagement />} />
          </Routes>
        </GridItem>
      </Grid>
    </AdminContext.Provider>
  );
};

export default AdminPage;
