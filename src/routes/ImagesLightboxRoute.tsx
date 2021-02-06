import React from 'react';
import {ImagesLightbox} from 'components/ImagesLightbox';
import {useParams} from 'react-router-dom';

interface Props {
  setPageData: (data: PageData) => void;
}

export const ImagesLightboxRoute: React.FC<Props> = ({setPageData}) => {
  const {page} = useParams<{page: string}>();
  return <ImagesLightbox page={page} setPageData={setPageData} />;
};
