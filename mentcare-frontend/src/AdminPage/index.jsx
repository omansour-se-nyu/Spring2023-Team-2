import { Grid, GridItem } from '@chakra-ui/react';
import Menu from './Menu';
import Dashboard from './Dashboard';

const AdminPage = () => {
  return (
    <Grid templateColumns='repeat(12, 1fr)' height='100%'>
      <GridItem colSpan={3} backgroundColor='#F488C4'>
        <Menu />
      </GridItem>
      <GridItem colSpan={9}>
        <Dashboard />
      </GridItem>
    </Grid>
  );
};

export default AdminPage;
