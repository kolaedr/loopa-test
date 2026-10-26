import React from 'react';
import './App.css';
import SwiperComponent from './components/Swiper';

const App = () => {
  const items = [
    <div key="1">Card 1</div>,
    <div key="2">Card 2</div>,
    <div key="3">Card 3</div>,
  ];

const App = () => {
  return (
    <div className="App">
      <SwiperComponent items={items} />
    </div>
  );
};

export default App;