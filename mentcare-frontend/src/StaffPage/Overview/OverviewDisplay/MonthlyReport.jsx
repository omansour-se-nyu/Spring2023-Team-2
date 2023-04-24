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

    return(
        <ChakraProvider>
        <Text color='#FB5058' fontWeight='bold' fontSize='5xl' paddingLeft='30px'>
            Monthly Report
        </Text>
        <Text textAlign='center' color='#FB5058' fontWeight='bold' fontSize='3xl' paddingLeft='30px'>
            Monthly Patient Visits
        </Text>
        <Line options={options} data={data} />

        </ChakraProvider>
    );

}

export default MonthlyReport;