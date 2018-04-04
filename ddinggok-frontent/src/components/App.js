import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomePage, PlayPage } from 'pages';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage}/>
      <Route exact path="/play" component={PlayPage}/>
    </Switch>
  )
}

export default App;
