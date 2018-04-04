import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomePage, PlayPage } from 'pages';
import Header from 'components/Header';

const App = () => {
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/play" component={PlayPage}/>
      </Switch>
    </div>
  )
}

export default App;
