import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Image,
  SimpleGrid,
  Text,
  Flex,
} from "@chakra-ui/core";
import { BsDiamond, BsDiamondFill } from "react-icons/bs";
import { format as timeAgo } from "timeago.js";
import { Link } from "react-router-dom";

import { useSpaceXPaginated } from "../utils/use-space-x";
import { formatDate } from "../utils/format-date";
import { findMissionByKey } from "../utils/find-mission-by-key";
import { getFromLocalStorage } from "../utils/get-from-local-storage";
import Error from "./error";
import Breadcrumbs from "./breadcrumbs";
import LoadMoreButton from "./load-more-button";
import FavouritesDrawer from './favourites-drawer'

const PAGE_SIZE = 12;

export default function Launches() {
  const { data, error, isValidating, setSize, size } = useSpaceXPaginated(
    "/launches/past",
    {
      limit: PAGE_SIZE,
      order: "desc",
      sort: "launch_date_utc",
    }
  );

  // console.log(data, error);
  return (
    <div>
      <Flex lineHeight="tight" justifyContent="space-between" align="center">
        <Breadcrumbs
          items={[{ label: "Home", to: "/" }, { label: "Launches" }]}
        />
        <FavouritesDrawer />
      </Flex>
      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data &&
          data
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

// export function FavouriteIcon({favourites, key}) {
//   return findMissionByKey(favourites, launch.flight_number) > -1? (
//     <Box
//       as={BsDiamondFill}
//       size="24px"
//       color="yellow.400"
//       onClick={(e) => processFavourite(e)}
//     />
//   ) : (
//     <Box
//       as={BsDiamond}
//       size="24px"
//       color="yellow.400"
//       onClick={(e) => processFavourite(e)}
//     />
//   );
// };


export function LaunchItem({ launch, isSmall }) {
  console.log('re-rendering launch item')
  const favouritesData = getFromLocalStorage("favourites") || [];
  const [favourites, setFavourites] = useState(favouritesData);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const processFavourite = (e) => {
    console.log('process fave')
    e.preventDefault();
    // let tempFavourites = [...favourites];
    let tempFavourites = getFromLocalStorage("favourites") || []
    let positionInFavourites = findMissionByKey(tempFavourites, launch.flight_number);
    if (positionInFavourites === -1) {
      tempFavourites.push(launch)
    } else {
      tempFavourites.splice(positionInFavourites, 1)
    }
    setFavourites(tempFavourites);
  };

  const displayFavouriteIcon = () => {
    if (isSmall) return <noscript />
    return findMissionByKey(favourites, launch.flight_number) > -1? (
      <Box
        as={BsDiamondFill}
        size="24px"
        color="yellow.400"
        onClick={(e) => processFavourite(e)}
      />
    ) : (
      <Box
        as={BsDiamond}
        size="24px"
        color="yellow.400"
        onClick={(e) => processFavourite(e)}
      />
    );
  };

  const displayImage = () => {
    return isSmall ? (
      <Image
        src={
          launch.links.flickr_images[0]?.replace("_o.jpg", "_z.jpg") ??
          launch.links.mission_patch_small
        }
        alt={`${launch.mission_name} launch`}
        height={["80px", null, "120px"]}
        width="100%"
        objectFit="cover"
        objectPosition="centre"
      />
    ) : (
      <Box>
        <Image
          src={
            launch.links.flickr_images[0]?.replace("_o.jpg", "_z.jpg") ??
            launch.links.mission_patch_small
          }
          alt={`${launch.mission_name} launch`}
          height={["200px", null, "300px"]}
          width="100%"
          objectFit="cover"
          objectPosition="bottom"
        />

        <Image
          position="absolute"
          top="5"
          right="5"
          src={launch.links.mission_patch_small}
          height="75px"
          objectFit="contain"
          objectPosition="bottom"
        />
      </Box>
    );
  };

  return (
    <Box
      as={Link}
      to={`/launches/${launch.flight_number.toString()}`}
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      position="relative"
    >
      {displayImage()}

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          {launch.launch_success ? (
            <Badge px="2" variant="solid" variantColor="green">
              Successful
            </Badge>
          ) : (
            <Badge px="2" variant="solid" variantColor="red">
              Failed
            </Badge>
          )}
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {launch.rocket.rocket_name} &bull; {launch.launch_site.site_name}
          </Box>
        </Box>

        <Flex
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
          justifyContent="space-between"
        >
          {launch.mission_name}
          {displayFavouriteIcon()}
        </Flex>
        <Flex>
          <Text fontSize="sm">{formatDate(launch.launch_date_utc)} </Text>
          <Text color="gray.500" ml="2" fontSize="sm">
            {timeAgo(launch.launch_date_utc)}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}
