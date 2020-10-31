import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  ThemeProvider, Text, Spinner,
} from '@chakra-ui/core';
import { mount } from 'enzyme';
import Launch from '../../src/components/launches/Launch';
import mockValidLaunchData from '../data/mock-launch-data';
import Breadcrumbs from '../../src/components/sharedComponents/Breadcrumbs';
import FavouritesIcon from '../../src/components/launches/FavouritesIcon';
import Header from '../../src/components/launches/LaunchHeader';
import TimeAndLocation from '../../src/components/launches/TimeAndLocation';
import RocketInfo from '../../src/components/launches/RocketInfo';
import { Gallery, Video } from '../../src/components/launches/LaunchMedia';
import Error from '../../src/components/sharedComponents/Error';

let mockLaunchType = 'valid';

const mockReturnData = (type) => {
  const mockDataByType = {
    valid: mockValidLaunchData,
    empty: { data: null },
    error: { error: new Error('launch error') },
  };
  return mockDataByType[type];
};

jest.mock('../../src/utils/use-space-x', () => ({
  useSpaceX: jest.fn(() => mockReturnData(mockLaunchType)),
}));

describe('Valid launch', () => {
  mockLaunchType = 'valid';

  const expectedProps = {
    launch: mockValidLaunchData.data,
  };

  const launch = mount(
    <ThemeProvider>
      <Router>
        <Launch />
      </Router>
    </ThemeProvider>,
  );
  test('renders Breadcrumbs correctly with appropriate props', () => {
    const breadcrumbs = launch.find(Breadcrumbs);

    expect(breadcrumbs).toHaveLength(1);
    expect(breadcrumbs.props().items).toHaveLength(3);
    expect(breadcrumbs.props().items[2].label).toEqual('#100');
  });

  test('renders Favourites Icon correctly with appropriate props', () => {
    const favouritesIcon = launch.find(FavouritesIcon);

    expect(favouritesIcon).toHaveLength(1);
    expect(favouritesIcon.props().isSmall).toBe(false);
  });

  test('renders Header correctly with appropriate props', () => {
    const header = launch.find(Header);
    expect(header).toHaveLength(1);
    expect(header.props()).toEqual(expectedProps);
  });

  test('renders launch information components correctly with appropriate props', () => {
    const timeAndLocation = launch.find(TimeAndLocation);
    expect(timeAndLocation).toHaveLength(1);
    expect(timeAndLocation.props()).toEqual(expectedProps);

    const rocketInfo = launch.find(RocketInfo);
    expect(rocketInfo).toHaveLength(1);
    expect(rocketInfo.props()).toEqual(expectedProps);

    const launchText = launch.find(Text);
    const expectedText = expectedProps.launch.details;
    expect(launchText.last().props().color).toEqual('gray.700');
    expect(launchText.last().props().children).toEqual(expectedText);
  });

  test('renders launch media components correctly with appropriate props', () => {
    const video = launch.find(Video);
    expect(video).toHaveLength(1);
    expect(video.props()).toEqual(expectedProps);

    const gallery = launch.find(Gallery);
    expect(gallery).toHaveLength(1);
    expect(gallery.props().images).toEqual(expectedProps.launch.links.flickr_images);
  });
});

describe('Invalid Launch: launch data is null', () => {
  mockLaunchType = 'empty';

  const invalidLaunch = mount(
    <ThemeProvider>
      <Router>
        <Launch />
      </Router>
    </ThemeProvider>,
  );
  test('does not render launch components', () => {
    const breadcrumbs = invalidLaunch.find(Breadcrumbs);
    expect(breadcrumbs).toHaveLength(0);

    const header = invalidLaunch.find(Header);
    expect(header).toHaveLength(0);

    const timeAndLocation = invalidLaunch.find(TimeAndLocation);
    expect(timeAndLocation).toHaveLength(0);
  });

  test('renders a spinner', () => {
    const spinner = invalidLaunch.find(Spinner);
    expect(spinner).toHaveLength(1);
    expect(spinner.last().props().size).toEqual('lg');
  });
});

describe('Invalid Launch: error getting data', () => {
  mockLaunchType = 'error';

  const errorLaunch = mount(
    <ThemeProvider>
      <Router>
        <Launch />
      </Router>
    </ThemeProvider>,
  );
  test('does not render launch components', () => {
    const breadcrumbs = errorLaunch.find(Breadcrumbs);
    expect(breadcrumbs).toHaveLength(0);

    const header = errorLaunch.find(Header);
    expect(header).toHaveLength(0);

    const timeAndLocation = errorLaunch.find(TimeAndLocation);
    expect(timeAndLocation).toHaveLength(0);
  });

  test('renders an error componenmt', () => {
    const error = errorLaunch.find(Error);
    expect(error).toHaveLength(1);
  });
});
