import { Grid,
  GridItem,
  Text,
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

const PatientListView = () => {
  return (
    <div>
    <Text color='#FB5058' fontWeight='bold' fontSize='5xl' marginLeft='20px'>
      Patients
    </Text>
    <Text color='#FB5058' fontWeight='bold' fontSize='2xl'marginLeft='20px'>
      Patient Lookup
    </Text>
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>D.O.B</Th>
            <Th>Gender</Th>
            <Th>Phone Number</Th>
            <Th>Address</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td></Td>
          </Tr>
          <Tr>
            <Td></Td>
          </Tr>
          <Tr>
            <Td></Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default PatientListView;
