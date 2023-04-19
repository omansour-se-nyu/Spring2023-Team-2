import { useState } from 'react';
import {
  VStack,
  HStack,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import { BellIcon, SearchIcon } from '@chakra-ui/icons';

const UserManagement = () => {
  const departmentNames = [
    'Psychiatry',
    'Opthalmology',
    'Gastroenterology',
    'Neurology',
    'Gynaecology',
    'General Surgery',
    'Pediatrics',
    'Clinical pathology',
    'Anesthesiology',
    'Nutrition and Dietetics',
    'Intensive Care Unit (ICU)',
  ];

  const renderDepartmentSelection = () => (
    <Select>
      <option>--</option>
      {departmentNames.map((name) => (
        <option value={name}>{name}</option>
      ))}
    </Select>
  );

  return (
    <VStack height='100%' width='100%'>
      <HStack padding='5px' width='100%' align='center' justify='end'>
        <InputGroup width='300px'>
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
      </HStack>
      <VStack width='100%'>
        <Text>Staff</Text>
        <Text>Staff Lookup</Text>
        <HStack>
          <InputGroup width='300px'>
            <Input type='text' placeholder='Record Number' />
            <InputRightElement>
              <Button>
                <SearchIcon />
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button>Create</Button>
        </HStack>
        <TableContainer width='100%' style={{ border: '1px solid red' }}>
          <Table>
            <Thead>
              <Tr>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th>Email</Th>
                <Th>Department</Th>
              </Tr>
            </Thead>
          </Table>
        </TableContainer>
      </VStack>
      <Modal isCentered isOpen={true}>
        <ModalOverlay
          bg='blackAlpha.200'
          backdropFilter='blur(10px) hue-rotate(10deg)'
        />
        <ModalContent>
          <ModalHeader>Create Staff Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <FormLabel htmlFor='first-name'>First Name</FormLabel>
              <Input type='text' id='first-name' placeholder='eg. John' />
              <FormLabel htmlFor='last-name'>Last Name</FormLabel>
              <Input type='text' id='last-name' placeholder='eg. Doe' />
              <FormLabel htmlFor='department'>Department</FormLabel>
              {renderDepartmentSelection()}
            </form>
          </ModalBody>
          <ModalFooter gap='10px'>
            <Button>Close</Button>
            <Button>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default UserManagement;
