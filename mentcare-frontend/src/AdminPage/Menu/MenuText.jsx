import { Text } from '@chakra-ui/react';

const MenuText = ({ text, onPage }) => {
  return (
    <Text
      fontWeight='semibold'
      color='#FFFFFF'
      fontSize='xl'
      opacity={onPage ? '100%' : '70%'}
    >
      {text}
    </Text>
  );
};

export default MenuText;
