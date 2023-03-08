import { Grid, GridItem, Text } from '@chakra-ui/react';
import OverviewDisplay from './OverviewDisplay';

const Overview = () => {
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
        <OverviewDisplay />
      </GridItem>
    </Grid>
  );
};

export default Overview;
