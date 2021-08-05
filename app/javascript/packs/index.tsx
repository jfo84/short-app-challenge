import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

const App = () => <div>Foo Bar</div>;

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(<App />, document.getElementById('root'));
});
