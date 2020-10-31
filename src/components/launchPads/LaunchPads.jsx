import React from 'react';
import {
  SimpleGrid,
} from '@chakra-ui/core';

import Error from '../sharedComponents/Error';
import Breadcrumbs from '../sharedComponents/Breadcrumbs';
import LaunchPadItem from './LaunchPadItem';
import LoadMoreButton from '../launches/LoadMoreButton';
import { useSpaceXPaginated } from '../../utils/use-space-x';

const PAGE_SIZE = 12;

export default function LaunchPads() {
  const {
    data, error, isValidating, size, setSize,
  } = useSpaceXPaginated(
    '/launchpads',
    {
      limit: PAGE_SIZE,
    },
  );

  return (
    <div>
      <Breadcrumbs
        items={[{ label: 'Home', to: '/' }, { label: 'Launch Pads' }]}
      />
      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data
          && data
            .flat()
            .map((launchPad) => (
              <LaunchPadItem key={launchPad.site_id} launchPad={launchPad} />
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
