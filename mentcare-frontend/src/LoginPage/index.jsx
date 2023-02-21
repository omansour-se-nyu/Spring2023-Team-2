import { Grid, GridItem } from '@chakra-ui/react';
import RigthPanel from './RightPanel';
import LeftPanel from './LeftPanel';

const LoginPage = () => {
  return (
    <Grid templateColumns='repeat(2, 1fr)'>
      <GridItem w='100%' h='100vh' bg='#F488C4'>
        <LeftPanel />
      </GridItem>
      <GridItem w='100%' h='100vh' bg='white'>
        <RigthPanel />
      </GridItem>
    </Grid>
  );
};

export default LoginPage;
