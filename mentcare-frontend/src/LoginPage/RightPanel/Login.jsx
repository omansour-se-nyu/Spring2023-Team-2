import { useState } from 'react';
import { FormControl, Button, Input, Link, Text } from '@chakra-ui/react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [invalidLogin, setInvalidLogin] = useState(false);

  const onClickLogin = async () => {
    const url = 'http://127.0.0.1:8000/login/';
    const data = {
      username: username,
      password: password,
    };
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      const loginResponse = await fetch(url, config).then((res) => res.json());
      const { message } = loginResponse;
      if (message === 'Access Forbidden') {
        setInvalidLogin(true);
        setTimeout(() => setInvalidLogin(false), 1000);
      }
      console.log('repsonse received', loginResponse);
    } catch (err) {
      console.log('error is', err);
    }
  };

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <form>
      <FormControl
        style={{
          display: 'flex',
          flexDirection: 'column',
          minWidth: '300px',
          maxWidth: '500px',
          width: '100%',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <Text fontSize='3em' fontWeight='bold' color='#FB5058'>
          SIGN IN
        </Text>
        <Input
          placeholder='enter username'
          size='md'
          type='email'
          width='100%'
          onChange={onChangeUsername}
          borderRadius='80px'
          backgroundColor='#F3EED9'
          autoComplete='off'
          _focusVisible={{
            outlineColor: '#F3EED9',
          }}
        />
        <Input
          placeholder='enter password'
          size='md'
          type='password'
          borderRadius='80px'
          onChange={onChangePassword}
          backgroundColor='#F3EED9'
          auto
          autoComplete='off'
          _focusVisible={{
            outlineColor: '#F3EED9',
          }}
        />
        {invalidLogin ? <Text fontSize='sm'>Invalid Login</Text> : null}
        <Button
          borderRadius='80px'
          minWidth='200px'
          backgroundColor='#FB5058'
          color='#FFFFFF'
          _hover={{
            opacity: '70%',
          }}
          _active={{
            opacity: '90%',
          }}
          onClick={onClickLogin}
        >
          Login
        </Button>
        <Link color='#FB5058'>Forgot password?</Link>
      </FormControl>
    </form>
  );
};

export default Login;
