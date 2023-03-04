import { Card, Grid, GridItem } from '@chakra-ui/react';
import CardSelection from './CardSelection';

const DashboardMainDisplay = () => {
  const cardTitleImages = [
    // import images link when it is imported later
    ['User Management', 'Image for UM'],
    ['Settings', 'Image for S'],
    ['Monthly Reports', 'Image for MR'],
    ['HIPPA Compliance', 'Image for HC'],
  ];

  return (
    <Grid templateColumns='repeat(2, 1fr)' gap='5' padding='30px' height='100%'>
      {cardTitleImages.map(([title, imageLink]) => (
        <GridItem colSpan={1}>
          <CardSelection title={title} imageLink={imageLink} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default DashboardMainDisplay;
