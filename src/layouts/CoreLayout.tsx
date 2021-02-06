import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {ImagesRoute} from 'routes/ImagesRoute';
import {ImageRoute} from 'routes/ImageRoute';

export const CoreLayout: React.FC<{}> = () => (
  <Switch>
    <Route exact path="/images/:page" component={ImagesRoute} />
    <Route exact path="/image/:id" component={ImageRoute} />
    <Route render={(props) => <Redirect {...props} to={'/images/1'} />} />
  </Switch>
);
