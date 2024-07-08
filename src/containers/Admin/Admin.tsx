import React, {ChangeEvent, FormEvent, useCallback, useEffect, useState} from 'react';
import './Admin.css';
import {useNavigate} from 'react-router-dom';
import axiosApi from '../../axiosApi';
import {PageContentApi} from '../../types';
import Preloader from '../../components/Preloader/Preloader';

const initialState = {
  page: '',
  title: '',
  content: '',
};
const Admin = () => {
  const [pageDetails, setPageDetails] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchPageContent = useCallback(async () => {
    setIsLoading(true);
    if (pageDetails.page !== '') {
      const {data: pageContent} = await axiosApi.get<PageContentApi | null>(`/pages/${pageDetails.page}.json`);
      setPageDetails(prevState => {
        return {...prevState, title: pageContent.title, content: pageContent.content};
      });
    } else {
      setPageDetails(initialState);
    }
    setIsLoading(false);
  }, [pageDetails.page]);

  useEffect(() => {
      void fetchPageContent();
  }, [fetchPageContent]);
  const onSelectChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = event.target;
    await setPageDetails((prevState) => {
      return {...prevState, [name]: value};
    });
  };
  const onFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = event.target;
    setPageDetails((prevState) => {
      return {...prevState, [name]: value};
    });
    console.log(pageDetails);
  };
  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const quote = {title: pageDetails.title, content: pageDetails.content};
    try {
        await axiosApi.put(`/pages/${pageDetails.page}.json`, quote);
    } finally {
      setIsLoading(false);
      navigate(`/pages/${pageDetails.page}`);
    }
  };

  let form = (
    <form onSubmit={onFormSubmit}>
      <div className="form-group">
        <select
          className={'form-control'}
          onChange={onSelectChange}
          name={'page'}
          defaultValue={pageDetails.page}>
          <option value="">choose page</option>
          <option value={'home'}>Home</option>
          <option value={'products'}>Products</option>
          <option value={'collections'}>Collections</option>
          <option value={'about'}>About</option>
          <option value={'contacts'}>Contacts</option>
        </select>
        <label htmlFor="title">Title</label>
        <input
          onChange={onFieldChange}
          value={pageDetails.title}
          id="title"
          type="text"
          name="title"
          className="form-control"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          onChange={onFieldChange}
          value={pageDetails.content}
          id="content"
          name="content"
          className="form-control"
          required
        />
      </div>

      <button type="submit" className="btn">
        Save
      </button>
    </form>
  );
  if (isLoading) {
    form = <div style={{padding: '117px 0', alignContent: "center"}}><Preloader/></div>;
  }
  return (
    <div className={'container add-container'}>
      <h2>Edit Pages</h2>
      {form}
    </div>
  );
};

export default Admin;