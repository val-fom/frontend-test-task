import React from 'react';
import {Images} from 'components/Images';
import {useParams} from 'react-router-dom';

interface Props {
  setPageData: (data: PageData) => void;
}

export const ImagesRoute: React.FC<Props> = ({setPageData}) => {
  const {page} = useParams<{page: string}>();
  return <Images page={page} setPageData={setPageData} />;
};
