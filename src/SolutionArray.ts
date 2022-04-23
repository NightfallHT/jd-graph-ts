import { ItemProps } from "./SolutionCarousel";

const solutionArray = (
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  f: number
) => {
  const deltaNum = Math.pow(b, 2) - 4 * a * c;
  const deltaDen = Math.pow(e, 2) - 4 * d * f;
  const derivativeNumeratorA = a * e - b * d;
  const derivativeNumeratorB = 2 * (a * f - c * d);
  const derivativeNumeratorC = b * f - e * c;
  const deltaDerivativeNum =
    Math.pow(derivativeNumeratorB, 2) -
    4 * derivativeNumeratorA * derivativeNumeratorC;
  function derivativeSign(a: number, b: number): boolean {
    a = a === Number.NEGATIVE_INFINITY ? b - 1 : a;
    b = b === Number.POSITIVE_INFINITY ? a + 1 : b;
    const x = (a + b) / 2;
    return (
      derivativeNumeratorA * x * x +
        derivativeNumeratorB * x +
        derivativeNumeratorC >
      0
    );
  }
  function round(num: number) {
    return Math.round((num + Number.EPSILON) * 10000) / 10000;
  }

  // const numeratorDerivativeSimplified = simplify(`(2*${a}x+${b})*(${d}x^2+${e}x+${f})-(${a}x^2+${b}x+${c})*(2*${d}x+${e})`);
  // console.log(numeratorDerivativeSimplified);
  const solutionsDen = [
    (-e + Math.sqrt(deltaDen)) / (2 * d),
    (-e - Math.sqrt(deltaDen)) / (2 * d),
  ];
  solutionsDen.sort((a: number, b: number) => a - b);
  const solutionsDerivativeNumGenerator = () => {
    //generates solutions of the derivative analytically
    if (deltaDerivativeNum < 0) return [];
    if (deltaDerivativeNum > 0) {
      return [
        (-derivativeNumeratorB + Math.sqrt(deltaDerivativeNum)) /
          (derivativeNumeratorA * 2),
        (-derivativeNumeratorB - Math.sqrt(deltaDerivativeNum)) /
          (derivativeNumeratorA * 2),
      ];
    }
    return [-derivativeNumeratorB / (2 * derivativeNumeratorA)];
  };
  const solutionsDerivativeNum = solutionsDerivativeNumGenerator(); //sorts the solutions generated by the function above for convenience
  solutionsDerivativeNum.sort((a: number, b: number) => a - b);
  function signedCoef(coef: number, op: string) {
    if ((op === "-" && coef < 0) || (op === "+" && coef >= 0))
      return `+ ${Math.abs(coef)}`;
    if (op === "-" && coef === 0) return "- 0";
    return `${coef}`;
  }

  function rootsOfQuadratic(a: number, b: number, c: number): string[] {
    let delta = Math.pow(b, 2) - 4 * a * c;
    if (delta < 0)
      return [`$\\Delta < 0 \\Rightarrow  x _0 \\in \\varnothing$`];
    if (delta === 0)
      return [
        `$\\Delta = 0 \\Rightarrow \\\\ x = \\frac{-b}{2a} \\ x = ${round(
          (-b / 2) * a
        )}$`,
      ];
    else
      return [
        `$\\Delta > 0 \\Rightarrow$`,
        `$\\ x = \\frac{-b\\pm \\sqrt{\\Delta}}{2a}$`,
        `$\\ x = \\frac{${-b} + \\sqrt{${delta}}}{2\\cdot ${a}}\\vee x = \\frac{${-b} - \\sqrt{${round(
          delta
        )}}}{2\\cdot ${a}}$`,
        `$\\ x = ${round((-b - Math.sqrt(delta)) / (2 * a))} \\vee x = ${round(
          (-b + Math.sqrt(delta)) / (2 * a)
        )}$`,
      ];
  }
  function findDomain(delta: number): string[] {
    if (delta < 0) return [`$x \\in \\mathbb{R}$`];
    if (delta === 0)
      return [`$x \\in \\mathbb{R} \\setminus \\{${round((-d / 2) * e)}\\}$`];
    else
      return [
        `$x \\in \\mathbb{R} \\setminus \\{ ${round(solutionsDen[0])} , ${round(
          solutionsDen[1]
        )}\\}$`,
      ];
  }
  function limit() {
    if (deltaDen > 0) {
      return [
        "the limits around the point(s) excluded from the domain:",
        "to calculate them we need to find from which direction the zero in the denominator is approached,",
        "and what is the sign the numerator takes at where the denominator equals zero",
        `$\\lim\\limits_{x \\rightarrow ${round(
          solutionsDen[0]
        )}^-} \\stackrel{[\\frac{${
          a * Math.pow(solutionsDen[0], 2) + b * solutionsDen[0] + c > 0
            ? "+"
            : "-"
        }}{${d > 0 ? "0^+" : "0^-"}}]}{=} ${
          (a * Math.pow(solutionsDen[0], 2) + b * solutionsDen[0] + c) * d > 0
            ? "\\infin"
            : "-\\infin"
        }$`,
        `$\\lim\\limits_{x \\rightarrow ${round(solutionsDen[0])}^+} 
        \\stackrel{[\\frac{${
          a * Math.pow(solutionsDen[0], 2) + b * solutionsDen[0] + c > 0
            ? "+"
            : "-"
        }}{${d < 0 ? "0^+" : "0^-"}}]}{=} ${
          (a * Math.pow(solutionsDen[0], 2) + b * solutionsDen[0] + c) * d < 0
            ? "\\infin"
            : "-\\infin"
        }$`,
        `$\\lim\\limits_{x \\rightarrow ${round(solutionsDen[1])}^-}
        \\stackrel{[\\frac{${
          a * Math.pow(solutionsDen[1], 2) + b * solutionsDen[1] + c > 0
            ? "+"
            : "-"
        }}{${d < 0 ? "0^+" : "0^-"}}]}{=} ${
          (a * Math.pow(solutionsDen[1], 2) + b * solutionsDen[1] + c) * d < 0
            ? "\\infin"
            : "-\\infin"
        }$`,
        `$\\lim\\limits_{x \\rightarrow ${round(solutionsDen[1])}^+} 
        \\stackrel{[\\frac{${
          a * Math.pow(solutionsDen[1], 2) + b * solutionsDen[1] + c > 0
            ? "+"
            : "-"
        }}{${d > 0 ? "0^+" : "0^-"}}]}{=} ${
          (a * Math.pow(solutionsDen[1], 2) + b * solutionsDen[1] + c) * d > 0
            ? "\\infin"
            : "-\\infin"
        }$`,
      ];
    } else if (deltaDen === 0) {
      return [
        "the limits around the point(s) excluded from the domain:",
        `$\\lim\\limits_{x \\rightarrow ${solutionsDen[0]}^-}
        \\stackrel{[\\frac{${
          a * Math.pow(solutionsDen[0], 2) + b * solutionsDen[0] + c > 0
            ? "+"
            : "-"
        }}{${d > 0 ? "0^+" : "0^-"}}]}{=} ${
          (a * Math.pow(solutionsDen[0], 2) + b * solutionsDen[0] + c) * d > 0
            ? "\\infin"
            : "-\\infin"
        }$`,
        `$\\lim\\limits_{x \\rightarrow ${solutionsDen[0]}^+}
        \\stackrel{[\\frac{${
          a * Math.pow(solutionsDen[0], 2) + b * solutionsDen[0] + c > 0
            ? "+"
            : "-"
        }}{${d > 0 ? "0^+" : "0^-"}}]}{=} ${
          (a * Math.pow(solutionsDen[0], 2) + b * solutionsDen[0] + c) * d > 0
            ? "\\infin"
            : "-\\infin"
        }$`,
      ];
    }
    return [
      "there are no vertical asymptotes, since the denominator is never equal to zero",
    ];
  }

  function monotonicityRanges() {
    let ranges: Array<{ min: number; max: number }> = [
      { min: Number.NEGATIVE_INFINITY, max: Number.POSITIVE_INFINITY },
    ];
    let nextRanges: Array<{ min: number; max: number }> = [];
    solutionsDerivativeNum.forEach((solution) => {
      ranges.forEach((range) => {
        if (solution > range.min && solution < range.max) {
          nextRanges.push({ min: range.min, max: solution });
          nextRanges.push({ min: solution, max: range.max });
        } else {
          nextRanges.push(range);
        }
      });
      ranges = nextRanges;
      nextRanges = [];
    });
    solutionsDen.forEach((solution) => {
      ranges.forEach((range) => {
        if (solution > range.min && solution < range.max) {
          nextRanges.push({ min: range.min, max: solution });
          nextRanges.push({ min: solution, max: range.max });
        } else {
          nextRanges.push(range);
        }
      });
      ranges = nextRanges;
      nextRanges = [];
    });
    return ranges;
  }
  function monotonicity(ranges: Array<{ min: number; max: number }>) {
    let outputIncreasing = "$f\\nearrow";
    let outputDecreasing = "$f\\searrow";
    ranges.forEach((range) => {
      if (!derivativeSign(range.min, range.max)) return;
      outputIncreasing += `(${
        range.min === Number.NEGATIVE_INFINITY ? "-\\infty" : round(range.min)
      },${
        range.max === Number.POSITIVE_INFINITY ? "\\infty" : round(range.max)
      } ),`;
    });
    ranges.forEach((range) => {
      if (derivativeSign(range.min, range.max)) return;
      outputDecreasing += `(${
        range.min === Number.NEGATIVE_INFINITY ? "-\\infty" : round(range.min)
      },${
        range.max === Number.POSITIVE_INFINITY ? "\\infty" : round(range.max)
      } ),`;
    });
    outputIncreasing = outputIncreasing.slice(0, -1);
    outputDecreasing = outputDecreasing.slice(0, -1);

    outputIncreasing += "$";
    outputDecreasing += "$";

    outputIncreasing = outputIncreasing.length < 11 ? "" : outputIncreasing;
    outputDecreasing = outputDecreasing.length < 11 ? "" : outputDecreasing;
    return [outputIncreasing, outputDecreasing];
  }
  function table(ranges: Array<{ min: number; max: number }>) {
    interface point {
      point: number;
      type: "discontinuity" | "min" | "max";
    }
    interface range {
      min: number;
      max: number;
      minBracket: "(" | "[";
      maxBracket: ")" | "]";
      increasing: boolean;
    }
    function isPoint(object: point | range): object is point {
      return (object as range).increasing === undefined;
    }
    let rangesParsed: Array<point | range> = [];

    ranges.forEach((range) => {
      let minBracket: "(" | "[" = "[";
      let maxBracket: ")" | "]" = "]";
      if (range.min === Number.NEGATIVE_INFINITY) minBracket = "(";
      if (
        solutionsDen.includes(range.max) ||
        range.max === Number.POSITIVE_INFINITY
      ) {
        maxBracket = ")";
      }
      if (solutionsDerivativeNum.includes(range.min)) {
        if (derivativeNumeratorA > 0) {
          if (range.min === solutionsDerivativeNum[0]) {
            rangesParsed.push({ point: range.min, type: "max" });
          } else {
            rangesParsed.push({ point: range.min, type: "min" });
          }
        } else {
          if (range.min === solutionsDerivativeNum[0]) {
            rangesParsed.push({ point: range.min, type: "min" });
          } else {
            rangesParsed.push({ point: range.min, type: "max" });
          }
        }
      } else if (solutionsDen.includes(range.min)) {
        minBracket = "(";
        rangesParsed.push({ point: range.min, type: "discontinuity" });
      }
      const increasing = derivativeSign(range.min, range.max);
      rangesParsed.push({
        min: range.min,
        max: range.max,
        minBracket,
        maxBracket,
        increasing,
      });
    });
    if (rangesParsed) {
    }
    const columns =
      ranges.length + solutionsDerivativeNum.length + solutionsDen.length;
    let output = `$\\begin{array}{ c`;
    for (let index = 0; index < columns; index++) {
      output += " c ";
    }
    output += "} x& \\quad";
    rangesParsed.forEach((value) => {
      if (isPoint(value)) {
        output += `& ${round(value.point)}`;
      } else {
        output += `& ${value.minBracket} ${
          value.min === Number.NEGATIVE_INFINITY ? "-\\infty" : round(value.min)
        }, ${
          value.max === Number.POSITIVE_INFINITY ? "\\infty" : round(value.max)
        } ${value.maxBracket}`;
      }
    });
    output += "\\\\ \\hline \\\\ \\frac{df}{dx}& \\quad";
    rangesParsed.forEach((value) => {
      if (isPoint(value)) {
        if (value.type !== "discontinuity") {
          output += "& 0";
        } else {
          output += "& \\times";
        }
      } else {
        if (value.increasing) {
          output += "& +";
        } else {
          output += "& -";
        }
      }
    });
    output += "\\\\ \\hline \\\\ f&";
    rangesParsed.forEach((value) => {
      if (isPoint(value)) {
        if (value.type !== "discontinuity") {
          output += "&" + value.type;
        } else {
          output += "& \\times";
        }
      } else {
        if (value.increasing) {
          output += "&\\nearrow";
        } else {
          output += "&\\searrow";
        }
      }
    });
    output += "\\end{array}$";
    return output;
  }
  return [
    {
      header: "find out the solution with our super duper meth calculator",
      explanation:
        "you can navigate this carousel to find the exact steps you need to take to determine the graph of the function",
      solution: ["WARNING: We round to 4 decimal places"],
    },
    {
      header: "step 1 - find the domain",
      explanation: "find xs where the denominator = 0",
      solution: [
        "1: take the denominator",
        `$ ${d}x^2 ${signedCoef(e, "+")}x ${signedCoef(f, "+")}$`,
        "2: calculate delta",
        `$\\Delta = b^2 - 4ac$`,
        `$\\Delta = ${e}^2 - 4\\cdot ${d}\\cdot ${f}$`,
        `$\\Delta = ${deltaDen}$`,
        "3: determine the roots based on delta value",
        ...rootsOfQuadratic(d, e, f),
        "4: roots of the equation are where the denominator = 0, therefore:",
        ...findDomain(deltaDen),
      ],
    },
    {
      header: "step 2 - find roots",
      explanation: "find xs where the numerator = 0",
      solution: [
        "1: take the numerator",
        `$ ${a}x^2 ${signedCoef(b, "+")}x ${signedCoef(c, "+")}$`,
        "2: calculate delta",
        `$\\Delta = b^2 - 4ac$`,
        `$\\Delta = ${b}^2 - 4\\cdot ${a}\\cdot ${c}$`,
        `$\\Delta = ${deltaNum}$`,
        "3: determine the roots based on delta value",
        ...rootsOfQuadratic(a, b, c),
      ],
    },
    {
      header: "step 3 - find where function crosses the Y axis",
      explanation: "determine the value of f(x) when x = 0",
      solution: [
        "1: substitute 0 for x in the function equation",
        `$ f(0)=\\frac{${a} \\ \\cdot \\ 0^2 ${signedCoef(
          b,
          "+"
        )} \\ \\cdot \\ 0 ${signedCoef(
          c,
          "+"
        )}}{${d} \\ \\cdot \\ 0^2 ${signedCoef(
          e,
          "+"
        )} \\ \\cdot \\ 0 ${signedCoef(f, "+")}}$`,
        "2: cancel the 0's",
        `$f(0)=\\frac{${c}}{ ${f}}$`,
        "3: solve",
        `$f(0)=${round(c / f)}$`,
      ],
    },
    {
      header: "step 4 - check for evenness of the function",
      explanation: "check whether f(x) = f(-x)",
      solution: [
        "$ f(x) =\\frac{ax^2 + bx + c}{dx^2 + ex + f} = \\frac{g(x)}{h(x)}$",
        " a quadratic function is even if and only if the middle term is equal to zero, because",
        "$ax^2 + bx + c = a(-x)^2 + b(-x) + c$",
        " only holds if b = 0",
        "check whether the numerator is even:",
        `${
          b === 0
            ? "$ b = 0 \\iff g \\ is \\  even$"
            : "$b \\neq 0 \\iff g \\ isn't \\ even$"
        }`,
        "check whether the denominator is even:",
        `${
          e === 0
            ? "$e = 0 \\iff h \\ is \\  even$"
            : "$e \\neq 0 \\iff h \\ isn't \\ even$"
        }`,
        `the function is ${
          b === 0 && e === 0
            ? "even, because both the numerator and the denominator are even"
            : "not even, because the numerator or the denominator or both are not even "
        }`,
      ],
    },
    {
      header: "step 5 - calculate important limits",
      explanation:
        "calculate the limits at infinity and at the point where the denominator equals zero",
      solution: [
        "the limits at infinity:",
        `$\\lim\\limits_{x\\rightarrow\\pm\\infin} \\frac{ax^2 + bx + c}{dx^2 + ex + f} = $`,
        `$\\lim\\limits_{x\\rightarrow\\pm\\infin} \\frac{x(a + \\frac{b}{x} + \\frac{c}{x^2})}{x(d + \\frac{e}{x} + \\frac{f}{x^2})} = $`,
        `$\\lim\\limits_{x\\rightarrow\\pm\\infin} \\frac{a + \\frac{b}{x} + \\frac{c}{x^2}}{d + \\frac{e}{x} + \\frac{f}{x^2}} =\\frac{a}{d} = ${round(
          a / d
        )} $`,
        ...limit(),
      ],
    },
    {
      header: "step 6 - find the asymptotes",
      explanation:
        "check for the existence of horizontal, vertical and slant asymptotes",
      solution: [
        "the limits at infinity are the horizontal asymptotes:",
        `$\\lim\\limits_{x\\rightarrow\\pm\\infin} = ${round(a / d)}$`,
        "vertical asymptotes are the points where y -> infinity, or simply the roots of the denominator",
        "(spoiler, we did that in step 1)",
        ...rootsOfQuadratic(d, e, f),
        "slant asymptotes exist only when the polynomial in the numerator is of a higher degree than the denominator",
        "since the assignment specifically said $a \\neq 0$ and $d \\neq 0$, this rule is never satisfied, therefore there is no such asymptote",
      ],
    },
    {
      header: "step 7 - determine the monotonicity",
      explanation:
        "the monotonicity of a function is directly related to it's derivative",
      solution: [
        "therefore we must find it:",
        "let's treat our numerator and denominator as two separate functions:",
        `$g(x) = ax^2 + bx + c$`,
        `$h(x) = dx^2 + ex + f$`,
        `$\\frac{d}{dx} f(x) = \\frac{d}{dx} \\frac{g(x)}{h(x)} = \\frac{\\frac{d}{dx} g(x) \\cdot h(x) - g(x) \\cdot \\frac{d}{dx} h(x)}{h(x)^2}$`,

        `$\\frac{d}{dx} f(x) = \\frac{(2ax + b) \\cdot (dx^2 + ex + f) - (ax^2 + bx + c) \\cdot (2dx + e)}{g(x)^2}$`,
        "since the denominator is always greater than 0 we can just ignore it",
        "so to determine the sign of the derivative we only need to consider the numerator:",
        // `$(${2 * a}x ${signedCoef(b, '+')}) \\cdot ${d}^2 ${signedCoef(e, '+')}x ${signedCoef(f, '+')} ${signedCoef(a, '-')}x^2 ${signedCoef(b, '+')}x ${signedCoef(c, '+')} \\cdot (${2 * d}x ${signedCoef(e, '+')})$`,
        `$(2ax + b) \\cdot (dx^2 + ex + f) - (ax^2 + bx + c) \\cdot (2dx + e)$`,
        "which can be rearranged as: ",
        "$(ae-bd)x^2 + 2(af - cd)x + bf - ec$",
        "which is just a quadratic into which we can substitue our coefficients, resulting in:",
        `$${derivativeNumeratorA}x^2 ${signedCoef(
          2 * derivativeNumeratorB,
          "+"
        )}x ${signedCoef(derivativeNumeratorC, "+")}$`,
      ],
    },
    {
      header: "step 7.5 - still monotonicity",
      explanation: "continuation of step 7",
      solution: [
        "now we need to find the local extremes of the function",
        "to do that we need to determine whether the derivative changes sign (crosses the X axis)",
        "first we find the delta of the numerator of the derivative",
        `$\\Delta = ${round(deltaDerivativeNum)}$`,
        ...rootsOfQuadratic(
          derivativeNumeratorA,
          derivativeNumeratorB,
          derivativeNumeratorC
        ),
        "using these solutions and the domain from step 1 we can figure out the ranges of monotonicity:",
        ...monotonicity(monotonicityRanges()),
      ],
    },
    {
      header: "step 8 - draw a table of ranges and monotonocinicity",
      explanation:
        "table. take limits, asymptotes and derivatives and just fill it in idk.",
      solution: ["draw table", table(monotonicityRanges())],
    },
  ] as ItemProps[];
};

export default solutionArray;
