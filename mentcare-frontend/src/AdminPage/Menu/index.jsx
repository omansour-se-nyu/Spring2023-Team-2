import { HStack, VStack, Text } from '@chakra-ui/react';

const Menu = () => {
  return (
    <>
      <HStack padding='10px'>
        <p>Image</p>
        <Text color='#FB5058' fontSize='4xl' fontWeight='bold'>
          admin
        </Text>
      </HStack>

      <VStack padding='10px'></VStack>
    </>
  );
};

export default Menu;
