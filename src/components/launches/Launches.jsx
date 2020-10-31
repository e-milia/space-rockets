import React from 'react';
import {
  SimpleGrid,
  Flex,
} from '@chakra-ui/core';

import { useSpaceXPaginated } from '../../utils/use-space-x';
import Error from '../sharedComponents/Error';
import Breadcrumbs from '../sharedComponents/Breadcrumbs';
import LoadMoreButton from './LoadMoreButton';
import FavouritesDrawer from './FavouritesDrawer';
import LaunchItem from './LaunchItem';

const PAGE_SIZE = 12;

export default function Launches() {
  const {
    data, error, isValidating, setSize, size,
  } = useSpaceXPaginated(
    '/launches/past',
    {
      limit: PAGE_SIZE,
      order: 'desc',
      sort: 'launch_date_utc',
    },
  );
  return (
    <div>
      <Flex lineHeight="tight" justifyContent="space-between" align="center">
        <Breadcrumbs
          items={[{ label: 'Home', to: '/' }, { label: 'Launches' }]}
        />
        <FavouritesDrawer />
      </Flex>
      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data
          && data
            .flat()
            .map((launch) => (
              <LaunchItem
                launch={launch}
                key={launch.flight_number}
                isSmall={false}
              />
            ))}
      </SimpleGrid>
      <LoadMoreButton
        loadMore={() => setSize(size + 1)}
        data={data}
        pageSize={PAGE_SIZE}
        isLoadingMore={isValidating}
      />
    </div>
  );
}
