import { FormControl, Button, Input, Link, Text } from '@chakra-ui/react';
import Login from '../../LoginPage';

const NoAccess = () => {
  // fix Page Linking for "go back" button
  return (
        <div>
        <Text fontSize='3em' fontWeight='bold' color='#FB5058' style={{justifyContent:'center'}}>
          No access
        </Text>

       <Link to='/LoginPage'>
       <Button
          borderRadius='80px'
          minWidth='200px'
          backgroundColor='#FB5058'
          color='#FFFFFF'
          style={{marginLeft:'10px'}}
          _hover={{
            opacity: '70%',
          }}
          _active={{
            opacity: '90%',
          }}
        >
          Go Back
        </Button></Link>
       </div>
  );
};

export default NoAccess;
