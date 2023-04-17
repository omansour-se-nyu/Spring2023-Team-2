import { useState , useEffect } from 'react';
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
    ModalCloseButton
} from '@chakra-ui/react';
import { SearchIcon , EditIcon , DeleteIcon } from "@chakra-ui/icons";

// TODO: Display Patient Gender with text
// TODO: Check if onblur or onchange is okay for search field

function BasicUsage() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Lorem count={2} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

const PatientListView = () =>  {
      const [userData, setUserData] = useState({});
      const [patientID, setPatientID] = useState();
      const [patient, setPatient] = useState({});
      const [outOfRange, setOutOfRange] = useState(false);
      const [modal, setModal] = useState(false);

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

          }
      };

      // get patient id from search field
      const editRecord = () => {
        console.log("Edit Record: ", patientID);
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
                />
                <IconButton
                variant='outline'
                colorScheme='black'
                aria-label='Edit patient information'
                icon={<EditIcon />}
                onClick={editRecord()}
                mL={6}
                />
            </InputGroup>

            {outOfRange ? <Text marginLeft={7} fontSize='sm'>Invalid Patient MRN</Text> : null}
            <div>
                <Table>
                <TableContainer>
                    <Thead>
                      <Tr>
                        <Th>Patient MRN</Th>
                        <Th>Patient First Name</Th>
                        <Th>Patient Last Name</Th>
                        <Th>Patient D.O.B</Th>
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
