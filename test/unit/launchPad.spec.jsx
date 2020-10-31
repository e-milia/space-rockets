import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  ThemeProvider, Text, Spinner,
} from '@chakra-ui/core';
import { mount } from 'enzyme';
import LaunchPad from '../../src/components/launchPads/LaunchPad';
import mockValidLaunchPadData from '../data/mock-launchpad-data';
import LocationAndVehicles from '../../src/components/launchPads/LocationAndVehicles';
import Breadcrumbs from '../../src/components/sharedComponents/Breadcrumbs';
import Header from '../../src/components/launchPads/LaunchPadHeader';
import Error from '../../src/components/sharedComponents/Error';
import mockValidLaunchesData from '../data/mock-launches-data';
import Map from '../../src/components/launchPads/Map';
import RecentLaunches from '../../src/components/launchPads/RecentLaunches';
import mockLaunchesData from '../data/mock-launches-data';

let mockLaunchType = 'valid';

const mockReturnData = (type, requestUrl) => {
  const mockLaunchPadsData = {
    valid: mockValidLaunchPadData,
    empty: { data: null },
    error: { error: new Error('launchPad error') },
  };

  const mockLaunchesData = {
    valid: mockValidLaunchesData,
    empty: { data: null },
    error: { data: null },
  };

  const isLaunchPad = requestUrl && requestUrl.includes('/launchpads/');

  return isLaunchPad ? mockLaunchPadsData[type] : mockLaunchesData[type];
};

jest.mock('../../src/utils/use-space-x', () => ({
  useSpaceX: jest.fn((requestUrl) => mockReturnData(mockLaunchType, requestUrl)),
}));

describe('Valid launchpad', () => {
  mockLaunchType = 'valid';

  const expectedProps = {
    launchPad: mockValidLaunchPadData.data,
  };

  const expectedLaunchesProps = {
    launches: mockLaunchesData.data,
  };

  const launchPad = mount(
    <ThemeProvider>
      <Router>
        <LaunchPad />
      </Router>
    </ThemeProvider>,
  );
  test('renders Breadcrumbs correctly with appropriate props', () => {
    const breadcrumbs = launchPad.find(Breadcrumbs);

    expect(breadcrumbs).toHaveLength(1);
    expect(breadcrumbs.props().items).toHaveLength(3);
    expect(breadcrumbs.props().items[2].label).toEqual('KSC LC 39A');
  });

  test('renders Header correctly with appropriate props', () => {
    const header = launchPad.find(Header);
    expect(header).toHaveLength(1);
    expect(header.props()).toEqual(expectedProps);
  });

  test('renders launchPad information components correctly with appropriate props', () => {
    const locationAndVehicles = launchPad.find(LocationAndVehicles);
    expect(locationAndVehicles).toHaveLength(1);
    expect(locationAndVehicles.props()).toEqual(expectedProps);

    const launchPadText = launchPad.find(Text);
    const expectedText = expectedProps.launchPad.details;
    expect(launchPadText.at(5).props().color).toEqual('gray.700');
    expect(launchPadText.at(5).props().children).toEqual(expectedText);

    const map = launchPad.find(Map);
    expect(map).toHaveLength(1);
    expect(map.props().location).toEqual(expectedProps.launchPad.location);

    const recentLaunches = launchPad.find(RecentLaunches);
    expect(recentLaunches).toHaveLength(1);
    expect(recentLaunches.props().launches).toEqual(expectedLaunchesProps.launches);
  });
});

describe('Invalid LaunchPad: launchPad data is null', () => {
  mockLaunchType = 'empty';

  const invalidLaunch = mount(
    <ThemeProvider>
      <Router>
        <LaunchPad />
      </Router>
    </ThemeProvider>,
  );
  test('does not render launch components', () => {
    const breadcrumbs = invalidLaunch.find(Breadcrumbs);
    expect(breadcrumbs).toHaveLength(0);

    const header = invalidLaunch.find(Header);
    expect(header).toHaveLength(0);

    const locationAndVehicles = invalidLaunch.find(LocationAndVehicles);
    expect(locationAndVehicles).toHaveLength(0);
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
        <LaunchPad />
      </Router>
    </ThemeProvider>,
  );
  test('does not render launch components', () => {
    const breadcrumbs = errorLaunch.find(Breadcrumbs);
    expect(breadcrumbs).toHaveLength(0);

    const header = errorLaunch.find(Header);
    expect(header).toHaveLength(0);

    const locationAndVehicles = errorLaunch.find(LocationAndVehicles);
    expect(locationAndVehicles).toHaveLength(0);
  });

  test('renders an error componenmt', () => {
    const error = errorLaunch.find(Error);
    expect(error).toHaveLength(1);
  });
});
