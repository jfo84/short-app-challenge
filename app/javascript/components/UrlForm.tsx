import * as React from 'react';

type Props = {
  formUrl: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const UrlForm = ({ formUrl, handleChange, handleKeyUp }: Props) => (
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

export default UrlForm;
