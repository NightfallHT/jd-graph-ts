import React, { useEffect, useState, useReducer } from "react";
import "./App.css";
import InputSlider from "./InputSlider";
import functionPlot from "function-plot";
import SolutionCarousel from "./SolutionCarousel";
import solutionArray from "./SolutionArray";
import Latex from "react-latex";
import Button from "@mui/material/Button";
import Settings, { SimpleDialogProps } from "./Settings";

function App() {
  function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
  function signedCoef(coef: number, op: string) {
    if ((op === "-" && coef < 0) || (op === "+" && coef >= 0))
      return `+ ${coef}`;
    if (op === "-" && coef === 0) return "- 0";
    return `${coef}`;
  }
  function handleDialogUpdate(
    props: Omit<SimpleDialogProps, "open" | "onClose">
  ): void {
    setRadioValue(props.defaultStep);
    setRangeSliderVal(props.defaultRange);
    setCheckedZoom(props.defaultZoom);
    setCheckedDerivative(props.defaultDerivative);
    setCheckedGrid(props.defaultGrid);
    // forceUpdate();
    setOpen(false);
  }

  const [coeffA, setCoeffA] = useState(getRandomInt(-100, 100) / 10);
  const [coeffB, setCoeffB] = useState(getRandomInt(-100, 100) / 10);
  const [coeffC, setCoeffC] = useState(getRandomInt(-100, 100) / 10);
  const [coeffD, setCoeffD] = useState(getRandomInt(-100, 100) / 10);
  const [coeffE, setCoeffE] = useState(getRandomInt(-100, 100) / 10);
  const [coeffF, setCoeffF] = useState(getRandomInt(-100, 100) / 10);
  // const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [radioValue, setRadioValue] = useState("0.1");
  const [rangeSliderVal, setRangeSliderVal] = useState(20);
  const [checkedZoom, setCheckedZoom] = useState(true);
  const [checkedDerivative, setCheckedDerivative] = useState(true);
  const [checkedGrid, setCheckedGrid] = useState(true);
  const [open, setOpen] = React.useState(false);

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
      yAxis: { domain: [-20, 20] },
      xAxis: { domain: [-20, 20] },
      disableZoom: !checkedZoom,
      grid: checkedGrid,
      data: [
        {
          fn: `(${coeffA}x^2+${coeffB}x+${coeffC})/(${coeffD}x^2+${coeffE}x+${coeffF})`,
          graphType: "polyline",
          derivative: {
            fn: `((2*${coeffA}x + ${coeffB}) * (${coeffD}x^2+${coeffE}x+${coeffF}) 
                - (2*${coeffD}x + ${coeffE}) * (${coeffA}x^2+${coeffB}x+${coeffC}))
                /((${coeffD}x^2+${coeffE}x+${coeffF})^2)`,
            updateOnMouseMove: checkedDerivative,
          },
        },
      ],
    });
  });
  return (
    <>
      <div className="main">
        <div className="container">
          <div className="header-wrapper">
            <h1>
              Analysis of the variability course and a graph of a rational
              function defined by an equation in form:
            </h1>
            <Latex>{`$\\Large{f(x) = \\frac{ax^2 + bx + c}{dx^2 + ex + f}}\\ \\ \\ \\normalsize {a \\neq 0 \\wedge d \\neq 0}$`}</Latex>
            <h2 id="warning"> WARNING: We round to 4 decimal places</h2>
          </div>
          <div className="graph-wrapper">
            <div id="x" className="graph"></div>
            <div className="function-container">
              <div className="function-wrapper">
                <Latex>{`$\\large{f(x) = \\frac{${coeffA}x^2${signedCoef(
                  coeffB,
                  "+"
                )}x${signedCoef(coeffC, "+")}}{${coeffD}x^2${signedCoef(
                  coeffE,
                  "+"
                )}x${signedCoef(coeffF, "+")}}}$`}</Latex>

                <div className="sliders">
                  <InputSlider
                    step={parseFloat(radioValue)}
                    range={[-rangeSliderVal, rangeSliderVal]}
                    label="a"
                    update={setCoeffA}
                    initval={coeffA}
                    cantBeZero={true}
                  />
                  <InputSlider
                    step={parseFloat(radioValue)}
                    range={[-rangeSliderVal, rangeSliderVal]}
                    label="b"
                    update={setCoeffB}
                    initval={coeffB}
                  />
                  <InputSlider
                    step={parseFloat(radioValue)}
                    range={[-rangeSliderVal, rangeSliderVal]}
                    label="c"
                    update={setCoeffC}
                    initval={coeffC}
                  />
                  <InputSlider
                    step={parseFloat(radioValue)}
                    range={[-rangeSliderVal, rangeSliderVal]}
                    label="d"
                    update={setCoeffD}
                    initval={coeffD}
                    cantBeZero={true}
                  />
                  <InputSlider
                    step={parseFloat(radioValue)}
                    range={[-rangeSliderVal, rangeSliderVal]}
                    label="e"
                    update={setCoeffE}
                    initval={coeffE}
                  />
                  <InputSlider
                    step={parseFloat(radioValue)}
                    range={[-rangeSliderVal, rangeSliderVal]}
                    label="f"
                    update={setCoeffF}
                    initval={coeffF}
                  />
                </div>
                <Settings
                  open={open}
                  onClose={handleDialogUpdate}
                  {...radioValue}
                  {...rangeSliderVal}
                  {...checkedZoom}
                  {...checkedDerivative}
                  {...checkedGrid}
                />
              </div>
            </div>
          </div>
          {/* <button onClick={() => { setCoeffA(0) }}>Reset</button> */}
          <div className="solutions">
            <SolutionCarousel
              itemArr={solutionArray(
                coeffA,
                coeffB,
                coeffC,
                coeffD,
                coeffE,
                coeffF
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
