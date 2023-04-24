import React, { useState , useEffect } from 'react';
import {
    VStack,
    HStack,
    Divider,
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
    CardBody,
    InputLeftAddon,
} from '@chakra-ui/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const MonthlyReport = () => {
    // get total patients per month in 2022

    // create chart
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: '',
        },
      },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];

    // Hard coded data (running into TOO MANY REQUESTS error)
    const data = {
      labels,
      datasets: [
        {
          label: 'Patients Visited',
          data: [84,79,91,67,92, 82, 92, 73, 70, 87, 90, 83],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };

    const [medication, setMedication] = useState([]);
    const fetchMedication = () => {
        fetch('http://127.0.0.1:8000/staff/patients/drugs-prescribed/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ "month": "01", "year":"2022" }),
        })
          .then((response) => response.json())
          .then((actualData) => {
            const data = JSON.parse(actualData.medication_info);
            console.log(data);
            // all info
            data.sort((a, b) => a.pk - b.pk);
            setMedication(data);
          })
          .catch((err) => {
            console.log(err.message);
          });
      };
    useEffect(() => {
       fetchMedication();
    }, []);
    // render table for Medication
    const renderBody = () => {

        if (medication.length === 0) return null;
        return medication.map(({ pk, fields }) => {
          const { medication_name, cost, application_method } = fields || {};
          return (
            <Tr key={pk}>
              <Td>{pk}</Td>
              <Td>{medication_name}</Td>
              <Td>{cost}</Td>
              <Td>{application_method}</Td>
            </Tr>
          );
        });
    };


    return(
        <ChakraProvider>
        <Text color='#FB5058' fontWeight='bold' fontSize='5xl' paddingLeft='30px'>
            Monthly Report
        </Text>
        <Text color='#FB5058' fontWeight='bold' fontSize='3xl' paddingLeft='30px'>
            Monthly Patient Visits
        </Text>
        <Line options={options} data={data} />
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
                children='Enter Month'
                fontWeight='bold'
                backgroundColor='#d5c37b'
                color='#faf9ef'
              />
              <Input
                type='text'
                placeholder='eg. 123'
                borderRadius='80px'
                backgroundColor='#F3EED9'
                focusBorderColor='#F3EED9'
              />
            </InputGroup>
            <Divider height='30px' orientation='vertical' />
            <InputGroup width='350px'>
              <InputLeftAddon
                children='Enter Year'
                fontWeight='bold'
                backgroundColor='#d5c37b'
                color='#faf9ef'
              />
              <Input
                type='text'
                placeholder='eg. 123'
                borderRadius='80px'
                backgroundColor='#F3EED9'
                focusBorderColor='#F3EED9'
              />
            </InputGroup>
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
            <Tr>
            <Th fontSize='0.8em' color='white'>
                <Text>Patient MRN</Text>
            </Th>
            <Th fontSize='0.8em' color='white'>
                <Text>Medication</Text>
            </Th>
            <Th fontSize='0.8em' color='white'>
                <Text>Cost</Text>
            </Th>
            <Th fontSize='0.8em' color='white'>
                <Text>Application Method</Text>
            </Th>
            </Tr>
            </Thead>
            <Tbody>{renderBody()}</Tbody>
          </Table>
        </TableContainer>
        </VStack>
        </VStack>
        </ChakraProvider>
    );

}

export default MonthlyReport;