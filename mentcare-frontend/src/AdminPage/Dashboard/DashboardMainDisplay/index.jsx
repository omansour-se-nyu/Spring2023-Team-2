import { Card, Grid, GridItem } from '@chakra-ui/react';
import CardSelection from './CardSelection';

const DashboardMainDisplay = () => {
  return (
    <Grid>
      <GridItem>
        <CardSelection />
      </GridItem>
      <GridItem>placeholder</GridItem>
    </Grid>
  );
};

export default DashboardMainDisplay;
