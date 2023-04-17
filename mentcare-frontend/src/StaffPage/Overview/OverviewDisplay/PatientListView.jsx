import React, { useState , useEffect } from 'react';
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
    FormLabel
} from '@chakra-ui/react';
import { SearchIcon , EditIcon , DeleteIcon } from "@chakra-ui/icons";

// TODO: Display Patient Gender with text
// TODO: Check if onblur or onchange is okay for search field

function VerticallyCenter() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  return (
    <>
      <IconButton
                variant='outline'
                colorScheme='black'
                aria-label='Edit patient information'
                icon={<EditIcon />}
                onClick={onOpen}
                mL={6}
                />

      <Modal onClose={onClose} isOpen={isOpen} isCentered initialFocusRef={initialRef} finalFocusRef={finalRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit MRN Record: {global_patientID}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input ref={initialRef} placeholder='First name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder='Last name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Patient D.O.B</FormLabel>
              <Input type='date' placeholder='Last name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Gender</FormLabel>
              <Input type='number' placeholder='Gender' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Address</FormLabel>
              <Input placeholder='Address' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Phone Number</FormLabel>
              <Input type='tel' placeholder='Phone Number' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Allergies</FormLabel>
              <Input placeholder='Allergies' />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

var global_patientID = 0;
const PatientListView = () =>  {
      const [userData, setUserData] = useState({});
      const [patientID, setPatientID] = useState();
      const [patient, setPatient] = useState({});
      const [outOfRange, setOutOfRange] = useState(false);
      const [modal, setModal] = useState(false);

      const { isOpen, onOpen, onClose } = useDisclosure();
      const initialRef = React.useRef(null)
      const finalRef = React.useRef(null)

      let HEADER;

      // get patient id from search field and edit that record
      const handleChange = (event) => {
          //console.log(event.target.value);
          // TODO: add cannot find patient
          if(event.target.value > 1000 || event.target.value < 1){
            console.log("MRN out of range");
            setOutOfRange(true);
            setPatientID(0);
            setTimeout(() => setOutOfRange(false), 2000);
          }else{
            setPatientID(event.target.value);
            global_patientID = event.target.value;
            console.log("Edit Record: ", global_patientID);
          }
      };

      const fetchData = () => {
        fetch("http://127.0.0.1:8000/staff/patients/records/retrieve/", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ "patient_id": 0 }),
        })
          .then((response) => response.json())
          .then((actualData) => {
            //console.log(patientID);
            const split_json = JSON.parse(actualData.patient_information);
            //console.log(split_json[0].fields); // index needs to be a loop to add on to frontend

            // all info
            HEADER = split_json;
            setUserData(HEADER);
            //console.log(HEADER.first_name);
            //console.log(HEADER.last_name);

          })
          .catch((err) => {
            console.log(err.message);
          });
     };

     useEffect(() => {
        fetchData();
      }, []);


     return (
        <div>
            <Text color='#FB5058' fontWeight='bold' fontSize='5xl' paddingLeft='30px'>
                Patient Overview
            </Text>
            <InputGroup paddingLeft='30px'>
                <InputLeftElement
                    pointerEvents='none'
                    children={<SearchIcon color='black' ml={60}/>}
                />
                <Input
                    placeholder='Patient MRN'
                    size='md'
                    width='30%'
                    borderRadius='80px'
                    backgroundColor='#F3EED9'
                    focusBorderColor='#F3EED9'
                    onBlur={handleChange}
                    marginRight={2}
                />
                {VerticallyCenter()}
            </InputGroup>


            {outOfRange ? <Text marginLeft={7} fontSize='sm'>Invalid Patient MRN</Text> : null}
            <div>
                <Table marginLeft={7}>
                <TableContainer>
                    <Thead>
                      <Tr>
                        <Th>Patient MRN</Th>
                        <Th>First Name</Th>
                        <Th>Last Name</Th>
                        <Th>D.O.B</Th>
                        <Th>Gender</Th>
                        <Th>Phone Number</Th>
                        <Th>Allergies</Th>
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
                                    <Td>{userData.fields.phone_num}</Td>
                                    <Td>{userData.fields.allergies}</Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </TableContainer>
                </Table>
            </div>
        </div>
      );

};


export default PatientListView;
