import React, { useEffect, useState } from 'react';
import './App.css';
import InputSlider from './InputSlider';
// import functionPlot from './FunctionPlot';

import functionPlot from 'function-plot';

function App() {

  const [coeffA, setCoeffA] = useState(0);
  const [coeffB, setCoeffB] = useState(0);
  const [coeffC, setCoeffC] = useState(0);
  const [coeffD, setCoeffD] = useState(0);
  const [coeffE, setCoeffE] = useState(0);
  const [coeffF, setCoeffF] = useState(0);

  useEffect(() => {
    let width = 800;
    let height = 800;

    // let contentsBounds = document.getElementById('x')!.getBoundingClientRect();
    // let ratio = contentsBounds.width / width;
    // width *= ratio;
    // height *= ratio;

    let c = 0;

    functionPlot({
      target: "#x",
      width,
      height,
      yAxis: { domain: [-20, 20] },
      xAxis: { domain: [-20, 20] },
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
            <InputSlider label='a' update={setCoeffA} />
            <InputSlider label='b' update={setCoeffB} />
            <InputSlider label='c' update={setCoeffC} />
            <InputSlider label='d' update={setCoeffD} />
            <InputSlider label='e' update={setCoeffE} />
            <InputSlider label='f' update={setCoeffF} />
          </div>
          <div className='solutions'>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
