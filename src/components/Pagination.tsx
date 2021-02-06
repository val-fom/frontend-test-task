import * as React from 'react';

interface Props {
  pageData: PageData;
}

export const Pagination: React.FC<Props> = ({pageData}) => {
  return <>{JSON.stringify(pageData, null, 2)}</>;
};
