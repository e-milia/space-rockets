import React from "react";
import { useParams } from "react-router-dom";
import {
  Flex,
  Box,
  Text,
  Spinner,
} from "@chakra-ui/core";

import { useSpaceX } from "../../utils/use-space-x";
import Error from "../sharedComponents/Error";
import Breadcrumbs from "../sharedComponents/Breadcrumbs";
import Header from './LaunchPadHeader'
import RecentLaunches from './RecentLaunches'
import Map from './Map'
import LocationAndVehicles from './LocationAndVehicles'

export default function LaunchPad() {
  let { launchPadId } = useParams();
  const { data: launchPad, error } = useSpaceX(`/launchpads/${launchPadId}`);

  const { data: launches } = useSpaceX(launchPad ? "/launches/past" : null, {
    limit: 3,
    order: "desc",
    sort: "launch_date_utc",
    site_id: launchPad?.site_id,
  });

  if (error) return <Error />;
  if (!launchPad) {
    return (
      <Flex justifyContent="center" alignItems="center" minHeight="50vh">
        <Spinner size="lg" />
      </Flex>
    );
  }

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Launch Pads", to: ".." },
          { label: launchPad.name },
        ]}
      />
      <Header launchPad={launchPad} />
      <Box m={[3, 6]}>
        <LocationAndVehicles launchPad={launchPad} />
        <Text color="gray.700" fontSize={["md", null, "lg"]} my="8">
          {launchPad.details}
        </Text>
        <Map location={launchPad.location} />
        <RecentLaunches launches={launches} />
      </Box>
    </div>
  );
}
