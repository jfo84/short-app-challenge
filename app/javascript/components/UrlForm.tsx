import * as React from 'react';

const { useState } = React;

// Ephemeral state for questions that haven't been added yet
const useForm = () => {
  const [formUrl, setUrl] = useState('');

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

const UrlForm = () => {
  const { formUrl, handleChange, handleKeyUp } = useForm();

  return (
    <div className='form-container'>
      {/* TODO Flex 0 auto */}
      <div className='flex'>
        <input
          id='url'
          name='url'
          type='text'
          className='url-input form-control'
          placeholder='Type a URL to shorten'
          aria-label='Url'
          value={formUrl}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
        />
      </div>
    </div>
  );
};

export default UrlForm;
