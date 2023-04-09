import { Card, Text, Image } from '@chakra-ui/react';

const CardSelection = ({ title, imageLink, handleOnClick }) => {
  return (
    <Card
      borderRadius='40px'
      backgroundColor='#F3EED9'
      display='flex'
      onClick={handleOnClick}
      justifyContent='center'
      alignItems='center'
      gap='20%'
      flexDirection='column'
      height='100%'
      transitionDuration='0.5s'
      _hover={{
        opacity: '70%',
        cursor: 'pointer',
      }}
      _active={{
        opacity: '90%',
        transform: 'scale(0.97)',
      }}
    >
      <Image src={imageLink} alt='icon' height='45%' />
      <Text color='#FB5058' fontSize='xl' fontWeight='semibold'>
        {title}
      </Text>
    </Card>
  );
};

export default CardSelection;
