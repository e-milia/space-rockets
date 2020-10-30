import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
} from '@chakra-ui/core';
import { BsDiamond, BsDiamondFill } from 'react-icons/bs';
import findMissionByKey from '../../utils/find-mission-by-key';
import getFromLocalStorage from '../../utils/get-from-local-storage';

export default function FavouriteIcon({ launch, shouldNotShow }) {
  const favouritesData = getFromLocalStorage('favourites') || [];
  const [favourites, setFavourites] = useState(favouritesData);

  const key = launch.flight_number;
  const inFavourites = findMissionByKey(favourites, key) > -1;
  const icon = inFavourites ? BsDiamondFill : BsDiamond;

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const processFavourite = (e) => {
    e.preventDefault();
    const tempFavourites = getFromLocalStorage('favourites') || [];
    const positionInFavourites = findMissionByKey(tempFavourites, launch.flight_number);
    if (positionInFavourites === -1) {
      tempFavourites.push(launch);
    } else {
      tempFavourites.splice(positionInFavourites, 1);
    }
    setFavourites(tempFavourites);
  };

  if (shouldNotShow) return <noscript />;
  return (
    <Box
      as={icon}
      size="24px"
      color="yellow.400"
      onClick={(e) => processFavourite(e)}
    />
  );
}

FavouriteIcon.propTypes = {
  launch: PropTypes.objectOf(PropTypes.any).isRequired,
  shouldNotShow: PropTypes.bool,
};

FavouriteIcon.defaultProps = {
  shouldNotShow: false,
};
