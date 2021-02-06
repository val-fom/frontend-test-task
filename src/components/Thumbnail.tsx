import * as React from 'react';
import {useCallback} from 'react';
import {Link} from 'react-router-dom';

interface Props {
  picture: Picture;
  onClick?: (picture: Picture) => void;
}

export const Thumbnail: React.FC<Props> = ({picture, onClick}) => {
  const handleClick = useCallback(
    (ev: React.MouseEvent) => {
      ev.preventDefault();
      if (onClick) {
        onClick(picture);
      }
    },
    [onClick, picture],
  );

  return (
    <Link to={`/image/${picture.id}`} onClick={onClick && handleClick}>
      <img src={picture.cropped_picture} alt="thumbnail"></img>
    </Link>
  );
};
