import { ItemProps } from "./SolutionCarousel";
import derivative from "function-plot";
import { re, simplify } from "mathjs";

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
  const deltaDerivativeNum =
    Math.pow(2 * (a * f - c * d), 2) - 4 * (a * e - b * d) * (b * f - e * c);

  // const numeratorDerivativeSimplified = simplify(`(2*${a}x+${b})*(${d}x^2+${e}x+${f})-(${a}x^2+${b}x+${c})*(2*${d}x+${e})`);
  // console.log(numeratorDerivativeSimplified);
  const solutionsDen = [
    (-e + Math.sqrt(deltaDen)) / (2 * d),
    (-e - Math.sqrt(deltaDen)) / (2 * d),
  ];
  solutionsDen.sort((a: number, b: number) => a - b);
  const solutionsDerivativeNumGen = () => {
    if (a * e - b * d !== 0) {
      return [
        (-2 * (a * f - c * d) + Math.sqrt(deltaDerivativeNum)) /
        (2 * (a * e - b * d)),
        (-2 * (a * f - c * d) - Math.sqrt(deltaDerivativeNum)) /
        (2 * (a * e - b * d)),
      ];
    } else {
      return [-(b * f - e * c) / (2 * (a * f - c * d))];
    }
  };
  const solutionsDerivativeNum = solutionsDerivativeNumGen();
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
        `$\\Delta = 0 \\Rightarrow \\\\ x = \\frac{-b}{2a} \\ x = ${(-b / 2) * a
        }$`,
      ];
    else
      return [
        `$\\Delta > 0 \\Rightarrow$`,
        `$\\ x = \\frac{-b\\pm \\sqrt{\\Delta}}{2*a}$`,
        `$\\ x = \\frac{${-b} + \\sqrt{${delta}}}{2\\cdot ${a}}\\vee x = \\frac{${-b} - \\sqrt{${delta}}}{2\\cdot ${a}}$`,
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
  function limit() {
    if (deltaDen > 0) {
      return [
        "the limits around the point(s) excluded from the domain:",
        "to calculate them we need to find from which direction the zero in the denominator is approached,",
        "and what is the sign the numerator takes at where the denominator equals zero",
        `$\\lim\\limits_{x \\rightarrow ${solutionsDen[0]
        }^-} \\stackrel{[\\frac{${a * Math.pow(solutionsDen[0], 2) + b * solutionsDen[0] + c > 0
          ? "+"
          : "-"
        }}{${d > 0 ? "0^+" : "0^-"}}]}{=} ${(a * Math.pow(solutionsDen[0], 2) + b * solutionsDen[0] + c) * d > 0
          ? "\\infin"
          : "-\\infin"
        }$`,
        `$\\lim\\limits_{x \\rightarrow ${solutionsDen[0]}^+} 
        \\stackrel{[\\frac{${a * Math.pow(solutionsDen[0], 2) + b * solutionsDen[0] + c > 0
          ? "+"
          : "-"
        }}{${d < 0 ? "0^+" : "0^-"}}]}{=} ${(a * Math.pow(solutionsDen[0], 2) + b * solutionsDen[0] + c) * d < 0
          ? "\\infin"
          : "-\\infin"
        }$`,
        `$\\lim\\limits_{x \\rightarrow ${solutionsDen[1]}^-}
        \\stackrel{[\\frac{${a * Math.pow(solutionsDen[1], 2) + b * solutionsDen[1] + c > 0
          ? "+"
          : "-"
        }}{${d < 0 ? "0^+" : "0^-"}}]}{=} ${(a * Math.pow(solutionsDen[1], 2) + b * solutionsDen[1] + c) * d < 0
          ? "\\infin"
          : "-\\infin"
        }$`,
        `$\\lim\\limits_{x \\rightarrow ${solutionsDen[1]}^+} 
        \\stackrel{[\\frac{${a * Math.pow(solutionsDen[1], 2) + b * solutionsDen[1] + c > 0
          ? "+"
          : "-"
        }}{${d > 0 ? "0^+" : "0^-"}}]}{=} ${(a * Math.pow(solutionsDen[1], 2) + b * solutionsDen[1] + c) * d > 0
          ? "\\infin"
          : "-\\infin"
        }$`,
      ];
    } else if (deltaDen === 0) {
      return [
        "the limits around the point(s) excluded from the domain:",
        `$\\lim\\limits_{x \\rightarrow ${solutionsDen[0]}^-}
        \\stackrel{[\\frac{${a * Math.pow(solutionsDen[0], 2) + b * solutionsDen[0] + c > 0
          ? "+"
          : "-"
        }}{${d > 0 ? "0^+" : "0^-"}}]}{=} ${(a * Math.pow(solutionsDen[0], 2) + b * solutionsDen[0] + c) * d > 0
          ? "\\infin"
          : "-\\infin"
        }$`,
        `$\\lim\\limits_{x \\rightarrow ${solutionsDen[0]}^+}
        \\stackrel{[\\frac{${a * Math.pow(solutionsDen[0], 2) + b * solutionsDen[0] + c > 0
          ? "+"
          : "-"
        }}{${d > 0 ? "0^+" : "0^-"}}]}{=} ${(a * Math.pow(solutionsDen[0], 2) + b * solutionsDen[0] + c) * d > 0
          ? "\\infin"
          : "-\\infin"
        }$`,
      ];
    }
    return [
      "there are no vertical asymptotes, since the denominator is never equal to zero",
    ];
  }
  function monotonicity() {
    if (deltaDerivativeNum <= 0) {
      if (a * e - b * d > 0) {
        if (deltaDen < 0) {
          return ["$f\\nearrow \\reals$"];
        } else if (deltaDen === 0) {
          return [
            `$f\\nearrow (-\\infty ,${solutionsDen[0]}), (${solutionsDen[0]},\\infty)$`,
          ];
        } else {
          return [
            `$f \\nearrow (-\\infty,${solutionsDen[0]}), (${solutionsDen[0]},${solutionsDen[1]}), (${solutionsDen[1]}, \\infty)$`,
          ];
        }
      } else {
        if (deltaDen < 0) {
          return ["$f\\searrow \\reals$"];
        } else if (deltaDen === 0) {
          return [
            `$f\\searrow (-\\infty ,${solutionsDen[0]}), (${solutionsDen[0]},\\infty)$`,
          ];
        } else {
          return [
            `$f \\searrow (-\\infty,${solutionsDen[0]}), (${solutionsDen[0]},${solutionsDen[1]}), (${solutionsDen[1]}, \\infty)$`,
          ];
        }
      }
    } else if (deltaDerivativeNum > 0) {
      if (a * e - b * d > 0) {
        if (deltaDen < 0) {
          return [
            `$f\\nearrow (-\\infty, ${solutionsDerivativeNum[0]}), (${solutionsDerivativeNum[1]}, \\infty)$`,
            `$f\\searrow (${solutionsDerivativeNum[0]}, ${solutionsDerivativeNum[1]})$`,
          ];
        } else if (deltaDen === 0) {
          return [
            `$f\\nearrow (-\\infty, ${Math.min(
              solutionsDerivativeNum[0],
              solutionsDen[0]
            )}), (${solutionsDen[1]}, \\infty$`,
            `$f\\nearrow (${Math.max(
              solutionsDerivativeNum[0],
              solutionsDen[0]
            )}, ${solutionsDerivativeNum[1]})$`,
          ];
        } else {
          return [
            `$f\\nearrow (-\\infty, ${Math.min(
              solutionsDen[0],
              solutionsDerivativeNum[0]
            )}), (${Math.min(
              solutionsDen[0],
              solutionsDerivativeNum[0]
            )},${Math.max(solutionsDen[0], solutionsDerivativeNum[0])})$`,
            `$\\searrow(${Math.max(
              solutionsDen[0],
              solutionsDerivativeNum[0]
            )}, ${Math.min(
              solutionsDen[1],
              solutionsDerivativeNum[1]
            )} ),(${Math.min(
              solutionsDen[1],
              solutionsDerivativeNum[1]
            )}, -\\infty)$`,
          ];
        }
      } else {
        return [
          `f$\\nearrow (${solutionsDerivativeNum[0]}, ${solutionsDerivativeNum[1]})$`,
          `f$\\searrow (-\\infty, ${solutionsDerivativeNum[0]}), (${solutionsDerivativeNum[1]}, \\infty)$`,
        ]; //TODO: Add all the missing cases (I'm fucking tired)
      }
    }
    return ["dupa"];
  }
  function extremes(): string[] {
    const solveDerivative = () => {
      if (deltaDerivativeNum <= 0) {
        return [
          "$\\Delta \\leq 0 \\Rightarrow$ no extremes",
          ...monotonicity(),
        ];
      } else {
        /*return rootsOfQuadratic(
          a * e - b * d,
          2 * (a * f - c * d),
          b * f - e * c
        );
        */
        return ["$\\Delta \\geq 0 \\Rightarrow$ 2 extremes", ...monotonicity()];
      }
    };
    return [
      "first we find the delta:",
      `$\\Delta = b^2 - 4ac = ${deltaDerivativeNum}$`,
      ...solveDerivative(),
    ];
  }
  const derivative = (
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number
  ) => {
    //no idea im so fucking tired
  };

  return [
    {
      header: "find out the solution with our super duper meth calculator",
      explanation:
        "you can navigate this carousel to find the exact steps you need to take to determine the graph of the function",
      solution: ["just press the arrows you dumbfuck"],
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
        `$f(0)=${c / f}$`,
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
        `${b === 0
          ? "$ b = 0 \\iff g \\ is \\  even$"
          : "$b \\neq 0 \\iff g \\ isn't \\ even$"
        }`,
        "check whether the denominator is even:",
        `${e === 0
          ? "$e = 0 \\iff h \\ is \\  even$"
          : "$e \\neq 0 \\iff h \\ isn't \\ even$"
        }`,
        `the function is ${b === 0 && e === 0
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
        `$\\lim\\limits_{x\\rightarrow\\pm\\infin} \\frac{a + \\frac{b}{x} + \\frac{c}{x^2}}{d + \\frac{e}{x} + \\frac{f}{x^2}} =\\frac{a}{d} = ${a / d
        } $`,
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
        "slant asymptotes exist only when the polynomial in the numerator is of a higher degree than the denominator",
        "since the assignment specifically said $a \\neq 0$ and $d \\neq 0$, this rule is never satisfied, therefore there is no such asymptote",
      ],
    },
    {
      header: "step 7 - determine the monotonicity",
      explanation:
        "function is increasing when the derivative is greater than 0 and decreasing when it's less than 0",
      solution: [
        "find the derivative",
        `$\\frac{d}{dx} \\frac{f(x)}{g(x)} = \\frac{\\frac{d}{dx} f(x) \\cdot g(x) - f(x) \\cdot \\frac{d}{dx} g(x)}{g(x)^2}$`,
        "let's treat our numerator and denominator as two separate functions",
        `$f(x) = ax^2 + bx + c, g(x) = dx^2 + ex + f$`,

        `$\\frac{d}{dx} f(x) = \\frac{(2ax + b) \\cdot (dx^2 + ex + f) - (ax^2 + bx + c) \\cdot (2dx + e)}{g(x)^2}$`,
        "since the denominator is always greater than 0 we can just ignore it",
        "so to determine whether and where it crosses 0 we just take the roots of the numerator",
        // `$(${2 * a}x ${signedCoef(b, '+')}) \\cdot ${d}^2 ${signedCoef(e, '+')}x ${signedCoef(f, '+')} ${signedCoef(a, '-')}x^2 ${signedCoef(b, '+')}x ${signedCoef(c, '+')} \\cdot (${2 * d}x ${signedCoef(e, '+')})$`,
        `$(2ax + b) \\cdot (dx^2 + ex + f) - (ax^2 + bx + c) \\cdot (2dx + e)$`,
        "which can be rewritten as ",
        "$(ae-bd)x^2 + 2(af - cd)x + bf - ec$",
        "which is just a quadratic into which we can substitue our coefficients, resulting in:",
        `$${a * e - b * d}x^2 ${signedCoef(
          2 * (a * f - c * d),
          "+"
        )}x ${signedCoef(b * f - e * c, "+")}$`,
        "determine whether the derivative changes sign (crosses the X axis)",
        ...extremes(),
      ],
    },
    {
      header: "step 8 - find the extremes",
      explanation: "extremes are where the derivative crosses 0",
      solution: [
        "find the derivative",
        "determine where the derivative changes sign (crosses the X axis)",
      ],
    },
    {
      header: "step 9 - draw a table of ranges and monotonocinicity",
      explanation:
        "table. take limits, asymptotes and derivatives and just fill it in idk.",
      solution: ["draw table"],
    },
    {
      header: "step 10 - determine the set of values",
      explanation:
        "just like. global extremes. top and bottom. also try to find out whether you have any gaps in the middle",
      solution: ["why am i doing this"],
    },
  ] as ItemProps[];
};

export default solutionArray;
