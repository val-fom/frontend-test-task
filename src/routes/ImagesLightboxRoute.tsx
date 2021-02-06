import React from 'react';
import {ImagesLightbox} from 'components/ImagesLightbox';
import {useParams} from 'react-router-dom';

export const ImagesLightboxRoute: React.FC<{}> = () => {
  const {page} = useParams<{page: string}>();
  return <ImagesLightbox page={page} />;
};
