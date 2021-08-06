import * as React from 'react';
import { Typography } from 'antd';

const { useState } = React;
const { Title } = Typography;

import UrlForm from './UrlForm';
import TopUrls from './TopUrls';

import 'antd/dist/antd.css';
import '../stylesheets/App';

const useForm = () => {
  const [formUrl, setUrl] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target instanceof HTMLInputElement) {
      setUrl(url => event.target.value);
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.currentTarget instanceof HTMLInputElement) {
      const { code, currentTarget } = event;
  
      if (code === 'Enter') {
        fetch('http://localhost:3000/', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ full_url: currentTarget.value })
        }).then(
          (response) => response.json(),
        ).then((data) => {
          console.log('Created ShortUrl:', data.short_code);
          setUrl(url => '');
        }).catch(error => {
          // TODO: Handle error on input field
        });
      }
    }
  };

  return {
    formUrl,
    handleChange,
    handleKeyUp,
  };
};

const App = () => {
  const { formUrl, handleChange, handleKeyUp } = useForm();

  return (
    <div className='app-container'>
      <Title level={2} className='app-title'>
        Url Shortener
      </Title>
      <UrlForm
        formUrl={formUrl}
        handleChange={handleChange}
        handleKeyUp={handleKeyUp}
      />
      <TopUrls formUrl={formUrl} />
    </div>
  );
};

export default App;
