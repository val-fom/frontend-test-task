import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {ImagesLightboxRoute} from 'routes/ImagesLightboxRoute';
import {ImagesRoute} from 'routes/ImagesRoute';
import {ImageRoute} from 'routes/ImageRoute';

export const CoreLayout: React.FC<{}> = () => (
  <Switch>
    <Route exact path="/lightbox/:page" component={ImagesLightboxRoute} />
    <Route exact path="/images/:page" component={ImagesRoute} />
    <Route exact path="/image/:id" component={ImageRoute} />
    <Route
      exact
      path="/"
      render={(props) => <Redirect {...props} to={'/lightbox/1'} />}
    />
  </Switch>
);
