import React from 'react';
import './App.css';
import InputSlider from './InputSlider';
function App() {
  return (
    <>
      <div className='main'>
        <div className='container'>
          <div className='graph'>

          </div>
          <div className='sliders'>
            <InputSlider label='a' />
          </div>
          <div className='solutions'>

          </div>
        </div>
      </div>
    </>
  );
}

export default App;
