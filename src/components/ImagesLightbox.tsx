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

  const getFullImages = useCallback(
    async (...missingIds: string[]) => {
      const responses = await Promise.all(missingIds.map((id) => getImage(id)));

      const newFullPictures = responses.reduce<Record<string, FullPicture>>(
        (acc, {data}) => {
          if (data) {
            return {
              ...acc,
              [data.id]: data as FullPicture,
            };
          }
          return acc;
        },
        {},
      );

      setFullPictures({...fullPictures, ...newFullPictures});
    },
    [fullPictures],
  );

  const handleImageClick = useCallback(
    async (picture: Picture) => {
      const clickedIndex = pictures.findIndex(({id}) => id === picture.id);

      setPhotoIndex(clickedIndex);

      if (!fullPictures[picture.id]) {
        await getFullImages(picture.id);
      }

      setIsOpen(true);
    },
    [fullPictures, getFullImages, pictures],
  );

  const getPrevNextFullPictures = useCallback(
    async (index: number) => {
      if (pictures.length) {
        const nextIndex = (index + 1) % pictures.length;
        const nextPicture = pictures[nextIndex];

        const prevIndex = (index + pictures.length - 1) % pictures.length;
        const prevPicture = pictures[prevIndex];

        const missingIds = [nextPicture.id, prevPicture.id].filter(
          (id) => !fullPictures[id],
        );

        if (missingIds.length) {
          await getFullImages(...missingIds);
        }
      }
    },
    [fullPictures, getFullImages, pictures],
  );

  useEffect(() => {
    if (isOpen) {
      getPrevNextFullPictures(photoIndex);
    }
  }, [getPrevNextFullPictures, isOpen, photoIndex]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const prevIndex = (photoIndex + pictures.length - 1) % pictures.length;
  const nextIndex = (photoIndex + 1) % pictures.length;

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
          mainSrc={fullPictures[pictures[photoIndex].id]?.full_picture}
          nextSrc={fullPictures[pictures[nextIndex].id]?.full_picture}
          prevSrc={fullPictures[pictures[prevIndex].id]?.full_picture}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={async () =>
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
