import { FormControl, Button, Input, Link, Text } from '@chakra-ui/react';

const Staff = () => {
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
          backgroundColor='#F3EED9'
          auto
          autoComplete='off'
          _focusVisible={{
            outlineColor: '#F3EED9',
          }}
        />
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
        >
          Login
        </Button>
        <Link color='#FB5058'>Forgot password?</Link>
      </FormControl>
    </form>
  );
};

export default Staff;
