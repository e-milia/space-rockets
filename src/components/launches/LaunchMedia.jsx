import React from 'react';
import PropTypes from 'prop-types';
import {
  SimpleGrid,
  Box,
  Image,
  AspectRatioBox,
} from '@chakra-ui/core';

export function Video({ launch }) {
  return (
    <AspectRatioBox maxH="400px" ratio={1.7}>
      <Box
        as="iframe"
        title={launch.mission_name}
        src={`https://www.youtube.com/embed/${launch.links.youtube_id}`}
        allowFullScreen
      />
    </AspectRatioBox>
  );
}

export function Gallery({ images }) {
  return (
    <SimpleGrid my="6" minChildWidth="350px" spacing="4">
      {images.map((image) => (
        <a href={image} key={image}>
          <Image src={image.replace('_o.jpg', '_z.jpg')} />
        </a>
      ))}
    </SimpleGrid>
  );
}

Video.propTypes = {
  launch: PropTypes.objectOf(PropTypes.any).isRequired,
};

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};
