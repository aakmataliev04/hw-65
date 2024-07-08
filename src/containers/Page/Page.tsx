import React, {useCallback, useEffect, useState} from 'react';
import './Page.css';
import {useLocation} from 'react-router-dom';
import axiosApi from '../../axiosApi';
import {PageContentApi} from '../../types';
import Preloader from '../../components/Preloader/Preloader';
import Admin from '../Admin/Admin';

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<PageContentApi | null>(null);
  const {pathname: location} = useLocation();


  const fetchPageContent = useCallback(async () => {
    setIsLoading(true);
    if (location !== '/pages/admin') {
      const {data: pageContent} = await axiosApi.get<PageContentApi | null>(`${location}.json`);
      if (pageContent !== null) {
        setPage(pageContent);
      }
    }
    setIsLoading(false);
  }, [location]);
  useEffect(() => void fetchPageContent(), [fetchPageContent]);

  let content = null;
  if (location != '/pages/admin') {
    content = (
      !isLoading && page ?
      <div className="page-container">
        <h1 className={'page-title'}>{page.title}</h1>
        <div className="page-details">
          <p className={'page-text'}>{page.content}</p>
        </div>
      </div> : <div style={{height: '80vh', alignContent: "center"}}><Preloader/></div>
    );
  } else {
    content = (
      <Admin />
    );
  }
  return (
    content
  );
};

export default Page;