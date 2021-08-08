import * as React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

import useForm from '../hooks/useForm';
import UrlForm from './UrlForm';
import TopUrls from './TopUrls';

import 'antd/dist/antd.css';
import '../stylesheets/App';

const App = () => {
  const { formUrl, formError, handleChange, handleKeyUp } = useForm();

  return (
    <div className='app-container'>
      <Title level={2} className='app-title'>
        Url Shortener
      </Title>
      <UrlForm
        formUrl={formUrl}
        formError={formError}
        handleChange={handleChange}
        handleKeyUp={handleKeyUp}
      />
      <TopUrls formUrl={formUrl} />
    </div>
  );
};

export default App;
