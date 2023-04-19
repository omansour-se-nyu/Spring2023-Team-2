import {
  VStack,
  Button,
  Box,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { BellIcon, SearchIcon } from '@chakra-ui/icons';

const UserManagement = () => {
  return (
    <VStack height='100%'>
      <Box>
        <InputGroup>
          <Input type='text' placeholder='Search' />
          <InputRightElement>
            <Button>
              <SearchIcon />
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button variant='ghost'>
          <BellIcon />
        </Button>
      </Box>
      <p>asdf</p>
    </VStack>
  );
};

export default UserManagement;
