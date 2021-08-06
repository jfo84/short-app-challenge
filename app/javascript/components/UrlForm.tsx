import * as React from 'react';
import { Input } from 'antd';

import '../stylesheets/UrlForm';

type Props = {
  formUrl: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const UrlForm = ({ formUrl, handleChange, handleKeyUp }: Props) => (
  <div className='form-container'>
    <Input
      type='text'
      className='url-input'
      placeholder='Type a URL to shorten. Press Enter to POST'
      aria-label='Url'
      value={formUrl}
      onChange={handleChange}
      onKeyUp={handleKeyUp}
    />
  </div>
);

export default UrlForm;
