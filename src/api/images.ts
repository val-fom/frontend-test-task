import {makeFetcher} from './client';

export interface GetImagesResponse extends PageData {
  pictures: Picture[];
}

type GetImagesRequest = string;

export const getImages = makeFetcher<GetImagesResponse, GetImagesRequest>(
  (page) => `/images?page=${page}`,
);

export interface GetImageResponse extends FullPicture {}

type GetImageRequest = string;

export const getImage = makeFetcher<GetImageResponse, GetImageRequest>(
  (page) => `/images/${page}`,
);
