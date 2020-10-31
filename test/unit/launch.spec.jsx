import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  ThemeProvider,
} from '@chakra-ui/core';
import { mount, shallow } from 'enzyme';
import Launch from '../../src/components/launches/Launch';
import mockLaunchData from '../data/valid-launch';
import Breadcrumbs from '../../src/components/sharedComponents/Breadcrumbs';

jest.mock('../../src/utils/use-space-x', () => ({
  useSpaceX: jest.fn(() => mockLaunchData),
  useSpaceXPaginagted: jest.fn(),
}));

describe('Valid launch', () => {
  test('renders Breadcrumbs correctly with appropriate props', () => {
    const breadcrumbs = launch.find(Breadcrumbs);

    expect(breadcrumbs).toHaveLength(1);
    expect(breadcrumbs.props().items).toHaveLength(3);
    expect(breadcrumbs.props().items[2].label).toEqual('#100');
  });
});
