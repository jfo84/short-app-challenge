import * as React from 'react';
import { Typography, Table } from 'antd';

const { useEffect, useState } = React;
const { Title } = Typography;

import Spinner from './Spinner';

type TopUrlsType = {
  urls: UrlType[];
};

type UrlType = {
  title: string;
  short_code: string;
  full_url: string;
};

type Props = {
  formUrl: string;
};

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Short Code',
    dataIndex: 'short_code',
    key: 'short_code',
  },
  {
    title: 'Full URL',
    dataIndex: 'full_url',
    key: 'full_url',
  },
];

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

  const dataSource = urls.map((url, index) => ({
    key: index,
    ...url,
  }));

  return (
    <div className='top-urls-container'>
      <Title level={3} className='top-urls-title'>
        Top 100 URLs
      </Title>
      {urls.length == 0 ?
          <Spinner /> :
          <Table columns={columns} dataSource={dataSource}/>}
    </div>
  );
}

export default TopUrls;
