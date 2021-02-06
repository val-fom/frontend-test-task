import {getImages} from 'api/images';
import React, {useCallback, useEffect, useState} from 'react';

import {ImagesGrid} from './ImagesGrid';

interface Props {
  page: string;
  setPageData: (data: PageData) => void;
}

export const Images: React.FC<Props> = ({page, setPageData}) => {
  const [loading, setLoading] = useState(false);
  const [pictures, setPictures] = useState<Picture[]>([]);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    const {data, error} = await getImages(page);
    setLoading(false);

    if (error) {
      console.error(error);
    }
    if (data) {
      const {pictures, ...page} = data;
      setPictures(data.pictures);
      setPageData(page);
    }
  }, [page, setPageData]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Images">
      {pictures && <ImagesGrid pictures={pictures} />}
    </div>
  );
};
