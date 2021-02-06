import React, {useCallback, useEffect, useState} from 'react';
import {getImages} from 'api/images';
import {Pagination} from './Pagination';
import {ImagesGrid} from './ImagesGrid';
import {useHistory} from 'react-router-dom';

interface Props {
  page: string;
}

export const Images: React.FC<Props> = ({page}) => {
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState<PageData | null>(null);
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
  }, [page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  let history = useHistory();

  const handlePageChange = useCallback(
    ({selected}) => {
      history.push(`/images/${selected}`);
    },
    [history],
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Images">
      {pictures && <ImagesGrid pictures={pictures} />}
      {pageData && (
        <Pagination pageData={pageData} onPageChange={handlePageChange} />
      )}
    </div>
  );
};
