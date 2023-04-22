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
    FormLabel,
    ChakraProvider,
    Card,
    CardBody
} from '@chakra-ui/react';
import { ViewIcon , SearchIcon , EditIcon , DeleteIcon , ChatIcon , AddIcon , DownloadIcon} from "@chakra-ui/icons";


const DailySummary = () => {
    // set patient summary information based on doctor
    const [information, setInformation] = useState({});
    const [patientInformation, setPatientInformation] = useState('undefined');
    const [patientUnderDoctor, setPatientUnderDoctor] = useState('');
    const [behaviorChanges, setBehaviorChanges] = useState('undefined');
    const [globalDoctorID, setGlobalDoctorID] = useState(0);

    // patient treatment
    const [fullname, setFullname] = useState('undefined');
    const [patientID, setPatientID] = useState('undefined');
    const [allergies, setAllergies] = useState('undefined');
    const [medicationID, setMedicationID] = useState('undefined');
    const [appointmentId, setAppointmentId] = useState('undefined');
    const [status, setStatus] = useState('undefined');

    function doctorIDChange(event){
        console.log(event.target.value);
        setGlobalDoctorID(event.target.value);
        const URL = 'http://127.0.0.1:8000/staff/patients/daily-summary/';
        fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ "doctor_id": event.target.value }),
        })
        .then((response) => response.json())
        .then((actualData) => {
            if(actualData.status === "Success"){
                //console.log(globalDoctorID);
                const data = JSON.parse(actualData.all_patients_under_this_doctor);
                //console.log('All patients under this doctor: \n' + actualData.all_patients_under_this_doctor);
                setPatientUnderDoctor(data[0].fields);
                setMedicationID(data[0].fields.medication_id);
                setAppointmentId(data[0].fields.appointment_id);

                const data2 = JSON.parse(actualData.all_patients_information);
                //console.log(data2)
                //console.log(data2[0].fields);
                setFullname(data2[0].fields.first_name + ' ' + data2[0].fields.last_name);
                setPatientID(data2[0].pk);
                setAllergies(data2[0].fields.allergies);

                const data3 = JSON.parse(actualData.behaviors_since_yesterday);
                console.log(data3);
                setPatientInformation(data3[0].fields.behavior);


                setInformation(actualData);
            }
        })
        .catch((err) => {
            console.log(err.message);
        });
    }

    // medication perscribed



    return(
        <ChakraProvider>
        <Text color='#FB5058' fontWeight='bold' fontSize='5xl' paddingLeft='30px'>
            Daily Summary
        </Text>
        <InputGroup paddingLeft='30px'>
            <InputLeftElement
                pointerEvents='none'
                children={<SearchIcon color='black' marginLeft='60px'/>}
            />
            <Input
                placeholder='Enter your doctor ID'
                size='md'
                width='30%'
                borderRadius='80px'
                backgroundColor='#F3EED9'
                focusBorderColor='#F3EED9'
                onBlur={doctorIDChange}
            />
        </InputGroup>
        <Text color='#FB5058' fontWeight='bold' fontSize='2xl' paddingLeft='30px' paddingTop={'30px'}>
            {'Doctor ID: ' + globalDoctorID}
        </Text>
        <Card backgroundColor='#F3EED9' focusBorderColor='#F3EED9' width='80%' marginLeft={5} marginTop={3}>
            <CardBody marginTop={3}>
                      <Text fontSize='xl' as='b'>{"Patient Summary"}</Text>
                      <br></br>
                      <Text fontSize='lg' as='u'>{'Patient Full Name: '}</Text> <Text fontSize='lg'>{fullname}</Text>
                       <br></br>
                      <Text fontSize='lg' as='u'>{'Patient ID: '}</Text> <Text fontSize='lg'>{patientID}</Text>
                      <br></br>
                      <Text fontSize='lg' as='u'>{'Patient Allergies: '}</Text> <Text fontSize='lg'>{allergies}</Text>
                      <br></br>
                      <Text fontSize='lg' as='u'>{'Patient Behavior: '}</Text> <Text fontSize='lg'>{patientInformation}</Text>
            </CardBody>
        </Card>
        </ChakraProvider>
    );

}

export default DailySummary;