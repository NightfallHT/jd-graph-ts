import React, { useEffect, useState } from 'react';
import './App.css';
import InputSlider from './InputSlider';
// import functionPlot from './FunctionPlot';

import functionPlot from 'function-plot';

function App() {

  const [coeffA, setCoeffA] = useState(0);

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
          fn: `(${coeffA}x^2+x)/(x^2-x)`,
          graphType: "polyline",
          // derivative: {
          //   fn: "2 * x",
          //   updateOnMouseMove: true
          // }
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
          </div>
          <div className='solutions'>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
