import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Delphi from './specificComponents/Delphi';

const App = () => {
  const [count, setCount] = useState(0)
  return <div className="App"><Delphi/></div>
}

export default App
