import React from 'react';
import {Images} from 'components/Images';
import {useParams} from 'react-router-dom';

export const ImagesRoute: React.FC<{}> = () => {
  const {page} = useParams<{page: string}>();
  return <Images page={page} />;
};
