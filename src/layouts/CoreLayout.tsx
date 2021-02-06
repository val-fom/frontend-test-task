import React, {useCallback, useState} from 'react';
import {Switch, Route, Redirect, useHistory} from 'react-router-dom';
import {ImagesLightboxRoute} from 'routes/ImagesLightboxRoute';
import {ImagesRoute} from 'routes/ImagesRoute';
import {ImageRoute} from 'routes/ImageRoute';
import {Pagination} from 'components/Pagination';

export const CoreLayout: React.FC<{}> = () => {
  const [pageData, setPageData] = useState<PageData | null>(null);
  let history = useHistory();
  const handlePageChange = useCallback(
    ({selected}) => {
      const {pathname} = history.location;
      history.push(pathname.replace(/[^/]+$/, selected + 1));
    },
    [history],
  );
  return (
    <div className="CoreLayout">
      <Switch>
        <Route
          exact
          path="/lightbox/:page"
          render={(props) => (
            <ImagesLightboxRoute {...props} setPageData={setPageData} />
          )}
        />
        <Route
          exact
          path="/images/:page"
          render={(props) => (
            <ImagesRoute {...props} setPageData={setPageData} />
          )}
        />
        <Route exact path="/image/:id" component={ImageRoute} />
        <Route
          exact
          path="/"
          render={(props) => <Redirect {...props} to={'/lightbox/1'} />}
        />
      </Switch>
      {pageData && (
        <Pagination pageData={pageData} onPageChange={handlePageChange} />
      )}
    </div>
  );
};
