import { useState, useEffect } from 'react';
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

const UserManagement = () => {
  const [openModal, setOpenModal] = useState(false);
  const [staffData, setStaffData] = useState(null);

  const getStaffData = async () => {
    const url = `http://127.0.0.1:8000/admin/staff/retrieve/`;
    const data = {
      doctor_id: 0,
    };
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch(url, config).then((res) => res.json());
      const { doctor_information } = response;
      const parsed_data = JSON.parse(doctor_information);
      setStaffData(parsed_data);
    } catch (error) {
      console.log('error from getting staff data', error);
    }
  };

  useEffect(() => {
    getStaffData();
  }, []);

  const renderDepartmentSelection = () => (
    <Select>
      <option>--</option>
      {departmentNames.map((name) => (
        <option value={name} key={name}>
          {name}
        </option>
      ))}
    </Select>
  );

  const renderTableBody = () => (
    <Tbody>
      {staffData &&
        staffData.map(({ fields }) => {
          const { name, email, department } = fields;
          const [firstName, lastName] = name.split(' ');
          return (
            <Tr key={email}>
              <Td>{firstName}</Td>
              <Td>{lastName}</Td>
              <Td>{email}</Td>
              <Td>{department}</Td>
            </Tr>
          );
        })}
    </Tbody>
  );

  return (
    <VStack height='100%' width='100%'>
      <HStack padding='5px' width='100%' align='center' justify='end'>
        <Button variant='ghost'>
          <BellIcon />
        </Button>
      </HStack>
      <VStack width='100%' align='start'>
        <VStack align='start' paddingLeft='10px'>
          <Text color='#FB5058' fontWeight='bold' fontSize='4xl'>
            Staff
          </Text>
          <Text color='#FB5058' fontWeight='bold' fontSize='2xl'>
            Staff Lookup
          </Text>
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
        </VStack>

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
            {renderTableBody()}
          </Table>
        </TableContainer>
      </VStack>
      <Modal isCentered isOpen={openModal}>
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
