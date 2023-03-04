import { Grid, GridItem } from '@chakra-ui/react';
import DashboardMainDisplay from './DashboardMainDisplay';

const Dashboard = () => {
  return (
    <Grid>
      <GridItem maxHeight='100px' minHeight='70px'>
        Overview
      </GridItem>
      <GridItem>
        <DashboardMainDisplay />
      </GridItem>
    </Grid>
  );
};

export default Dashboard;
