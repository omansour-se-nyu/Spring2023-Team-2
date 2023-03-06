import { Grid, GridItem, Text } from '@chakra-ui/react';
import DashboardMainDisplay from './DashboardMainDisplay';

const Dashboard = () => {
  return (
    <Grid>
      <GridItem
        height='15vh'
        display='flex'
        alignItems='flex-end'
        paddingLeft='30px'
      >
        <Text color='#FB5058' fontWeight='bold' fontSize='5xl'>
          Overview
        </Text>
      </GridItem>
      <GridItem height='85vh'>
        <DashboardMainDisplay />
      </GridItem>
    </Grid>
  );
};

export default Dashboard;
