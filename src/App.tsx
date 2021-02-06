import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {CoreLayout} from 'layouts/CoreLayout';

const App: React.FC = () => (
  <Router>
    <CoreLayout />
  </Router>
);

export default App;
