import React, { useEffect, useState, useReducer } from "react";
import "./App.css";
import InputSlider from "./InputSlider";
import functionPlot from "function-plot";
import SolutionCarousel from "./SolutionCarousel";
import solutionArray from "./SolutionArray";
import Latex from "react-latex";
import Button from "@mui/material/Button";
import Settings, { SimpleDialogProps } from "./Settings";
import { derivative, max } from "mathjs";
import FormulaButton from "./FormulaButton";
import InputSection from "./InputSection";

function signedCoef(coef: number, op: string) {
  if ((op === "-" && coef < 0) || (op === "+" && coef >= 0)) return `+ ${coef}`;
  if (op === "-" && coef === 0) return "- 0";
  return `${coef}`;
}

function App() {
  function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
  function handleFormulaButton(index: number): void {
    setCoeffs(predefinedFormulae[index]);
  }

  const [coeffs, setCoeffs] = useState({
    a: getRandomInt(-10, 10),
    b: getRandomInt(-10, 10),
    c: getRandomInt(-10, 10),
    d: getRandomInt(-10, 10),
    e: getRandomInt(-10, 10),
    f: getRandomInt(-10, 10),
  });

  const [radioValue, setRadioValue] = useState("1");
  const [rangeSliderVal, setRangeSliderVal] = useState(20);
  const [checkedZoom, setCheckedZoom] = useState(true);
  const [checkedDerivative, setCheckedDerivative] = useState(true);
  const [checkedGrid, setCheckedGrid] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [widthGraph, setWidth] = useState(document.getElementById("x")?.offsetWidth)

  const predefinedFormulae = [
    { a: 1, b: 1, c: 1, d: 1, e: 1, f: 1 },
    { a: 1, b: 0, c: 1, d: 1, e: 0, f: -4 },
    { a: 1, b: 7, c: -4, d: 1, e: 1, f: -2 },
    { a: -3, b: 0, c: 4, d: 1, e: -2, f: 1 },
    {
      a: getRandomInt(-10, 10),
      b: getRandomInt(-10, 10),
      c: getRandomInt(-10, 10),
      d: getRandomInt(-10, 10),
      e: getRandomInt(-10, 10),
      f: getRandomInt(-10, 10),
    }
  ];
  useEffect(() => {
    setCoeffs({
      a: Math.max(-rangeSliderVal, Math.min(rangeSliderVal, coeffs.a)),
      b: Math.max(-rangeSliderVal, Math.min(rangeSliderVal, coeffs.b)),
      c: Math.max(-rangeSliderVal, Math.min(rangeSliderVal, coeffs.c)),
      d: Math.max(-rangeSliderVal, Math.min(rangeSliderVal, coeffs.d)),
      e: Math.max(-rangeSliderVal, Math.min(rangeSliderVal, coeffs.e)),
      f: Math.max(-rangeSliderVal, Math.min(rangeSliderVal, coeffs.f)),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  const xScale = [-20, 20]
  function computeYScale(width: number, height: number, xScale: number[]) {
    const xDiff = xScale[1] - xScale[0]
    const yDiff = height * xDiff / width
    return [-yDiff / 2, yDiff / 2]
  }


  useEffect(() => {
    function handleResize() {
      setWidth(document.getElementById("x")?.offsetWidth)
      console.log('resized')
    }
    window.addEventListener('resize', handleResize)

    let width = document.getElementById("x")?.offsetWidth;
    let height = 800;

    functionPlot({
      target: "#x",
      width: document.getElementById("x")?.offsetWidth,
      height: document.getElementById("x")?.offsetWidth,
      xAxis: { domain: xScale },
      yAxis: { domain: computeYScale(width as number, height, xScale) },
      disableZoom: !checkedZoom,
      grid: checkedGrid,
      data: [
        {
          fn: `(${coeffs.a}x^2+${coeffs.b}x+${coeffs.c})/(${coeffs.d}x^2+${coeffs.e}x+${coeffs.f})`,
          color: 'grey',
          graphType: "polyline",
          derivative: {
            fn: `((2*${coeffs.a}x + ${coeffs.b}) * (${coeffs.d}x^2+${coeffs.e}x+${coeffs.f}) 
                - (2*${coeffs.d}x + ${coeffs.e}) * (${coeffs.a}x^2+${coeffs.b}x+${coeffs.c}))
                /((${coeffs.d}x^2+${coeffs.e}x+${coeffs.f})^2)`,
            updateOnMouseMove: checkedDerivative,
          },
        },
      ],
    });
  });
  return (
    <>
      <div className="main primary">
        <div className="container secondary">
          <div className="header-wrapper">
            <h1>
              Analysis of the variability course and a graph of a rational
              function defined by an equation in form:
            </h1>
            <Latex>{`$\\Large{f(x) = \\frac{ax^2 + bx + c}{dx^2 + ex + f}}\\ \\ \\ \\normalsize {a \\neq 0 \\wedge d \\neq 0}$`}</Latex>
            {/* <h2 id="warning"> WARNING: We round to 4 decimal places</h2> */}
          </div>
          <div className="graph-container">
            <div className="graph-wrapper">
              <div id="x" className="graph"></div>
            </div>
            <div className="function-container">
              <div className="menu-wrapper">
                <div className="sliders-wrapper component">
                  <Latex>{`$\\large{f(x) = \\frac{${coeffs.a}x^2${signedCoef(
                    coeffs.b,
                    "+"
                  )}x${signedCoef(coeffs.c, "+")}}{${coeffs.d}x^2${signedCoef(
                    coeffs.e,
                    "+"
                  )}x${signedCoef(coeffs.f, "+")}}}$`}</Latex>
                  <div className="sliders">
                    <div>
                      <InputSection
                        step={parseFloat(radioValue)}
                        range={[-rangeSliderVal, rangeSliderVal]}
                        label="a"
                        update={(a) => {
                          setCoeffs({ ...coeffs, a });
                        }}
                        value={coeffs.a}
                        cantBeZero={true}
                      />
                      <InputSection
                        step={parseFloat(radioValue)}
                        range={[-rangeSliderVal, rangeSliderVal]}
                        label="b"
                        update={(b) => {
                          setCoeffs({ ...coeffs, b });
                        }}
                        value={coeffs.b}
                      />
                      <InputSection
                        step={parseFloat(radioValue)}
                        range={[-rangeSliderVal, rangeSliderVal]}
                        label="c"
                        update={(c) => {
                          setCoeffs({ ...coeffs, c });
                        }}
                        value={coeffs.c}
                      />
                    </div>
                    <div>
                      <InputSection
                        step={parseFloat(radioValue)}
                        range={[-rangeSliderVal, rangeSliderVal]}
                        label="d"
                        update={(d) => {
                          setCoeffs({ ...coeffs, d });
                        }}
                        value={coeffs.d}
                        cantBeZero={true}
                      />
                      <InputSection
                        step={parseFloat(radioValue)}
                        range={[-rangeSliderVal, rangeSliderVal]}
                        label="e"
                        update={(e) => {
                          setCoeffs({ ...coeffs, e });
                        }}
                        value={coeffs.e}
                      />
                      <InputSection
                        step={parseFloat(radioValue)}
                        range={[-rangeSliderVal, rangeSliderVal]}
                        label="f"
                        update={(f) => {
                          setCoeffs({ ...coeffs, f });
                        }}
                        value={coeffs.f}
                      />
                    </div>
                  </div>
                  <Settings
                    open={open}
                    step={radioValue}
                    range={rangeSliderVal}
                    zoom={checkedZoom}
                    derivative={checkedDerivative}
                    grid={checkedGrid}
                    setStep={setRadioValue}
                    setRange={setRangeSliderVal}
                    setZoom={setCheckedZoom}
                    setDerivative={setCheckedDerivative}
                    setGrid={setCheckedGrid}
                    setOpen={setOpen}
                  />
                </div>
                <div className="morebuttondiv">
                  <div className="buttondiv">
                    <FormulaButton onClick={() => { handleFormulaButton(0); }} coeffs={Array.from(Object.values(predefinedFormulae[0]))} />
                    <FormulaButton onClick={() => { handleFormulaButton(1); }} coeffs={Array.from(Object.values(predefinedFormulae[1]))} />
                  </div>
                  <div className="buttondiv">
                    <FormulaButton onClick={() => { handleFormulaButton(2); }} coeffs={Array.from(Object.values(predefinedFormulae[2]))} />
                    <FormulaButton onClick={() => { handleFormulaButton(3); }} coeffs={Array.from(Object.values(predefinedFormulae[3]))} />
                  </div>
                  <div className="randomButton">
                    <FormulaButton randomize={true} onClick={() => { handleFormulaButton(4); }} coeffs={Array.from(Object.values(predefinedFormulae[4]))} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <button onClick={() => { setCoeffA(0) }}>Reset</button> */}
          <div className="solutions component">
            <SolutionCarousel
              itemArr={solutionArray(
                coeffs.a,
                coeffs.b,
                coeffs.c,
                coeffs.d,
                coeffs.e,
                coeffs.f
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
