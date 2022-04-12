import React, { useEffect, useState } from 'react';
import './App.css';
import InputSlider from './InputSlider';
import functionPlot from 'function-plot';
import SolutionCarousel from './SolutionCarousel';
import solutionArray from './SolutionArray';

function App() {
  function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
  const [coeffA, setCoeffA] = useState(getRandomInt(-100, 100) / 10);
  const [coeffB, setCoeffB] = useState(getRandomInt(-100, 100) / 10);
  const [coeffC, setCoeffC] = useState(getRandomInt(-100, 100) / 10);
  const [coeffD, setCoeffD] = useState(getRandomInt(-100, 100) / 10);
  const [coeffE, setCoeffE] = useState(getRandomInt(-100, 100) / 10);
  const [coeffF, setCoeffF] = useState(getRandomInt(-100, 100) / 10);
  useEffect(() => {
    let width = 800;
    let height = 800;

    // let contentsBounds = document.getElementById('x')!.getBoundingClientRect();
    // let ratio = contentsBounds.width / width;
    // width *= ratio;
    // height *= ratio;
    functionPlot({
      target: "#x",
      width,
      height,
      yAxis: { domain: [-200, 200] },
      xAxis: { domain: [-200, 200] },
      disableZoom: true,
      grid: false,
      data: [
        {
          fn: `(${coeffA}x^2+${coeffB}x+${coeffC})/(${coeffD}x^2+${coeffE}x+${coeffF})`,
          graphType: "polyline",
          derivative: {
            fn: `((2*${coeffA}x + ${coeffB}) * (${coeffD}x^2+${coeffE}x+${coeffF}) 
                - (2*${coeffD}x + ${coeffE}) * (${coeffA}x^2+${coeffB}x+${coeffC}))
                /((${coeffD}x^2+${coeffE}x+${coeffF})^2)`,
            updateOnMouseMove: true
          }
        }
      ]
    });

  })

  return (
    <>
      <div className='main'>
        <div className='container'>
          <div id='x' className='graph'>

          </div>
          <div className='sliders'>
            <InputSlider label='a' update={setCoeffA} initval={coeffA} />
            <InputSlider label='b' update={setCoeffB} initval={coeffB} />
            <InputSlider label='c' update={setCoeffC} initval={coeffC} />
            <InputSlider label='d' update={setCoeffD} initval={coeffD} />
            <InputSlider label='e' update={setCoeffE} initval={coeffE} />
            <InputSlider label='f' update={setCoeffF} initval={coeffF} />
          </div>
          {/* <button onClick={() => { setCoeffA(0) }}>Reset</button> */}
          <div className='solutions'>
            <SolutionCarousel itemArr={solutionArray(coeffA, coeffB, coeffC, coeffD, coeffE, coeffF)} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
