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
  SkeletonText,
  useDisclosure,
  useToast,
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
  const [staffData, setStaffData] = useState([]);
  const [displayStaffData, setDisplayStaffData] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [department, setDepartment] = useState('');
  const [search, setSearch] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const displayToast = useToast();

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

  useEffect(() => {
    setDisplayStaffData(staffData);
  }, [staffData]);

  const onChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const onChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const onChangeDepartment = (e) => {
    setDepartment(e.target.value);
  };

  const onChangeSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (!value) {
      setDisplayStaffData(staffData);
    }
    const currentStaffData = staffData.filter(({ pk }) =>
      JSON.stringify(pk).includes(value)
    );
    setDisplayStaffData(currentStaffData);
  };

  const handleCreateStaff = async () => {
    const url = `http://127.0.0.1:8000/admin/staff/create/`;
    const data = {
      name: `${firstName} ${lastName}`,
      department: department,
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
      const { status } = response;
      if (status === 'Success') {
        displayToast({
          title: 'Account Creation Successful',
          description: `Account for ${firstName} ${lastName} has been successfully created`,
          status: 'success',
          duration: 7000,
          isClosable: true,
        });
      }
    } catch (error) {
      displayToast({
        title: 'Account Creation Failed',
        description: `Account for ${firstName} ${lastName} was not able to be created`,
        status: 'error',
        duration: 7000,
        isClosable: true,
      });
      console.log('error from creating staff data', error);
    } finally {
      onClose();
      getStaffData();
      setFirstName('');
      setLastName('');
      setDepartment('');
    }
  };

  const renderDepartmentSelection = () => (
    <Select onChange={onChangeDepartment} value={department}>
      <option>--</option>
      {departmentNames.map((name) => (
        <option value={name} key={name}>
          {name}
        </option>
      ))}
    </Select>
  );

  const renderTableBody = () => {
    if (displayStaffData.length <= 0)
      return (
        <Tbody>
          <Tr>
            <Td>
              <SkeletonText noOfLines={1} />
            </Td>
            <Td>
              <SkeletonText noOfLines={1} />
            </Td>
            <Td>
              <SkeletonText noOfLines={1} />
            </Td>
            <Td>
              <SkeletonText noOfLines={1} />
            </Td>
            <Td>
              <SkeletonText noOfLines={1} />
            </Td>
          </Tr>
        </Tbody>
      );

    return (
      <Tbody>
        {displayStaffData.map(({ fields, pk }) => {
          const { name, email, department } = fields;
          const [firstName, lastName] = name.split(' ');
          return (
            <Tr key={email}>
              <Td>{pk}</Td>
              <Td>{firstName}</Td>
              <Td>{lastName}</Td>
              <Td>{email}</Td>
              <Td>{department}</Td>
            </Tr>
          );
        })}
      </Tbody>
    );
  };

  return (
    <VStack height='100vh' width='100%'>
      <HStack
        padding='5px'
        height='5vh'
        width='100%'
        align='center'
        justify='end'
      >
        <Button variant='ghost'>
          <BellIcon />
        </Button>
      </HStack>
      <VStack width='100%' height='95vh' align='start'>
        <VStack align='start' paddingLeft='10px' height='25vh'>
          <Text color='#FB5058' fontWeight='bold' fontSize='4xl'>
            Staff
          </Text>
          <Text color='#FB5058' fontWeight='bold' fontSize='2xl'>
            Staff Lookup
          </Text>
          <HStack>
            <InputGroup width='300px'>
              <Input
                value={search}
                onChange={onChangeSearch}
                type='text'
                placeholder='Record Number'
              />
              <InputRightElement>
                <Button>
                  <SearchIcon />
                </Button>
              </InputRightElement>
            </InputGroup>
            <Button onClick={onOpen}>Create</Button>
          </HStack>
        </VStack>
        <TableContainer width='100%' height='67.5vh' overflowY='auto'>
          <Table variant='striped'>
            <Thead>
              <Tr>
                <Th>ID</Th>
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
      <Modal isCentered isOpen={isOpen}>
        <ModalOverlay bg='blackAlpha.200' backdropFilter='blur(10px)' />
        <ModalContent>
          <ModalHeader>Create Staff Account</ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody>
            <form>
              <FormLabel htmlFor='first-name'>First Name</FormLabel>
              <Input
                onChange={onChangeFirstName}
                value={firstName}
                type='text'
                id='first-name'
                placeholder='eg. John'
              />
              <FormLabel htmlFor='last-name'>Last Name</FormLabel>
              <Input
                onChange={onChangeLastName}
                value={lastName}
                type='text'
                id='last-name'
                placeholder='eg. Doe'
              />
              <FormLabel htmlFor='department'>Department</FormLabel>
              {renderDepartmentSelection()}
            </form>
          </ModalBody>
          <ModalFooter gap='10px'>
            <Button onClick={onClose}>Close</Button>
            <Button onClick={handleCreateStaff}>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default UserManagement;
