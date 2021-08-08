import * as React from 'react';

const { useState } = React;

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
            method: 'POST',
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

export default useForm;
