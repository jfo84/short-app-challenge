import * as React from 'react';
import { Typography } from 'antd';

const { useState } = React;
const { Title } = Typography;

import UrlForm from './UrlForm';
import TopUrls from './TopUrls';

import 'antd/dist/antd.css';
import '../stylesheets/App';

const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
const regex = new RegExp(expression);

const useForm = () => {
  const [formError, setError] = useState<string>('');
  const [formUrl, setUrl] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target instanceof HTMLInputElement) {
      setUrl(url => event.target.value);
      setError(e => '');
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.currentTarget instanceof HTMLInputElement) {
      const { code, currentTarget } = event;
  
      if (code === 'Enter') {
        const fullUrl = currentTarget.value

        if (fullUrl.match(regex)) {
          fetch('http://localhost:3000/', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ full_url: fullUrl }),
          }).then(response => response.json(),
          ).then(data => {
            if (data.errors && data.errors.length > 0) {
              setError(data.errors[0]);
            } else {
              setUrl(url => '');
            }
          });
        } else {
          setError('Full url is not a valid url');
        }
      }
    }
  };

  return {
    formUrl,
    formError,
    handleChange,
    handleKeyUp,
  };
};

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
