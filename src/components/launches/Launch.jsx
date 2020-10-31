import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Flex,
  Box,
  Text,
  Spinner,
} from '@chakra-ui/core';

import Header from './LaunchHeader';
import TimeAndLocation from './TimeAndLocation';
import { Video, Gallery } from './LaunchMedia';
import RocketInfo from './RocketInfo';
import FavouritesDrawer from './FavouritesDrawer';
import FavouritesIcon from './FavouritesIcon';

import { useSpaceX } from '../../utils/use-space-x';
import Error from '../sharedComponents/Error';
import Breadcrumbs from '../sharedComponents/Breadcrumbs';

export default function Launch() {
  const { launchId } = useParams();
  const { data: launch, error } = useSpaceX(`/launches/${launchId}`);

  if (error) return <Error />;
  if (!launch) {
    return (
      <Flex justifyContent="center" alignItems="center" minHeight="50vh">
        <Spinner size="lg" />
      </Flex>
    );
  }

  return (
    <div>
      <Flex lineHeight="tight" justifyContent="space-between" align="center">
        <Flex justifyContent="start" align="center">
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Launches', to: '..' },
              { label: `#${launch.flight_number}` },
            ]}
          />
          <FavouritesIcon launch={launch} isSmall={false} />
        </Flex>
        <FavouritesDrawer />
      </Flex>
      <Header launch={launch} />
      <Box m={[3, 6]}>
        <TimeAndLocation launch={launch} />
        <RocketInfo launch={launch} />
        <Text color="gray.700" fontSize={['md', null, 'lg']} my="8">
          {launch.details}
        </Text>
        <Video launch={launch} />
        <Gallery images={launch.links.flickr_images} />
      </Box>
    </div>
  );
}
