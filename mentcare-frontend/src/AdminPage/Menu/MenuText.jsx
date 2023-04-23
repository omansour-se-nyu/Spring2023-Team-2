import { Text } from '@chakra-ui/react';

const MenuText = ({ text, onPage, handleOnClick }) => {
  return (
    <Text
      fontWeight='semibold'
      _hover={{
        cursor: 'pointer',
        opacity: '90%',
      }}
      color='#FFFFFF'
      onClick={handleOnClick}
      fontSize='xl'
      opacity={onPage ? '100%' : '70%'}
    >
      {text}
    </Text>
  );
};

export default MenuText;
