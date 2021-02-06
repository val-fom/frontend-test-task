import 'react-image-lightbox/style.css';

import {getImage, getImages} from 'api/images';
import React, {useCallback, useEffect, useState} from 'react';
import Lightbox from 'react-image-lightbox';

import {ImagesGrid} from './ImagesGrid';
import {Link} from 'react-router-dom';

interface Props {
  page: string;
  setPageData: (data: PageData) => void;
}

export const ImagesLightbox: React.FC<Props> = ({page, setPageData}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const [loading, setLoading] = useState(false);
  const [pictures, setPictures] = useState<Picture[]>([]);

  const prevIndex = (photoIndex + pictures.length - 1) % pictures.length;
  const nextIndex = (photoIndex + 1) % pictures.length;

  const [fullPictures, setFullPictures] = useState<Record<string, FullPicture>>(
    {},
  );

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

  const getPrevNextFullPictures = useCallback(() => {
    if (pictures.length) {
      const nextPicture = pictures[nextIndex];
      const prevPicture = pictures[prevIndex];

      const missingIds = [nextPicture.id, prevPicture.id].filter(
        (id) => !fullPictures[id],
      );

      if (missingIds.length) {
        getFullImages(...missingIds);
      }
    }
  }, [fullPictures, getFullImages, nextIndex, pictures, prevIndex]);

  useEffect(() => {
    if (isOpen) {
      // prefetch next and prev image data
      getPrevNextFullPictures();
    }
  }, [getPrevNextFullPictures, isOpen, photoIndex]);

  const handleOnCloseRequest = useCallback(() => setIsOpen(false), []);

  const onMovePrevRequest = useCallback(() => setPhotoIndex(prevIndex), [
    prevIndex,
  ]);

  const onMoveNextRequest = useCallback(() => setPhotoIndex(nextIndex), [
    nextIndex,
  ]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const getFullPicture = (index: number) => fullPictures[pictures[index]?.id];

  const imageCaptions = (
    <ul>
      {Object.entries(getFullPicture(photoIndex) || {})
        .filter(([key]) => ['author', 'camera', 'tags'].includes(key))
        .map((pair) => (
          <li>{pair.join(': ')}</li>
        ))}
    </ul>
  );

  return (
    <div className="Images">
      {pictures && (
        <ImagesGrid pictures={pictures} onImageClick={handleImageClick} />
      )}

      {isOpen && (
        <Lightbox
          mainSrc={getFullPicture(photoIndex)?.full_picture}
          nextSrc={getFullPicture(nextIndex)?.full_picture}
          prevSrc={getFullPicture(prevIndex)?.full_picture}
          onCloseRequest={handleOnCloseRequest}
          onMovePrevRequest={onMovePrevRequest}
          onMoveNextRequest={onMoveNextRequest}
          imageCaption={imageCaptions}
        />
      )}

      <Link className="Link" to="/images/1">
        Router based gallery
      </Link>
    </div>
  );
};
