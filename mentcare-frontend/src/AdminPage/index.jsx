import { useState } from 'react';
import { AdminContext } from './context/AdminContext';
import { Grid, GridItem } from '@chakra-ui/react';
import Menu from './Menu';
import Dashboard from './Dashboard';

const AdminPage = () => {
  const [overviewPage, setOverviewPage] = useState(true);
  const [userManagementPage, setUserManagementPage] = useState(false);
  const [settingsPage, setSettingsPage] = useState(false);
  const [monthlyReportsPage, setMonthlyReportsPage] = useState(false);
  const [compliancePage, setCompliancePage] = useState(false);

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
          <Dashboard />
        </GridItem>
      </Grid>
    </AdminContext.Provider>
  );
};

export default AdminPage;
