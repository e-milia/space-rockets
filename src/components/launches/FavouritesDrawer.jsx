import React from 'react';
import {
  Box,
  SimpleGrid,
  Text,
  Flex,
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  useDisclosure,
} from '@chakra-ui/core';
import { BsDiamondFill } from 'react-icons/bs';

import LaunchItem from './LaunchItem';
import getFromLocalStorage from '../../utils/get-from-local-storage';

export default function FavouritesDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const favourites = getFromLocalStorage('favourites') || [];
  const count = favourites && favourites.length;

  return (
    <>
      <Flex onClick={onOpen} m={[2, null, 6]}>
        <Button color="white" backgroundColor="gray.800" onClick={onOpen} ref={btnRef}>
          <Box as={BsDiamondFill} size="24px" color="yellow.400" mr="2" />
          View Favourites
        </Button>
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent textAlign="center" backgroundColor="gray.100">
          <DrawerCloseButton />
          <DrawerHeader>
            <Text
              letterSpacing="2px"
              fontWeight="bold"
              fontSize="lg"
            >
              FAVOURITES
            </Text>
          </DrawerHeader>

          <DrawerBody textAlign="left">
            <Text
              m={[2, null, 6]}
              fontWeight="bold"
              fontSize="lg"
            >
              {`Launches (${count})`}
            </Text>
            <SimpleGrid m={[2, null, 0]} spacing="2">
              {favourites && favourites.length
                && favourites
                  .flat()
                  .map((launch) => (
                    <LaunchItem
                      launch={launch}
                      key={launch.flight_number}
                      isSmall
                    />
                  ))}
            </SimpleGrid>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
