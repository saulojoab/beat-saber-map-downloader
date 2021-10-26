import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import { Main, Search } from './screens';
import './App.global.css';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/search" component={Search} />
      </Switch>
    </Router>
  );
}
