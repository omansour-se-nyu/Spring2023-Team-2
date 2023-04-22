import React, { useState , useEffect } from 'react';
import download from './download';
import {
    InputGroup,
    InputLeftElement,
    Text,
    Input,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
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
    ChakraProvider
} from '@chakra-ui/react';
import { ViewIcon , SearchIcon , EditIcon , DeleteIcon , ChatIcon , AddIcon , DownloadIcon} from "@chakra-ui/icons";

var global_patientID = 0;
let editingString = '';

const PatientListView = () =>  {
      const [userData, setUserData] = useState({});
      const [patientID, setPatientID] = useState(0);
      const [patient, setPatient] = useState({});
      const [outOfRange, setOutOfRange] = useState(false);
      const [modal, setModal] = useState(false);
      const [created, setCreated] = useState(false);
      const [userCt, setUserCt] = useState(0);
      const [expandedStr, setExpandedStr] = useState('');


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

      let HEADER;

      // get patient id from search field and edit that record
      const handleChange = (event) => {
          // TODO: add cannot find patient
          if(event.target.value > userCt || event.target.value < 1){
            setOutOfRange(true);
            setPatientID(0);
            setTimeout(() => setOutOfRange(false), 2000);
          }else{
            setPatientID(event.target.value);
            global_patientID = event.target.value;
          }
      };

      const { isOpen: isOpen3 , onOpen: onOpen3, onClose: onClose3 } = useDisclosure();
      const initialRef3 = React.useRef(null);
      const finalRef3 = React.useRef(null);

      // List out Patients =====================
      const fetchData = () => {
        fetch("http://127.0.0.1:8000/staff/patients/records/retrieve/", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ "patient_id": 0 }),
        })
          .then((response) => response.json())
          .then((actualData) => {
            const split_json = JSON.parse(actualData.patient_information);

            // all info
            HEADER = split_json;
            HEADER.sort((a, b) => a.pk - b.pk);
            setUserData(HEADER);
            setUserCt(HEADER.length);
          })
          .catch((err) => {
            console.log(err.message);
          });
     };

    // Create Patients =====================

    // variables to create patient
    let cFN;
    const createFName = (event) => {
        if(event.target.value !== ''){
            cFN = event.target.value;
        }
    }

    let cLN;
    const createLName = (event) => {
        if(event.target.value !== ''){
            cLN = event.target.value;
        }
    }

    let cG;
    const createGender = (event) => {
        if(event.target.value !== ''){
            cG = event.target.value;
        }
    }

    let cdob;
    const createDOB = (event) => {
        if(event.target.value !== ''){
            cdob = event.target.value;
        }
    }

    let cAddr;
    const createAddr = (event) => {
        if(event.target.value !== ''){
            cAddr = event.target.value;
        }
    }

    let cPhone;
    const createPhone = (event) => {
        if(event.target.value !== ''){
            cPhone = event.target.value;
        }
    }

    let cAller;
    const createAller = (event) => {
        if(event.target.value !== ''){
            cAller = event.target.value;
        }
    }

    const { isOpen: isOpen1 , onOpen: onOpen1, onClose: onClose1 } = useDisclosure();
    const initialRef1 = React.useRef(null);
    const finalRef1 = React.useRef(null);

    function createPatient(){
            fetch("http://127.0.0.1:8000/staff/patients/records/create/", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "first_name": cFN,
                    "last_name" : cLN,
                    "gender" : cG,
                    "dob" : cdob,
                    "address" : cAddr,
                    "phone_num" : cPhone,
                    "allergies" : cAller
                 }),
            })
              .then((response) => response.json())
              .then((result) => {
                fetchData();
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
        if(event.target.value !== ''){
            firstName = event.target.value;
        }
    }
    const updatePatientLName = (event) => {
        if(event.target.value !== null){
            lastName = event.target.value;
        }
    }
    const updatePatientdob = (event) => {
        if(event.target.value !== ''){
            dob = event.target.value;
        }
    }
    const updatePatientGender = (event) => {
        if(event.target.value !== ''){
            gender = event.target.value;
        }
    }
    const updatePatientNum = (event) => {
        if(event.target.value !== ''){
            num = event.target.value;
        }
    }
    const updatePatientAddr = (event) => {
        if(event.target.value !== ''){
            addr = event.target.value;
        }
    }
    const updatePatientAllergies = (event) => {
        if(event.target.value !== ''){
            aller_ = event.target.value;
        }
    }
    const { isOpen: isOpen2 , onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
    const initialRef2 = React.useRef(null);
    const finalRef2 = React.useRef(null);

    function clearNotif(){
        editingString = '';
        setNotif(false);
    }

    function putData(){
        // PUT request
        if(global_patientID !== 0){
            const requestOptions = {
            method: 'PUT',
            body: JSON.stringify({
                'patient_id' : global_patientID,
                'first_name': firstName,
                'last_name' : lastName,
                'dob' : dob,
                'gender' : gender,
                'phone_num' : num,
                'address' : addr,
                'allergies' : aller_
            })
        };
        fetch("http://127.0.0.1:8000/staff/patients/records/update/", requestOptions)
        .then(response => response.json())
        .then((result) => {
            console.log(result);
            setNotif(true);
            editingString = editingString + 'Edited ' + global_patientID + '\'s Patient Record.\n';
            fetchData();
          });
        }
    };

    // Delete Patients ===========================
    function deletePatient(){
        console.log("Deleting...", global_patientID);
        fetch('http://127.0.0.1:8000/staff/patients/records/delete/'+global_patientID+'/', { method: 'DELETE' })
        .then(() => console.log('Delete successful'));
        fetchData();
    }


    // Show expanded information =============================
    function expandedView(){
        console.log(global_patientID);
        fetch("http://127.0.0.1:8000/staff/patients/records/retrieve/", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ "patient_id": global_patientID }),
        })
          .then((response) => response.json())
          .then((actualData) => {
            const split_json = JSON.parse(actualData.patient_information);
            console.log(split_json[0]);
            setUserFullName(split_json[0].fields.first_name + ' ' + split_json[0].fields.last_name);
            setAddressStr(split_json[0].fields.address);
            setPhoneNum(split_json[0].fields.phone_num);
            setAllergies(split_json[0].fields.allergies);
          })
          .catch((err) => {
            console.log(err.message);
          });
    }

     useEffect(() => {
        fetchData();
     }, []);

     useEffect(() => {
        putData();
      }, []);

     return (
        <ChakraProvider>
            <Text color='#FB5058' fontWeight='bold' fontSize='5xl' paddingLeft='30px'>
                Patient Overview
            </Text>
            <InputGroup paddingLeft='30px'>
                <InputLeftElement
                    pointerEvents='none'
                    children={<SearchIcon color='black' marginLeft='60px'/>}
                />
                <Input
                    placeholder='Enter Patient MRN'
                    size='md'
                    width='30%'
                    borderRadius='80px'
                    backgroundColor='#F3EED9'
                    focusBorderColor='#F3EED9'
                    onBlur={handleChange}
                />
                <IconButton
                variant='outline'
                colorScheme='black'
                aria-label='Create patient'
                icon={<AddIcon />}
                onClick={onOpen1}
                marginLeft={2}
                />
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
              <Input onBlur={createFName} ref={initialRef1} placeholder='First name' />
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
            <Button backgroundColor='#F3EED9' mr={3} onClick={() => createPatient()}>
              Save
            </Button>
            <Button backgroundColor='#F3EED9' onClick={onClose1}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

                <IconButton
                variant='outline'
                colorScheme='black'
                aria-label='Edit patient information'
                icon={<EditIcon />}
                onClick={onOpen}
                marginLeft={2}
                />
              <Modal onClose={onClose} isOpen={isOpen} isCentered initialFocusRef={initialRef} finalFocusRef={finalRef}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Fill out all fields for MRN: {global_patientID}</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormControl>
                      <FormLabel>First name</FormLabel>
                      <Input onBlur={updatePatientFName} ref={initialRef} placeholder='First name' />
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
                      <Input onBlur={updatePatientGender} type='number' placeholder='Gender' />
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
                    <Button backgroundColor='#F3EED9' marginRight={3} onClick={() => putData()}>Confirm Changes</Button>
                    <Button backgroundColor='#F3EED9' onClick={onClose}>Close</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
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
                    colorScheme={notif ? 'red' : 'black'}
                    aria-label='Get Patient Update'
                    fontSize='20px'
                    icon={<ChatIcon />}
                    onClick={onOpen2}
                    marginLeft={2}
                />
                <Modal onClose={onClose2} isOpen={isOpen2} isCentered initialFocusRef={initialRef2} finalFocusRef={finalRef2}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Notifications</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                   {editingString.split('\n').map(str => <p>{str}</p>)}
                  </ModalBody>
                  <ModalFooter>
                    <Button backgroundColor='#F3EED9' onClick={() => clearNotif()} marginRight={3}>Clear</Button>
                    <Button backgroundColor='#F3EED9' onClick={onClose2}>Close</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              <IconButton
                    variant='outline'
                    colorScheme='black'
                    aria-label='View Patient Info'
                    fontSize='20px'
                    icon={<ViewIcon />}
                    marginLeft={2}
                    onClick={expandedView(), onOpen3}
                />
                <Modal onClose={onClose3} isOpen={isOpen3} isCentered initialFocusRef={initialRef3} finalFocusRef={finalRef3}>
                  <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Expanded Patient View</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody pb={6}>
                                {fullname !== undefined ? 'Name: ' + fullname : 'Name: '}
                                <br></br>
                                {addressStr !== undefined ? 'Address: ' + addressStr : 'Address: '}
                                <br></br>
                                {phoneNumStr !== undefined ? 'Phone Number: ' + phoneNumStr : 'Phone Number: '}
                                <br></br>
                                {allergiesStr !== undefined ? 'Allergies: ' + allergiesStr : 'Allergies: '}
                      </ModalBody>
                      <ModalFooter>
                        <Button backgroundColor='#F3EED9' onClick={onClose3}>Close</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
            </InputGroup>


            {outOfRange ? <Text marginLeft={7} fontSize='sm'>Invalid Patient MRN</Text> : null}
            <div>
                <Table>
                <TableContainer>
                    <Thead>
                      <Tr>
                        <Th>Patient MRN</Th>
                        <Th>First Name</Th>
                        <Th>Last Name</Th>
                        <Th>D.O.B</Th>
                        <Th>Gender</Th>
                        <Th>Download</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                        {userData.length > 0 && userData.map(userData => {
                            return (
                                <Tr>
                                    <Td>{userData.pk}</Td>
                                    <Td>{userData.fields.first_name}</Td>
                                    <Td>{userData.fields.last_name}</Td>
                                    <Td>{userData.fields.dob}</Td>
                                    <Td>{userData.fields.gender}</Td>
                                    <Td> <IconButton
                                        variant='outline'
                                        colorScheme='black'
                                        aria-label='Download Patient Info'
                                        fontSize='20px'
                                        icon={<DownloadIcon />}
                                        marginLeft={2}
                                        onClick={() => download(userData)}
                                    />
                                    </Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </TableContainer>
                </Table>
            </div>
        </ChakraProvider>
      );

};


export default PatientListView;