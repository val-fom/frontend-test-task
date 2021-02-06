import './ImagesGrid.css';

import * as React from 'react';

import {Thumbnail} from './Thumbnail';

interface Props {
  pictures: Picture[];
}

export const ImagesGrid: React.FC<Props> = ({pictures}) => {
  return (
    <div className="ImagesGrid">
      {pictures.map((picture) => (
        <Thumbnail picture={picture} key={picture.id} />
      ))}
    </div>
  );
};
