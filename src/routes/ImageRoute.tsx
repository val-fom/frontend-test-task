import React from 'react';
import {Image} from 'components/Image';
import {useParams} from 'react-router-dom';

export const ImageRoute: React.FC<{}> = () => {
  const {id} = useParams<{id: string}>();
  return <Image id={id} />;
};
