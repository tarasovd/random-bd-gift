import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

if (localStorage.getItem('attempts') === null) {
  localStorage.setItem('attempts', 3)
};

ReactDOM.render(<App />, document.getElementById('root'))
