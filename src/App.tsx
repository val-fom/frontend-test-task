import React, {useCallback, useEffect, useState} from 'react';
import {getImages} from './api/images';
import './App.css';

interface Page {
  hasMore: boolean;
  page: number;
  pageCount: number;
}

function App() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<Page | null>(null);
  const [pictures, setPictures] = useState<Picture[]>([]);

  useEffect(() => {
    console.log('loading: ', loading);
  }, [loading]);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    const {data, error} = await getImages(1);
    setLoading(false);

    if (error) {
      console.error(error);
    }
    if (data) {
      const {pictures, ...page} = data;
      setPictures(data.pictures);
      setPage(page);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return (
    <div className="App">
      <div>{JSON.stringify(pictures, null, 2)}</div>
      <div>{JSON.stringify(page, null, 2)}</div>
    </div>
  );
}

export default App;
