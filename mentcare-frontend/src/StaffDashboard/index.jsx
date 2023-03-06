import { Grid, GridItem } from '@chakra-ui/react';
import RightPanel from './RightPanel';
import LeftPanel from './LeftPanel';

const StaffDashboard = () => {
  return (
    <Grid templateColumns='repeat(2, 1fr)'>
      <GridItem w='100%' h='100vh' bg='#F488C4'>
        <LeftPanel />
      </GridItem>
      <GridItem w='100%' h='100vh' bg='white'>
        <RightPanel />
      </GridItem>
    </Grid>
  );
};

export default StaffDashboard;
