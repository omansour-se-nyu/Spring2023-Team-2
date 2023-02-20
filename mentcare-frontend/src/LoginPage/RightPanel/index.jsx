import { Flex } from '@chakra-ui/react';
import Login from './Login';

const RigthPanel = () => {
  return (
    <Flex justifyContent={'center'} alignItems={'center'} height={'100%'}>
      <Login />
    </Flex>
  );
};

export default RigthPanel;
