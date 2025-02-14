import React from "react";
import PropTypes from 'prop-types';

import {
  Stack, 
  Text, 
  SimpleGrid,
} from '@chakra-ui/core';

import LaunchItem  from "../launches/LaunchItem"

export default function RecentLaunches({ launches }) {
  if (!launches?.length) {
    return null;
  }
  return (
    <Stack my="8" spacing="3">
      <Text fontSize="xl" fontWeight="bold">
        Last launches
      </Text>
      <SimpleGrid minChildWidth="350px" spacing="4">
        {launches.map((launch) => (
          <LaunchItem launch={launch} key={launch.flight_number} />
        ))}
      </SimpleGrid>
    </Stack>
  );
}

RecentLaunches.propTypes = {
  launches: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};
