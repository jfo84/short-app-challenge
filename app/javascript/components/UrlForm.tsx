import * as React from 'react';
import { Form, Input } from 'antd';

import '../stylesheets/UrlForm';

type Props = {
  formUrl: string;
  formError: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const wrapperCol = {
  xs: {
    span: 48,
  },
  sm: {
    span: 24,
  },
};

const UrlForm = ({ formUrl, formError, handleChange, handleKeyUp }: Props) => (
  <Form wrapperCol={wrapperCol} className='form-container'>
    <Form.Item
      validateStatus={formError.length == 0 ? '' : 'error'}
      help={formError}
    >
      <Input
        type='text'
        className='url-input'
        placeholder='Type a URL to shorten. Press Enter to POST'
        aria-label='Url Input'
        value={formUrl}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
    </Form.Item>
  </Form>
);

export default UrlForm;
