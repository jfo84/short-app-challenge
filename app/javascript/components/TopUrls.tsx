import * as React from 'react';

const { useEffect, useState } = React;

import Spinner from './Spinner';

type TopUrlsType = {
  urls: UrlType[];
};

type UrlType = {
  title: string;
  short_code: string;
};

type Props = {
  formUrl: string;
};

const getTopUrls = () =>
  fetch('http://localhost:3000/top_urls')
    .then(data => data.json());

const TopUrls = ({ formUrl }: Props) => {
  const [topUrls, setTopUrls] = useState<TopUrlsType>({ urls: [] });

  useEffect(() => {
    let fetched = false;

    if (!fetched) {
      getTopUrls()
        .then(urlsResponse => {
          setTopUrls(urlsResponse);
        });     
    }

    return () => {
      fetched = true;
    };
  }, [formUrl]);

  const { urls } = topUrls;

  console.log('urls: ', urls);

  return (
    <div className='top-urls-container'>
      <h2 className='top-urls-title'>
        Top 100 URLs
      </h2>
      <div className='url-data-container'>
        {urls.length == 0 ? <Spinner /> :
          urls.map((url, index) => (
            <div className='url-data' key={`url-data-${index}`}>
              <div className='url-title'>
                {url.title}
              </div>
              <div className='url-short-code'>
                {url.short_code}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default TopUrls;
