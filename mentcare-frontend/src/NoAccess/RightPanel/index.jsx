import { Flex } from '@chakra-ui/react';
import NoAccess from './NoAccess';

const RightPanel = () => {
  return (
    <Flex justifyContent='center' alignItems='center' height='100%'>
      <NoAccess />
    </Flex>
  );
};

export default RightPanel;
