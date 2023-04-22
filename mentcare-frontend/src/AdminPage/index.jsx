import { useState, useEffect } from 'react';
import { AdminContext } from './context/AdminContext';
import { Grid, GridItem } from '@chakra-ui/react';
import Menu from './Menu';
import Dashboard from './Dashboard';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HIPPACompliance from './Dashboard/DashboardMainDisplay/HIPPACompliance';
import StaffManagement from './Dashboard/DashboardMainDisplay/StaffManagement';

const AdminPage = () => {
  const [overviewPage, setOverviewPage] = useState(true);
  const [staffManagementPage, setStaffManagementPage] = useState(false);
  const [settingsPage, setSettingsPage] = useState(false);
  const [monthlyReportsPage, setMonthlyReportsPage] = useState(false);
  const [compliancePage, setCompliancePage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!overviewPage) return;
    setStaffManagementPage(false);
    setSettingsPage(false);
    setMonthlyReportsPage(false);
    setCompliancePage(false);
    navigate('/admin/');
  }, [overviewPage]);

  useEffect(() => {
    if (!staffManagementPage) return;
    setOverviewPage(false);
    setSettingsPage(false);
    setMonthlyReportsPage(false);
    setCompliancePage(false);
    navigate('/admin/user-management');
  }, [staffManagementPage]);

  useEffect(() => {
    if (!settingsPage) return;
    setOverviewPage(false);
    setStaffManagementPage(false);
    setMonthlyReportsPage(false);
    setCompliancePage(false);
  }, [settingsPage]);

  useEffect(() => {
    if (!monthlyReportsPage) return;
    setOverviewPage(false);
    setStaffManagementPage(false);
    setSettingsPage(false);
    setCompliancePage(false);
  }, [monthlyReportsPage]);

  useEffect(() => {
    if (!compliancePage) return;
    setOverviewPage(false);
    setStaffManagementPage(false);
    setSettingsPage(false);
    setMonthlyReportsPage(false);
    navigate('/admin/compliance');
  }, [compliancePage]);

  return (
    <AdminContext.Provider
      value={{
        overviewPage,
        setOverviewPage,
        staffManagementPage,
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
