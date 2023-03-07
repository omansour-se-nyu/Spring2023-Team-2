import { Grid, GridItem } from '@chakra-ui/react';
import CardSelection from './CardSelection';
import { v4 as uuid } from 'uuid';
import patientIcon from '../../../assets/patientIcon.png';
import messages from '../../../assets/messages.png';
import medicationsIcon from '../../../assets/medicationsIcon.png';
import documents from '../../../assets/documents.png';
import database from '../../../assets/database.png';
import logout from '../../../assets/logout.png';


const OverviewDisplay = () => {
  const cardTitleImages = [
    // import images link when it is imported later
    ['Patients', patientIcon],
    ['Messages', messages],
    ['Medications', medicationsIcon],
    ['Documents', documents],
    ['Database', database],
    ['Logout', logout],

  ];

  return (
    <Grid templateColumns='repeat(3, 1fr)' gap='5' padding='30px' height='100%'>
      {cardTitleImages.map(([title, imageLink]) => (
        <GridItem colSpan={1} key={uuid()}>
          <CardSelection title={title} imageLink={imageLink} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default OverviewDisplay;
