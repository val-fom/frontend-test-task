interface Picture {
  id: string;
  cropped_picture: string;
}

interface FullPicture extends Picture {
  author: string;
  camera: string;
  full_picture: string;
  tags: string;
}

interface PageData {
  hasMore: boolean;
  page: number;
  pageCount: number;
}
