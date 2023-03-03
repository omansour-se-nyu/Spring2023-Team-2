import { Flex } from '@chakra-ui/react';
import Login from './Login';
import NoAccess from './NoAccess';

const RigthPanel = () => {
  return (
    <Flex justifyContent='center' alignItems='center' height='100%'>
      <Login/>
    </Flex>
  );
};

export default RigthPanel;
