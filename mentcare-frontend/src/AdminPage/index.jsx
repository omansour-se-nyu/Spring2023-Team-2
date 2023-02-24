import { Grid, GridItem } from '@chakra-ui/react';

const AdminPage = () => {
  return (
    <Grid templateColumns='repeat(12, 1fr)' height='100%'>
      <GridItem
        style={{
          border: '1px solid red',
        }}
        colSpan={3}
      >
        Menu
      </GridItem>
      <GridItem
        style={{
          border: '1px solid blue',
        }}
        colSpan={9}
      >
        Dashboard
      </GridItem>
    </Grid>
  );
};

export default AdminPage;
