import * as React from 'react';

interface Props {
  pictures: Picture[];
}

export const ImagesGrid: React.FC<Props> = ({pictures}) => {
  return <>{JSON.stringify(pictures, null, 2)}</>;
};
