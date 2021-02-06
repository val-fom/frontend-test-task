import {makeFetcher} from './client';

export interface GetImagesResponse {
  hasMore: boolean;
  page: number;
  pageCount: number;
  pictures: Picture[];
}

type GetImagesRequest = number;

export const getImages = makeFetcher<GetImagesResponse, GetImagesRequest>(
  (page) => `/images?page=${page}`,
);

export interface GetImageResponse {}

type GetImageRequest = string;

export const getImage = makeFetcher<GetImageResponse, GetImageRequest>(
  (page) => `/images/${page}`,
);
