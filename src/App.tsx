import React, { useEffect, useState, useReducer } from "react";
import "./App.css";
import InputSlider from "./InputSlider";
import functionPlot from "function-plot";
import SolutionCarousel from "./SolutionCarousel";
import solutionArray from "./SolutionArray";
import Latex from "react-latex";
import Button from "@mui/material/Button";
import Settings, { SimpleDialogProps } from "./Settings";
<<<<<<< HEAD
import { derivative, max } from "mathjs";
import FormulaButton from "./FormulaButton";
import InputSection from "./InputSection";

function signedCoef(coef: number, op: string) {
  if ((op === "-" && coef < 0) || (op === "+" && coef >= 0))
    return `+ ${coef}`;
  if (op === "-" && coef === 0) return "- 0";
  return `${coef}`;
}
=======
>>>>>>> e03681728755e1ca890be7807aa16b78cd53cbbe

function App() {
  function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
<<<<<<< HEAD

  function handleDialogUpdate(props: Omit<SimpleDialogProps, 'open' | 'onClose'>): void {
=======
  function signedCoef(coef: number, op: string) {
    if ((op === "-" && coef < 0) || (op === "+" && coef >= 0))
      return `+ ${coef}`;
    if (op === "-" && coef === 0) return "- 0";
    return `${coef}`;
  }
  function handleDialogUpdate(
    props: Omit<SimpleDialogProps, "open" | "onClose">
  ): void {
>>>>>>> e03681728755e1ca890be7807aa16b78cd53cbbe
    setRadioValue(props.defaultStep);
    setRangeSliderVal(props.defaultRange);
    setCheckedZoom(props.defaultZoom);
    setCheckedDerivative(props.defaultDerivative);
<<<<<<< HEAD
    setCheckedGrid(props.defaultGrid)


=======
    setCheckedGrid(props.defaultGrid);
    // forceUpdate();
>>>>>>> e03681728755e1ca890be7807aa16b78cd53cbbe
    setOpen(false);
    console.log(-rangeSliderVal)
    console.log(rangeSliderVal)
    console.log(coeffs.a)
    console.log(Math.max(-rangeSliderVal, Math.min(rangeSliderVal, coeffs.a)))
    setCoeffs({
      a: Math.max(-rangeSliderVal, Math.min(rangeSliderVal, coeffs.a)),
      b: Math.max(-rangeSliderVal, Math.min(rangeSliderVal, coeffs.b)),
      c: Math.max(-rangeSliderVal, Math.min(rangeSliderVal, coeffs.c)),
      d: Math.max(-rangeSliderVal, Math.min(rangeSliderVal, coeffs.d)),
      e: Math.max(-rangeSliderVal, Math.min(rangeSliderVal, coeffs.e)),
      f: Math.max(-rangeSliderVal, Math.min(rangeSliderVal, coeffs.f)),
      // a: 1,
      // b: 1,
      // c: 1,
      // d: 1,
      // e: 1,
      // f: 1
    })
  }
  function handleFormulaButton(index: number): void {
    setCoeffs(predefinedFormulae[index]);
  }

  const [coeffs, setCoeffs] = useState({ a: getRandomInt(-10, 10), b: getRandomInt(-10, 10), c: getRandomInt(-10, 10), d: getRandomInt(-10, 10), e: getRandomInt(-10, 10), f: getRandomInt(-10, 10) })

  // const [, forceUpdate] = useReducer(x => x + 1, 0);
<<<<<<< HEAD
  const [radioValue, setRadioValue] = useState('1');
=======
  const [radioValue, setRadioValue] = useState("0.1");
>>>>>>> e03681728755e1ca890be7807aa16b78cd53cbbe
  const [rangeSliderVal, setRangeSliderVal] = useState(20);
  const [checkedZoom, setCheckedZoom] = useState(true);
  const [checkedDerivative, setCheckedDerivative] = useState(true);
  const [checkedGrid, setCheckedGrid] = useState(true);
  const [open, setOpen] = React.useState(false);
  const predefinedFormulae = [{ a: 1, b: 1, c: 1, d: 1, e: 1, f: 1 }]


  useEffect(() => {
    let width = document.getElementById('x')?.offsetWidth;
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
          fn: `(${coeffs.a}x^2+${coeffs.b}x+${coeffs.c})/(${coeffs.d}x^2+${coeffs.e}x+${coeffs.f})`,
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
            <h2 id="warning"> WARNING: We round to 4 decimal places</h2>
          </div>
          <div className="graph-wrapper">
            <div id="x" className="graph"></div>
            <div className="function-container">
<<<<<<< HEAD
              <div className="function-wrapper component">
                <Latex>{`$\\large{f(x) = \\frac{${coeffs.a}x^2${signedCoef(coeffs.b, '+')}x${signedCoef(coeffs.c, '+')}}{${coeffs.d}x^2${signedCoef(coeffs.e, '+')}x${signedCoef(coeffs.f, '+')}}}$`}</Latex>
                <div className="sliders">
                  <InputSection step={parseFloat(radioValue)} range={[-rangeSliderVal, rangeSliderVal]} label="a" update={(a) => { setCoeffs({ ...coeffs, a }) }} value={coeffs.a} cantBeZero={true} />
                  <InputSection step={parseFloat(radioValue)} range={[-rangeSliderVal, rangeSliderVal]} label="b" update={(b) => { setCoeffs({ ...coeffs, b }) }} value={coeffs.b} />
                  <InputSection step={parseFloat(radioValue)} range={[-rangeSliderVal, rangeSliderVal]} label="c" update={(c) => { setCoeffs({ ...coeffs, c }) }} value={coeffs.c} />
                  <InputSection step={parseFloat(radioValue)} range={[-rangeSliderVal, rangeSliderVal]} label="d" update={(d) => { setCoeffs({ ...coeffs, d }) }} value={coeffs.d} cantBeZero={true} />
                  <InputSection step={parseFloat(radioValue)} range={[-rangeSliderVal, rangeSliderVal]} label="e" update={(e) => { setCoeffs({ ...coeffs, e }) }} value={coeffs.e} />
                  <InputSection step={parseFloat(radioValue)} range={[-rangeSliderVal, rangeSliderVal]} label="f" update={(f) => { setCoeffs({ ...coeffs, f }) }} value={coeffs.f} />
=======
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
>>>>>>> e03681728755e1ca890be7807aa16b78cd53cbbe
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
              <div>
                <FormulaButton onClick={() => { handleFormulaButton(0) }} coeffs={Array.from(Object.values(predefinedFormulae[0]))}></FormulaButton>
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
