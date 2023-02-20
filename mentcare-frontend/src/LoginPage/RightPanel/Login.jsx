import { Flex } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';

const Login = () => {
  return (
    <Flex flexDirection='column' alignItems={'center'} gap='10px'>
      <h1 style={{ fontSize: '1.5em' }}>SIGN IN</h1>
      <Input placeholder='enter username' size='md' />
      <Input placeholder='enter password' size='md' />
      <Button>Login</Button>
    </Flex>
  );
};

export default Login;
