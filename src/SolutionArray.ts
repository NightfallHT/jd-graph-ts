import { ItemProps } from "./SolutionCarousel";
import derivative from 'function-plot'

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
  const solutionsDen = [
    (-e + Math.sqrt(deltaDen)) / (2 * d),
    (-e - Math.sqrt(deltaDen)) / (2 * d),
  ];
  solutionsDen.sort();

  function signedCoef(coef: number, op: string) {
    if ((op === "-" && coef < 0) || (op === "+" && coef >= 0))
      return `+ ${coef}`;
    if (op === "-" && coef === 0) return "- 0";
    return `${coef}`;
  }

  function rootsOfQuadratic(a: number, b: number, c: number): string[] {
    let delta = Math.pow(b, 2) - 4 * a * c;
    if (delta < 0)
      return [`$\\Delta < 0 \\Rightarrow  x _0 \\in \\varnothing$`];
    if (delta === 0)
      return [
        `$\\Delta = 0 \\Rightarrow \\\\ x = \\frac{-b}{2a} \\ x = ${(-b / 2) * a
        }$`,
      ];
    else
      return [
        `$\\Delta > 0 \\Rightarrow$`,
        `$\\ x = \\frac{-b\\pm \\sqrt{\\Delta}}{2*a}$`,
        `$\\ x = \\frac{${signedCoef(
          b,
          "-"
        )} + \\sqrt{${delta}}}{2\\cdot ${a}}\\vee x = \\frac{${signedCoef(
          b,
          "-"
        )} - \\sqrt{${delta}}}{2\\cdot ${a}}$`,
        `$\\ x = ${(-b - Math.sqrt(delta)) / (2 * a)} \\vee x = ${(-b + Math.sqrt(delta)) / (2 * a)
        }$`,
      ];
  }
  function findDomain(delta: number): string[] {
    if (delta < 0) return [`$x \\in \\mathbb{R}$`];
    if (delta === 0)
      return [`$x \\in \\mathbb{R} \\setminus \\{${(-d / 2) * e}\\}$`];
    else
      return [
        `$x \\in \\mathbb{R} \\setminus \\{ ${solutionsDen[0]} , ${solutionsDen[1]}\\}$`,
      ];
  }
  function checkEvenness(
    a: number,
    b: number,
    c: number,
    name: string
  ): string[] {
    if (b !== 0) {
      return [`${name} isn't even beacuse`, `$ ${name}(x) \\ne ${name}(-x)$`];
    }
    return [
      `${name} is even, because the middle coefficient is equal to zero, because:`,
      "$a(-x)^2 + c = ax^2 + c$",
    ];
  }
  function limit() {
    if (deltaDen > 0) {
      return [
        "the limits around the point(s) excluded from the domain",
        `$\\lim\\limits_{x \\rightarrow ${solutionsDen[0]}^-} = ${(a * Math.pow(solutionsDen[0], 2) + b * solutionsDen[0] + c) * d > 0
          ? "\\infin"
          : "-\\infin"
        }$`,
        `$\\lim\\limits_{x \\rightarrow ${solutionsDen[0]}^+} = ${(a * Math.pow(solutionsDen[0], 2) + b * solutionsDen[0] + c) * d < 0
          ? "\\infin"
          : "-\\infin"
        }$`,
        `$\\lim\\limits_{x \\rightarrow ${solutionsDen[1]}^-} = ${(a * Math.pow(solutionsDen[1], 2) + b * solutionsDen[1] + c) * d < 0
          ? "\\infin"
          : "-\\infin"
        }$`,
        `$\\lim\\limits_{x \\rightarrow ${solutionsDen[1]}^+} = ${(a * Math.pow(solutionsDen[1], 2) + b * solutionsDen[1] + c) * d > 0
          ? "\\infin"
          : "-\\infin"
        }$`,
      ];
    } else if (deltaDen === 0) {
      return [
        "the limits around the point(s) excluded from the domain",
        `$\\lim\\limits_{x \\rightarrow ${solutionsDen[0]}^-} = ${(a * Math.pow(solutionsDen[0], 2) + b * solutionsDen[0] + c) * d > 0
          ? "\\infin"
          : "-\\infin"
        }$`,
        `$\\lim\\limits_{x \\rightarrow ${solutionsDen[0]}^+} = ${(a * Math.pow(solutionsDen[0], 2) + b * solutionsDen[0] + c) * d > 0
          ? "\\infin"
          : "-\\infin"
        }$`,
      ];
    }
    return ["there are no vertical asymptotes, since the denominator is never equal to zero"];
  }
  const derivative = (a: number, b: number, c: number, d: number, e: number, f: number) => {
    //no idea im so fucking tired
  }


  return [
    {
      header: "find out the solution with our super duper meth calculator",
      explanation: "you can navigate this carousel to find the exact steps you need to take to determine the graph of the function",
      solution: [
        "just press the arrows you dumbfuck"
      ],
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
        `$f(0)=\\frac{${signedCoef(c, "+")}}{ ${signedCoef(f, "+")}}$`,
        "3: solve",
        `$f(0)=${c / f}$`,
      ],
    },
    {
      header: "step 4 - check for evenness of the function",
      explanation: "check whether f(x) = f(-x)",
      solution: [
        "$ \\frac{ax^2 + bx + c}{dx^2 + ex + f} = \\frac{g(x)}{h(x)}$",
        "check whether the numerator is even:",
        ...checkEvenness(a, b, c, "g"),
        "check whether the denominator is even:",
        ...checkEvenness(d, e, f, "h"),
        `the function is ${b === 0 && e === 0
          ? "even, because both the nominator and the denominator are even"
          : "not even, because the nominator or the denominator or both are not even "
        }`,
      ],
    },
    {
      header: "step 5 - calculate important limits",
      explanation:
        "calculate the limits at infinity and at the point where the denominator equals zero",
      solution: [
        "the limits at infinity:",
        `$\\lim\\limits_{x\\rightarrow\\pm\\infin} = ${a / d}$`,
        ...limit(),
      ],
    },
    {
      header: "step 6 - find the asymptotes",
      explanation:
        "check for the existence of horizontal, vertical and slant asymptotes",
      solution: [
        "the limits at infinity are the horizontal asymptotes:",
        `$\\lim\\limits_{x\\rightarrow\\pm\\infin} = ${a / d}$`,
        "vertical asymptotes are the points where y -> infinity, or simply the roots of the denominator",
        "(spoiler, we did that in step 1)",
        ...rootsOfQuadratic(d, e, f),
        "slant asymptotes exist only when the polynomial in the nominator is of a higher degree than the denominator",
        "since the assignment specifically said a =/= 0 and d =/= 0, this rule is never satisfied, therefore there is no such asymptote"
      ],
    }, {
      header: "step 7 - determine the monotonicity",
      explanation:
        "function is increasing when the derivative is greater than 0 and decreasing when it's less than 0",
      solution: [
        "find the derivative",
        "determine whether the derivative changes sign (crosses the X axis)"
      ],
    }, {
      header: "step 8 - find the extremes",
      explanation:
        "extremes are where the derivative crosses 0",
      solution: [
        "find the derivative",
        "determine where the derivative changes sign (crosses the X axis)"
      ],
    }, {
      header: "step 9 - draw a table of ranges and monotonocinicity",
      explanation:
        "table. take limits, asymptotes and derivatives and just fill it in idk.",
      solution: [
        "draw table",
      ],
    }, {
      header: "step 10 - determine the set of values",
      explanation:
        "just like. global extremes. top and bottom. also try to find out whether you have any gaps in the middle",
      solution: [
        "why am i doing this",
      ],
    },
  ] as ItemProps[];
};

export default solutionArray;
