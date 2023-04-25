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
    Grid,
    CardHeader,
    Heading,
    Stack,
    StackDivider,
    Box,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel
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
  ArcElement
} from 'chart.js';
import { Line , Doughnut } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const MonthlyReport = () => {

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
    const [monthMedi, setMonthMedi] = useState('01');
    const [yearMedi, setYearMedi] = useState('2022');
    const setMonth = (event) => {
        if (!event.target.value){
            setMonthMedi("01");
        }else{
            setMonthMedi(event.target.value);
        }
        fetchMedication();
    }
    const setYear = (event) => {
        if (!event.target.value){
            setYearMedi("2022");
        }else{
            setYearMedi(event.target.value);
        }
        fetchMedication();
    }

    const fetchMedication = () => {
        fetch('http://127.0.0.1:8000/staff/patients/drugs-prescribed/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ "month": monthMedi, "year":yearMedi }),
        })
          .then((response) => response.json())
          .then((actualData) => {
            const data = JSON.parse(actualData.medication_info);
            //console.log(data);
            // all info
            data.sort((a, b) => a.pk - b.pk);
            setMedication(data);
          })
          .catch((err) => {
            console.log(err.message);
          });
      };

    // render table for Medication
    const renderBody = () => {

        if (medication.length === 0) return null;
        return medication.map(({ pk, fields }) => {
          const { medication_name, application_method } = fields || {};
          return (
            <Tr key={pk}>
              <Td>{pk}</Td>
              <Td>{medication_name}</Td>
              <Td>{application_method}</Td>
            </Tr>
          );
        });
    };

    const fetchPatientsIn = () => {
        fetch('http://127.0.0.1:8000/admin/patients/system-status/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ "month": "01", "year":"2022" }),
        })
          .then((response) => response.json())
          .then((actualData) => {
            //console.log(actualData.incoming_patients, actualData.outgoing_patients);
          })
          .catch((err) => {
            console.log(err.message);
          });
      };

    // data
    const data1 = {
      labels,
      datasets: [
        {
          label: 'Patients In',
          data: [72, 65, 88, 80, 84, 79, 92, 87, 89, 79, 81, 94],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Patients Out',
          data: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };

        const data2 = {
      labels,
      datasets: [
        {
          label: 'Patients In',
          data: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Patients Out',
          data: [ 90, 62, 82, 95, 80, 86, 87, 81, 77, 90, 83, 77],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };

    useEffect(() => {
       fetchMedication();
    }, []);

    useEffect(() => {
       fetchPatientsIn();
    }, []);


    return(
        <ChakraProvider>
        <Text color='#FB5058' fontWeight='bold' fontSize='5xl' paddingLeft='30px'>
            Monthly Report
        </Text>
        <Grid templateColumns='repeat(2, 1fr)' padding='5px' height='40%'>
            <Card backgroundColor='white' focusBorderColor='#F3EED9' width='80%' marginLeft={5}>
              <CardHeader>
                    <Text color='#FB5058' fontWeight='bold' fontSize='3xl' paddingLeft='30px'>
                    Patients in/out per month
                    </Text>
              </CardHeader>
              <Accordion defaultIndex={[0]} allowMultiple>
                  <AccordionItem>
                    <h2>
                      <AccordionButton onClick={fetchPatientsIn}>
                        <Box as="span" flex='1' textAlign='left'>
                          2022 Statistics
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <Line options={options} data={data1} />
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                          2023 Statistics
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <Line options={options} data={data2} />
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
            </Card>

            <Card backgroundColor='#white' focusBorderColor='#F3EED9' width='80%' marginLeft={5}>
                <CardHeader>
                    <Text color='#FB5058' fontWeight='bold' fontSize='3xl' paddingLeft='30px'>
                    Monthly Patient Visits
                    </Text>
                </CardHeader>
                <Line options={options} data={data} />
            </Card>
        </Grid>

      <VStack height='70vh' width='100%'>
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
          <Text color='#FB5058' fontWeight='bold' align='center' fontSize='4xl' marginTop='50px'>
            Medication Perscribed per Patient
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
                placeholder='eg. 01'
                borderRadius='80px'
                backgroundColor='#F3EED9'
                focusBorderColor='#F3EED9'
                onBlur={setMonth}
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
                placeholder='eg. 2022'
                borderRadius='80px'
                backgroundColor='#F3EED9'
                focusBorderColor='#F3EED9'
                onBlur={setYear}
              />
            </InputGroup>
          </HStack>
        </VStack>
        <TableContainer height='52vh' width='100%' overflowY='auto'>
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