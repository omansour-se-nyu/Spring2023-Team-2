import { Grid, GridItem } from '@chakra-ui/react';
import RigthPanel from './RightPanel';

const LoginPage = () => {
  return (
    <Grid templateColumns='repeat(2, 1fr)'>
      <GridItem w='100%' h='100vh' bg='#EC408B'>
        Left Panel
      </GridItem>
      <GridItem w='100%' h='100vh' bg='white'>
        <RigthPanel />
      </GridItem>
    </Grid>
  );
};

export default LoginPage;
