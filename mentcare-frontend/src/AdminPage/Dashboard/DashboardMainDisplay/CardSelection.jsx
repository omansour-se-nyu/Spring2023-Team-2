import { Card, Text, scaleFadeConfig } from '@chakra-ui/react';

const CardSelection = ({ title, imageLink }) => {
  return (
    <Card
      borderRadius='40px'
      backgroundColor='#F3EED9'
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
      height='100%'
      transitionDuration='0.5s'
      _hover={{
        opacity: '70%',
        cursor: 'pointer',
        transform: 'scale(0.97)',
      }}
      _active={{
        opacity: '90%',
      }}
    >
      Image here
      <Text color='#FB5058' fontSize='xl' fontWeight='semibold'>
        {title}
      </Text>
    </Card>
  );
};

export default CardSelection;
