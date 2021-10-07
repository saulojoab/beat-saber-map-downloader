import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import { Main } from './screens';
import './App.global.css';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Main} />
      </Switch>
    </Router>
  );
}
