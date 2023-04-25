import React, { useState, useEffect } from 'react';
import download from './download';
import {
  Text,
  Input,
  InputLeftAddon,
  InputGroup,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Divider,
  VStack,
  HStack,
  useToast,
} from '@chakra-ui/react';
import {
  ViewIcon,
  EditIcon,
  ChatIcon,
  AddIcon,
  DeleteIcon,
  DownloadIcon,
  CloseIcon,
} from '@chakra-ui/icons';

var global_patientID = 0;
let editingString = '';

const PatientListView = () => {
  const toast = useToast();

  const [userData, setUserData] = useState([]);
  const [search, setSearch] = useState('');
  const [displayUserData, setDisplayUserData] = useState([]);
  const [userCt, setUserCt] = useState(0);

  // notifications here
  const [notif, setNotif] = useState(false);

  // expanded
  const [fullname, setUserFullName] = useState('');
  const [addressStr, setAddressStr] = useState('');
  const [phoneNumStr, setPhoneNum] = useState('');
  const [allergiesStr, setAllergies] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const displayToast = useToast();

  // get patient id from search field and edit that record
  const onChangeSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    console.log(value);
    global_patientID = value || 0;
    if (!value) {
      setDisplayUserData(userData);
    }
    const currentUserData = userData.filter(({ pk }) =>
      JSON.stringify(pk).includes(value)
    );
    if (currentUserData.length === 0) {
      setDisplayUserData(null);
      return;
    }
    setDisplayUserData(currentUserData);
  };

  const {
    isOpen: isOpen3,
    onOpen: onOpen3,
    onClose: onClose3,
  } = useDisclosure();
  const initialRef3 = React.useRef(null);
  const finalRef3 = React.useRef(null);

  const fetchData = () => {
    fetch('http://127.0.0.1:8000/staff/patients/records/retrieve/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patient_id: 0 }),
    })
      .then((response) => response.json())
      .then((actualData) => {
        const data = JSON.parse(actualData.patient_information);

        // all info
        data.sort((a, b) => a.pk - b.pk);
        setUserData(data);
        setDisplayUserData(data);
        setUserCt(data.length);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // Create Patients =====================

  // variables to create patient
  let cFN;
  const createFName = (event) => {
    if (event.target.value !== '') {
      cFN = event.target.value;
    }
  };

  let cLN;
  const createLName = (event) => {
    if (event.target.value !== '') {
      cLN = event.target.value;
    }
  };

  let cG;
  const createGender = (event) => {
    if (event.target.value !== '') {
      cG = event.target.value;
    }
  };

  let cdob;
  const createDOB = (event) => {
    if (event.target.value !== '') {
      cdob = event.target.value;
    }
  };

  let cAddr;
  const createAddr = (event) => {
    if (event.target.value !== '') {
      cAddr = event.target.value;
    }
  };

  let cPhone;
  const createPhone = (event) => {
    if (event.target.value !== '') {
      cPhone = event.target.value;
    }
  };

  let cAller;
  const createAller = (event) => {
    if (event.target.value !== '') {
      cAller = event.target.value;
    }
  };

  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
  const initialRef1 = React.useRef(null);
  const finalRef1 = React.useRef(null);

  function createPatient() {
    fetch('http://127.0.0.1:8000/staff/patients/records/create/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: cFN,
        last_name: cLN,
        gender: cG,
        dob: cdob,
        address: cAddr,
        phone_num: cPhone,
        allergies: cAller,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        fetchData();
        toast({
          title: 'Account Created.',
          description: "We've created the patient account for you.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  // Edit Patients ======================
  //const [updatedAt, setUpdatedAt] = useState(false);
  let firstName;
  let lastName;
  let dob;
  let gender;
  let num;
  let addr;
  let aller_;

  //let body_options = JSON.stringify(setOptions)
  const updatePatientFName = (event) => {
    if (event.target.value !== '') {
      firstName = event.target.value;
    }
  };
  const updatePatientLName = (event) => {
    if (event.target.value !== null) {
      lastName = event.target.value;
    }
  };
  const updatePatientdob = (event) => {
    if (event.target.value !== '') {
      dob = event.target.value;
    }
  };
  const updatePatientGender = (event) => {
    if (event.target.value !== '') {
      gender = event.target.value;
    }
  };
  const updatePatientNum = (event) => {
    if (event.target.value !== '') {
      num = event.target.value;
    }
  };
  const updatePatientAddr = (event) => {
    if (event.target.value !== '') {
      addr = event.target.value;
    }
  };
  const updatePatientAllergies = (event) => {
    if (event.target.value !== '') {
      aller_ = event.target.value;
    }
  };
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const initialRef2 = React.useRef(null);
  const finalRef2 = React.useRef(null);

  function clearNotif() {
    editingString = '';
    setNotif(false);
  }

  function putData() {
    // PUT request
    if (global_patientID !== 0) {
      const requestOptions = {
        method: 'PUT',
        body: JSON.stringify({
          patient_id: global_patientID,
          first_name: firstName,
          last_name: lastName,
          dob: dob,
          gender: gender,
          phone_num: num,
          address: addr,
          allergies: aller_,
        }),
      };
      fetch(
        'http://127.0.0.1:8000/staff/patients/records/update/',
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setNotif(true);
          editingString =
            editingString +
            'Edited ' +
            global_patientID +
            "'s Patient Record.\n";
            toast({
          title: 'Account Edited.',
          description: "We've edited the patient account for you.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
          fetchData();
        });
    }
  }

  // Delete Patients ===========================
  const deletePatient = async () => {
    const url = `http://127.0.0.1:8000/staff/patients/records/delete/` + global_patientID;
    const config = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await fetch(url, config).then((res) => res.json());
      const { status } = response;
      if (status === 'Success') {
        displayToast({
          title: 'Account Deletion Successful',
          description: `Account #${global_patientID} has been successfully deleted`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      displayToast({
        title: 'Account Deletion Failed',
        description: `Account #${global_patientID} failed to be deleted`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.log('error from deleting patient account', error);
    }
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    putData();
  }, []);

  const renderTableHeadRow = () => {
    return (
      <Tr>
        <Th fontSize='0.8em' color='white'>
          <Text>Patient MRN</Text>
        </Th>
        <Th fontSize='0.8em' color='white'>
          <Text>First Name</Text>
        </Th>
        <Th fontSize='0.8em' color='white'>
          <Text>Last Name</Text>
        </Th>
        <Th fontSize='0.8em' color='white'>
          <Text>D.O.B</Text>
        </Th>
        <Th fontSize='0.8em' color='white'>
          <Text>Gender</Text>
        </Th>
        <Th fontSize='0.8em' color='white'>
          <Text>Address</Text>
        </Th>
        <Th fontSize='0.8em' color='white'>
          <Text>Phone Number</Text>
        </Th>
        <Th fontSize='0.8em' color='white'>
          <Text>Allergies</Text>
        </Th>
        <Th fontSize='0.8em' color='white'>
          <Text align='center'>Download</Text>
        </Th>
      </Tr>
    );
  };

  const renderTableBodyRow = () => {
    if (displayUserData.length === 0) return null;
    return displayUserData.map(({ pk, fields }) => {
      const { first_name, last_name, dob, gender , address, phone_num , allergies } = fields || {};
      return (
        <Tr key={pk}>
          <Td>{pk}</Td>
          <Td>{first_name}</Td>
          <Td>{last_name}</Td>
          <Td>{dob}</Td>
          <Td>{gender}</Td>
          <Td>{address}</Td>
          <Td>{phone_num}</Td>
          <Td>{allergies}</Td>
          <Td>
            <HStack align='center' justify='center'>
              <DownloadIcon
                variant='ghost'
                _hover={{ cursor: 'pointer', color: '#FB5058' }}
                colorScheme='black'
                aria-label='Download Patient Info'
                fontSize='0.8em'
                marginLeft={2}
                onClick={() => download(userData)}
              />
            </HStack>
          </Td>
        </Tr>
      );
    });
  };

  return (
    <VStack height='100vh' width='100%'>
      <VStack width='100%' height='100vh' align='start'>
        <VStack
          height='20vh'
          minHeight='150px'
          maxHeight='200px'
          width='100%'
          align='start'
          paddingLeft='5px'
          paddingRight='5px'
        >
          <Text color='#FB5058' fontWeight='bold' align='center' fontSize='4xl'>
            Patient Overview
          </Text>
          <HStack width='100%' height='100%' justify='center'>
            <InputGroup width='350px'>
              <InputLeftAddon
                children='Patient MRN'
                fontWeight='bold'
                backgroundColor='#d5c37b'
                color='#faf9ef'
              />
              <Input
                type='text'
                value={search}
                placeholder='eg. 123'
                borderRadius='80px'
                backgroundColor='#F3EED9'
                focusBorderColor='#F3EED9'
                onChange={onChangeSearch}
              />
            </InputGroup>
            <Divider height='30px' orientation='vertical' />
            <IconButton
              variant='outline'
              colorScheme='black'
              aria-label='Create patient'
              icon={<AddIcon />}
              onClick={onOpen1}
              marginLeft={2}
            />
            <IconButton
              variant='outline'
              colorScheme='black'
              aria-label='Delete Patient Info'
              fontSize='20px'
              icon={<DeleteIcon />}
              marginLeft={2}
              onClick={() => deletePatient()}
            />
            <IconButton
              variant='outline'
              colorScheme='black'
              aria-label='Edit patient information'
              icon={<EditIcon />}
              onClick={onOpen}
              marginLeft={2}
            />
          </HStack>
        </VStack>
        <TableContainer height='80vh' width='100%' overflowY='auto'>
          <Table size='sm' variant='striped'>
            <Thead
              style={{
                position: 'sticky',
                top: 0,
                backgroundColor: '#FB5058',
                zIndex: 'sticky',
              }}
            >
              {renderTableHeadRow()}
            </Thead>
            <Tbody>{renderTableBodyRow()}</Tbody>
          </Table>
        </TableContainer>
      </VStack>

      {/* Modal display */}
      <Modal
        initialFocusRef={initialRef1}
        finalFocusRef={finalRef1}
        isOpen={isOpen1}
        onClose={onClose1}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Patient Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input
                onBlur={createFName}
                ref={initialRef1}
                placeholder='First name'
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input onBlur={createLName} placeholder='Last name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Gender</FormLabel>
              <Input onBlur={createGender} placeholder='Gender' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>D.O.B</FormLabel>
              <Input onBlur={createDOB} placeholder='D.O.B' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Address</FormLabel>
              <Input onBlur={createAddr} placeholder='Address' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Phone number</FormLabel>
              <Input onBlur={createPhone} placeholder='Phone Number' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Allergies</FormLabel>
              <Input onBlur={createAller} placeholder='Allergies' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              backgroundColor='#F3EED9'
              mr={3}
              onClick={() => createPatient()}
            >
              Create
            </Button>
            <Button backgroundColor='#F3EED9' onClick={onClose1}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Fill out all fields for MRN: {global_patientID}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input
                onBlur={updatePatientFName}
                ref={initialRef}
                placeholder='First name'
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input onBlur={updatePatientLName} placeholder='Last name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Patient D.O.B</FormLabel>
              <Input onBlur={updatePatientdob} placeholder='YYYY-MM-DD' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Gender</FormLabel>
              <Input
                onBlur={updatePatientGender}
                type='number'
                placeholder='Gender'
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Address</FormLabel>
              <Input onBlur={updatePatientAddr} placeholder='Address' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Phone Number</FormLabel>
              <Input onBlur={updatePatientNum} placeholder='XXX-XXX-XXXX' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Allergies</FormLabel>
              <Input onBlur={updatePatientAllergies} placeholder='Allergies' />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              backgroundColor='#F3EED9'
              marginRight={3}
              onClick={() => putData()}
            >
              Confirm Changes
            </Button>
            <Button backgroundColor='#F3EED9' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default PatientListView;
