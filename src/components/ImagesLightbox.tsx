import React, {useCallback, useEffect, useState} from 'react';
import {getImage, getImages} from 'api/images';
import {Pagination} from './Pagination';
import {ImagesGrid} from './ImagesGrid';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import {useHistory} from 'react-router-dom';

interface Props {
  page: string;
}

export const ImagesLightbox: React.FC<Props> = ({page}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
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
      history.push(`/lightbox/${selected}`);
    },
    [history],
  );

  const [fullPictures, setFullPictures] = useState<Record<string, FullPicture>>(
    {},
  );

  const getFullImage = useCallback(
    async (id: string) => {
      const {data, error} = await getImage(id);

      if (error) {
        console.error(error);
      }
      if (data) {
        setFullPictures({...fullPictures, [data.id]: data});
      }
    },
    [fullPictures],
  );

  const handleImageClick = useCallback(
    async (picture: Picture) => {
      const clickedIndex = pictures.findIndex(({id}) => id === picture.id);

      if (clickedIndex !== -1) {
        setPhotoIndex(clickedIndex);
      }

      if (!fullPictures[picture.id]) {
        await getFullImage(picture.id);
      }

      setIsOpen(true);
    },
    [fullPictures, getFullImage, pictures],
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Images">
      {pictures && (
        <ImagesGrid pictures={pictures} onImageClick={handleImageClick} />
      )}
      {pageData && (
        <Pagination pageData={pageData} onPageChange={handlePageChange} />
      )}
      {isOpen && (
        <Lightbox
          mainSrc={fullPictures[pictures[photoIndex].id].full_picture}
          nextSrc={pictures[(photoIndex + 1) % pictures.length].cropped_picture}
          prevSrc={
            pictures[(photoIndex + pictures.length - 1) % pictures.length]
              .cropped_picture
          }
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + pictures.length - 1) % pictures.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % pictures.length)
          }
        />
      )}
    </div>
  );
};
