import { HStack, Text } from '@chakra-ui/react';

const Menu = () => {
  return (
    <>
      <HStack padding='10px'>
        <p>Image</p>
        <Text color='#FB5058' fontSize='4xl' fontWeight='bold'>
          admin
        </Text>
      </HStack>

      <nav>
        This is the nav menu
        <div>placehodler</div>
      </nav>
    </>
  );
};

export default Menu;
