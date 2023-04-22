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
} from '@chakra-ui/react';


const all_patient_information = "all patients information";
const all_patients_under_this_doctor = "all patients under this doctor";
const behaviors_since_yesterday = "behaviors since yesterday";

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
            setInformation(actualData);
            setPatientInformation(actualData[all_patient_information]);
            setPatientUnderDoctor(actualData[all_patients_under_this_doctor]);
            setBehaviorChanges(actualData[behaviors_since_yesterday]);
        })
        .catch((err) => {
            console.log(err.message);
        });
    }

    useEffect(() => {
        fetchData();
    }, []);


    return(
        <Table>
            <TableContainer>
                <Thead>
                  <Tr>
                    <Th>Doctor ID</Th>
                    <Th>All Patients under doctor</Th>
                  </Tr>
                </Thead>
                <Tbody>
                    {information.length > 0 && information.map(information => {
                        return (
                            <Tr>
                                <Td>{information}</Td>
                                <Td>{userData[all_patients_under_this_doctor]}</Td>
                            </Tr>
                        );
                    })}
                </Tbody>
            </TableContainer>
        </Table>
    );

}

export default DailySummary;