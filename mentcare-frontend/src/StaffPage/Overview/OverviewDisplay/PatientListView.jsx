import { useState , useEffect } from 'react';
import {
    InputGroup,
    InputLeftElement,
    Text,
    Input,
    Card,
    CardBody,
    CardHeader,
    Heading,
    Stack,
    StackDivider,
    Box,
    Center
} from '@chakra-ui/react';
import { SearchIcon , EditIcon , DeleteIcon } from "@chakra-ui/icons";

// TODO: Display Patient Gender with text
// TODO: Check if onblur or onchange is okay for search field

const PatientListView = () =>  {
      const [userData, setUserData] = useState({});
      const [patientID, setPatientID] = useState(1);
      const [outOfRange, setOutOfRange] = useState(false);

      let HEADER;

      // get patient id from search field
      const handleChange = (event) => {
          //console.log(event.target.value);
          // TODO: add cannot find patient
          if(event.target.value > 1000 || event.target.value < 1){
            console.log("MRN out of range");
            setOutOfRange(true);
            setTimeout(() => setOutOfRange(false), 2000);
          }else{
            setPatientID(event.target.value);
          }
      };

      const fetchData = () => {
        fetch("http://127.0.0.1:8000/staff/patients/records/retrieve/", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ "patient_id": parseInt(patientID) }),
        })
          .then((response) => response.json())
          .then((actualData) => {
            //console.log(patientID);
            const split_json = JSON.parse(actualData.patient_information);

            // all info
            HEADER = split_json[0].fields;
            //console.log(HEADER);
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
      }, [patientID]);


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
            </InputGroup>
            {outOfRange ? <Text marginLeft={7} fontSize='sm'>Invalid Patient MRN</Text> : null}
            <div>
                    <Center>
                        <Heading size='md' p={2}>{userData.first_name} {userData.last_name}'s Summary</Heading>
                        <EditIcon boxSize={18} marginLeft={7}/>
                        <DeleteIcon boxSize={18} marginLeft={7}/>
                    </Center>
                    <Stack divider={<StackDivider borderColor='white'/>} spacing='2' m={50} h='100%'>
                        <Box bg='#F3EED9' w='100%' p={4} color='black' borderRadius='80px'  >
                            <Text as='b'>Patient D.O.B:</Text> {userData.dob}
                        </Box>
                        <Box bg='#F3EED9' w='100%' p={4} color='black' borderRadius='80px'  >
                            <Text as='b'>Patient Gender:</Text> {userData.gender}
                        </Box>
                        <Box bg='#F3EED9' w='100%' p={4} color='black' borderRadius='80px'  >
                            <Text as='b'>Patient Address:</Text> {userData.address}
                        </Box>
                        <Box bg='#F3EED9' w='100%' p={4} color='black' borderRadius='80px'  >
                            <Text as='b'>Patient Phone Number:</Text> {userData.phone_num}
                        </Box>
                        <Box bg='#F3EED9' w='100%' p={4} color='black' borderRadius='80px'  >
                            <Text as='b'>Patient Allergies:</Text> {userData.allergies}
                        </Box>
                    </Stack>
                </div>
        </div>
      );

};


export default PatientListView;
