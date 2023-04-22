import React, { useState , useEffect } from 'react';
import {
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
    ChakraProvider
} from '@chakra-ui/react';

const DailySummary = () => {
    // set patient summary information based on doctor
    const [information, setInformation] = useState({});
    const [patientInformation, setPatientInformation] = useState('');
    const [patientUnderDoctor, setPatientUnderDoctor] = useState('');
    const [behaviorChanges, setBehaviorChanges] = useState('');

    function fetchData(){
        const URL = 'http://127.0.0.1:8000/staff/patients/daily-summary/';
        fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ "doctor_id": 2 }),
        })
        .then((response) => response.json())
        .then((actualData) => {
            console.log(actualData);
            const data = JSON.parse(actualData.all_patients_under_this_doctor);
            console.log(data[0].fields);
            setPatientUnderDoctor(data[0].fields);

            const data2 = JSON.parse(actualData.all_patients_information);
            //console.log(data2);
            setPatientInformation(data2[0].fields);

            const data3 = JSON.parse(actualData.behaviors_since_yesterday);
            //console.log(data3);
            setPatientInformation(data3[0].fields);

            setInformation(actualData);

        })
        .catch((err) => {
            console.log(err.message);
        });
    }

    useEffect(() => {
        fetchData();
    }, []);


    return(
        <ChakraProvider>
        <Table>
            <TableContainer>
                <Thead>
                  <Tr>
                    <Th>Doctor ID</Th>
                    <Th>All Patients under doctor</Th>
                  </Tr>
                </Thead>
                <Tbody>
                   <Tr>
                       <Td></Td>
                   </Tr>
                </Tbody>
            </TableContainer>
        </Table>
        </ChakraProvider>
    );

}

export default DailySummary;