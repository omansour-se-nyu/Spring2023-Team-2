import { Flex } from '@chakra-ui/react';
import Staff from './Staff';

const RightPanel = () => {
  return (
    <Flex justifyContent='center' alignItems='center' height='100%'>
      <Staff />
    </Flex>
  );
};

export default RightPanel;
