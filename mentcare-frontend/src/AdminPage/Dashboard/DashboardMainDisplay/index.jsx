import { Grid, GridItem } from '@chakra-ui/react';
import CardSelection from './CardSelection';
import { v4 as uuid } from 'uuid';
import usersIcon from '../../../assets/usersIcon.png';
import settingsIcon from '../../../assets/settingsIcon.png';
import reportsIcon from '../../../assets/reportsIcon.png';
import hipaaIcon from '../../../assets/HIPAA_Icon.png';

const DashboardMainDisplay = () => {
  const cardTitleImages = [
    // import images link when it is imported later
    ['User Management', usersIcon],
    ['Settings', settingsIcon],
    ['Monthly Reports', reportsIcon],
    ['HIPPA Compliance', hipaaIcon],
  ];

  return (
    <Grid templateColumns='repeat(2, 1fr)' gap='5' padding='30px' height='100%'>
      {cardTitleImages.map(([title, imageLink]) => (
        <GridItem colSpan={1} key={uuid()}>
          <CardSelection title={title} imageLink={imageLink} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default DashboardMainDisplay;
