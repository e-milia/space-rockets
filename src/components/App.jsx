import React from 'react';
import { Routes, Route } from 'react-router-dom';

import NavBar from './sharedComponents/NavBar';
import Launches from './launches/Launches';
import Launch from './launches/Launch';
import Home from './sharedComponents/Home';
import LaunchPads from './launchPads/LaunchPads';
import LaunchPad from './launchPads/LaunchPad';

export default function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/launches" element={<Launches />} />
        <Route path="/launches/:launchId" element={<Launch />} />
        <Route path="/launch-pads" element={<LaunchPads />} />
        <Route path="/launch-pads/:launchPadId" element={<LaunchPad />} />
      </Routes>
    </div>
  );
}
