import './ImagesGrid.css';

import * as React from 'react';

import {Thumbnail} from './Thumbnail';

interface Props {
  pictures: Picture[];
  onImageClick?: (picture: Picture) => void;
}

export const ImagesGrid: React.FC<Props> = ({pictures, onImageClick}) => {
  return (
    <div className="ImagesGrid">
      {pictures.map((picture) => (
        <Thumbnail picture={picture} key={picture.id} onClick={onImageClick} />
      ))}
    </div>
  );
};
