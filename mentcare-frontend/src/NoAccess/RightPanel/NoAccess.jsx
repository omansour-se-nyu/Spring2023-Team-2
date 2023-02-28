import { FormControl, Button, Input, Link, Text } from '@chakra-ui/react';
import LoginPage from '../../LoginPage';
import { useNavigate } from "react-router-dom";

const NoAccess = () => {
  // fix Page Linking for "go back" button
  let navigate = useNavigate();
  const handleClickUser = (e) => {
    let path = LoginPage;
    navigate(path);
  };
  return (
        <div>
        <Text fontSize='3em' fontWeight='bold' color='#FB5058' style={{justifyContent:'center'}}>
          No access
        </Text>

       <Button
          borderRadius='80px'
          minWidth='200px'
          backgroundColor='#FB5058'
          color='#FFFFFF'
          onClick={handleClickUser}
          style={{marginLeft:'10px'}}
          _hover={{
            opacity: '70%',
          }}
          _active={{
            opacity: '90%',
          }}
        >
          Go Back
        </Button>
       </div>
  );
};

export default NoAccess;
