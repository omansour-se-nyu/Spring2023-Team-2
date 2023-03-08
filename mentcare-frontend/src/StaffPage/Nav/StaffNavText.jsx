import { Text } from '@chakra-ui/react';

const StaffNavText = ({ text, onPage }) => {
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

export default StaffNavText;
