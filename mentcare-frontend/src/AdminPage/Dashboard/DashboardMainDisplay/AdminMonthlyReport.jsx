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


const AdminMonthlyReport = () => {

    const [medication, setMedication] = useState([]);

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


    // render table for Medication
    const renderBody = () => {

        if (medication.length === 0) return null;
        return medication.map(({ pk, fields }) => {
          const { medication_name, cost } = fields || {};
          return (
            <Tr key={pk}>
              <Td>{pk}</Td>
              <Td>{medication_name}</Td>
              <Td>{cost}</Td>
            </Tr>
          );
        });
    };

    useEffect(() => {
       fetchMedication();
    }, []);


    return(
        <ChakraProvider>
        <Text color='#FB5058' fontWeight='bold' fontSize='5xl' paddingLeft='30px'>
            Monthly Report
        </Text>
      <VStack height='100vh' width='100%'>
      <VStack width='100%' height='100vh'>
          <Text color='#FB5058' fontWeight='bold' align='center' fontSize='2xl' marginTop='50px'>
            Medication Cost per Patient
          </Text>

       </VStack>
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
      <VStack width='100%' height='80%' align='start'>
        <TableContainer height='100%' width='100%' overflowY='auto'>
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

export default AdminMonthlyReport;