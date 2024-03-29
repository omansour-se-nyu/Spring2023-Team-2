import { useState, useEffect } from 'react';
import { AdminContext } from './context/AdminContext';
import { Grid, GridItem } from '@chakra-ui/react';
import Menu from './Menu';
import Dashboard from './Dashboard';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HIPPACompliance from './Dashboard/DashboardMainDisplay/HIPPACompliance';
import StaffManagement from './Dashboard/DashboardMainDisplay/StaffManagement';
import AdminMonthlyReport from './Dashboard/DashboardMainDisplay/AdminMonthlyReport';

const AdminPage = () => {
  const [overviewPage, setOverviewPage] = useState(true);
  const [staffManagementPage, setStaffManagementPage] = useState(false);
  const [monthlyReportsPage, setMonthlyReportsPage] = useState(false);
  const [compliancePage, setCompliancePage] = useState(false);
  const [logoutPage, setLogoutPage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!overviewPage) return;
    setStaffManagementPage(false);
    setMonthlyReportsPage(false);
    setCompliancePage(false);
    setLogoutPage(false);
    navigate('/admin/');
  }, [overviewPage]);

  useEffect(() => {
    if (!staffManagementPage) return;
    setOverviewPage(false);
    setMonthlyReportsPage(false);
    setCompliancePage(false);
    setLogoutPage(false);
    navigate('/admin/user-management');
  }, [staffManagementPage]);

  useEffect(() => {
    if (!monthlyReportsPage) return;
    setOverviewPage(false);
    setStaffManagementPage(false);
    setCompliancePage(false);
    setLogoutPage(false);
    navigate('/admin/monthly-report')
  }, [monthlyReportsPage]);

  useEffect(() => {
    if (!compliancePage) return;
    setOverviewPage(false);
    setStaffManagementPage(false);
    setMonthlyReportsPage(false);
    setLogoutPage(false);
    navigate('/admin/compliance');
  }, [compliancePage]);

  useEffect(() => {
    if (!logoutPage) return;
    setOverviewPage(false);
    setStaffManagementPage(false);
    setMonthlyReportsPage(false);
    setCompliancePage(false);
    navigate('/');
  });

  return (
    <AdminContext.Provider
      value={{
        overviewPage,
        setOverviewPage,
        staffManagementPage,
        setStaffManagementPage,
        monthlyReportsPage,
        setMonthlyReportsPage,
        compliancePage,
        setCompliancePage,
        logoutPage,
        setLogoutPage,
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
            <Route path='/monthly-report' element={<AdminMonthlyReport />} />
          </Routes>
        </GridItem>
      </Grid>
    </AdminContext.Provider>
  );
};

export default AdminPage;
