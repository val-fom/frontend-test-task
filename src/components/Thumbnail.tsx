import * as React from 'react';
import {Link} from 'react-router-dom';

interface Props {
  picture: Picture;
}

export const Thumbnail: React.FC<Props> = ({picture}) => {
  return (
    <Link to={`/image/${picture.id}`}>
      <img src={picture.cropped_picture} alt="thumbnail"></img>
    </Link>
  );
};
