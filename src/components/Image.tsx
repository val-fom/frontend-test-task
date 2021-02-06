import {getImage} from 'api/images';
import React, {useCallback, useEffect, useState} from 'react';

interface Props {
  id: string;
}

export const Image: React.FC<Props> = ({id}) => {
  const [loading, setLoading] = useState(false);
  const [picture, setPicture] = useState<FullPicture | null>(null);

  useEffect(() => {
    console.log('loading: ', loading);
  }, [loading]);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    const {data, error} = await getImage(id);
    setLoading(false);

    if (error) {
      console.error(error);
    }
    if (data) {
      setPicture(data);
    }
  }, [id]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return (
    <div className="Image">
      <img src={picture?.full_picture} alt="full"></img>
      <div>{JSON.stringify(picture, null, 2)}</div>
    </div>
  );
};
