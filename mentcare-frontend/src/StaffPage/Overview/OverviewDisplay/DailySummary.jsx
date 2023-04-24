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
    FormControl,
    FormLabel,
    ChakraProvider,
    Card,
    CardBody
} from '@chakra-ui/react';
import { SearchIcon } from "@chakra-ui/icons";


const DailySummary = () => {
    // set patient summary information based on doctor
    const [information, setInformation] = useState({});
    const [patientInformation, setPatientInformation] = useState('undefined');
    const [patientUnderDoctor, setPatientUnderDoctor] = useState('');
    const [behaviorChanges, setBehaviorChanges] = useState('undefined');
    const [globalDoctorID, setGlobalDoctorID] = useState(0);

    // patient treatment
    const [fullname, setFullname] = useState('');
    const [patientID, setPatientID] = useState('');
    const [allergies, setAllergies] = useState('');
    const [medicationID, setMedicationID] = useState('');
    const [appointmentId, setAppointmentId] = useState('');
    const [status, setStatus] = useState('');
    const [doctorName, setDoctorName] = useState('');
    const [departmentName, setDepartmentName] = useState('');
    const [email, setEmail] = useState('');
    const [dosage, setDosage] = useState('');
    const [date, setAppointmentDate] = useState('');

    function doctorIDChange(event){
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
                console.log(actualData.all_patients_under_this_doctor);
                const data = JSON.parse(actualData.all_patients_under_this_doctor);
                setPatientUnderDoctor(data[0].fields);
                setMedicationID(data[0].fields.medication_id);
                setAppointmentId(data[0].fields.appointment_id);
                setAppointmentDate(data[0].fields.date);
                setDosage(data[0].fields.dosage);

                const data2 = JSON.parse(actualData.all_patients_information);
                setFullname(data2[0].fields.first_name + ' ' + data2[0].fields.last_name);
                setPatientID(data2[0].pk);
                setAllergies(data2[0].fields.allergies);

                const data3 = JSON.parse(actualData.behaviors_since_yesterday);
                setPatientInformation(data3[0].fields.behavior);


                setInformation(actualData);
            }
        })
        .catch((err) => {
            console.log(err.message);
        });
        const URL2 = 'http://127.0.0.1:8000/admin/staff/retrieve/';
        fetch(URL2, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ "doctor_id": event.target.value }),
        })
        .then((response) => response.json())
        .then((actualData) => {
            setDoctorName(JSON.parse(actualData.patient_information)[0].fields.name);
            setDepartmentName(JSON.parse(actualData.patient_information)[0].fields.department);
            setEmail(JSON.parse(actualData.patient_information)[0].fields.email);
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
            {'Welcome, Dr. ' + doctorName + '!'}
        </Text>
        <Text color='#FB5058' fontWeight='' fontSize='lg' paddingLeft='30px'>
            Department - {departmentName}
        </Text>
        <Text color='#FB5058' fontWeight='' fontSize='lg' paddingLeft='30px'>
            Email - {email}
        </Text>
        <Card backgroundColor='#F3EED9' focusBorderColor='#F3EED9' width='80%' marginLeft={5} marginTop={3}>
            <CardBody>
                      <Text fontSize='xl' as='b'>{"Current Patient"}</Text>
                      <br></br>
                      <Text marginTop={3} fontSize='lg'>{'Patient Full Name: '} {fullname}</Text>
                       <br></br>
                      <Text fontSize='lg'>{'Patient ID: '} {patientID}</Text>
                      <br></br>
                      <Text fontSize='lg'>{'Patient Allergies: '} {allergies}</Text>
                      <br></br>
                      <Text fontSize='lg'>{'Patient Behavior: '} {patientInformation}</Text>
                      <br></br>
                      <Text fontSize='lg'>{'Appointment Id: '} {appointmentId}</Text>
                      <br></br>
                      <Text fontSize='lg'>{'Appointment Date: '} {date}</Text>
                      <br></br>
                      <Text fontSize='lg'>{'Medication Dosage: '} {dosage}</Text>

            </CardBody>
        </Card>
        </ChakraProvider>
    );

}

export default DailySummary;