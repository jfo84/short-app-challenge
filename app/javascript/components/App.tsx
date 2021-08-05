import * as React from 'react';

import UrlForm from './UrlForm';
import TopUrls from './TopUrls';

const App = () => (
  <div className='app-container'>
    <h2 className='app-title'>
      Url Shortener
    </h2>
    <UrlForm />
    <TopUrls />
  </div>
);

export default App;
