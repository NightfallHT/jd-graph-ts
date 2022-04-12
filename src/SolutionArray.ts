import { ItemProps } from "./SolutionCarousel";

const solutionArray = (a: number, b: number, c: number, d: number, e: number, f: number) => {
    let deltaNum = (Math.pow(b, 2)) - (4 * a * c);
    let deltaDen = (Math.pow(e, 2)) - (4 * d * f);

    function signedCoef(coef: number, op: string) {
        if ((op === '-' && coef < 0) || (op === '+' && coef >= 0)) return `+ ${coef}`
        if (op === '-' && coef === 0) return "- 0"
        return `${coef}`
    }

    function rootsOfQuadratic(a: number, b: number, c: number): string[] {
        let delta = (Math.pow(b, 2)) - (4 * a * c);
        if (delta < 0) return [`$\\Delta < 0 \\Rightarrow  x _0 \\in \\varnothing$`];
        if (delta === 0) return [`$\\Delta = 0 \\Rightarrow \\\\ x = \\frac{-b}{2*a} \\\ x = \\frac{${signedCoef(b, '-')}}{2\\cdot ${a}}$`]
        else return [`$\\Delta > 0 \\Rightarrow$`,
            `$\\\ x = \\frac{-b\\pm \\sqrt{\\Delta}}{2*a}$`,
            `$\\\ x = \\frac{${signedCoef(b, '-')} + \\sqrt{${delta}}}{2\\cdot ${a}}\\wedge x = \\frac{${signedCoef(b, '-')} - \\sqrt{${delta}}}{2\\cdot ${a}}$`,
            `$\\\ x = ${-b + Math.sqrt(delta) / 2 * a} \\wedge x = ${-b - Math.sqrt(delta) / 2 * a}$`]
    }

    function findDomain(delta: number): string[] {
        if (delta < 0) return [`$x \\in \\mathbb{R}$`];
        if (delta === 0) return [`$x \\in \\mathbb{R} \\setminus \\frac{${signedCoef(b, '-')}}{2\\cdot ${a}}$`]
        else return [`$x \\in \\mathbb{R} \\setminus \\{ ${-b + Math.sqrt(delta) / 2 * a} , ${-b - Math.sqrt(delta) / 2 * a}\\}$`]
    }
    return [{
        header: "step 1 - find the domain",
        explanation: "find xs where the denominator = 0",
        solution: [
            "1: take the denominator",
            `$ ${d}x^2 ${signedCoef(e, '+')}x ${signedCoef(f, '+')}$`,
            "2: calculate delta",
            `$\\Delta = b^2 - 4ac$`,
            `$\\Delta = ${e}^2 - 4\\cdot ${d}\\cdot ${f}$`,
            `$\\Delta = ${deltaDen}$`,
            "3: determine the roots based on delta value",
            ...rootsOfQuadratic(d, e, f),
            "4: roots of the equation are where the denominator = 0, therefore:",
            ...findDomain(deltaNum)
        ]
    },
    {
        header: "step 2 - find roots",
        explanation: "find xs where the nominator = 0",
        solution: [
            "1: take the numerator",
            `$ ${a}x^2 ${signedCoef(b, '+')}x ${signedCoef(c, '+')}$`,
            "2: calculate delta",
            `$\\Delta = b^2 - 4ac$`,
            `$\\Delta = ${b}^2 - 4\\cdot ${a}\\cdot ${c}$`,
            `$\\Delta = ${deltaDen}$`,
            "3: determine the roots based on delta value",
            ...rootsOfQuadratic(a, b, c),
        ]
    },
    {
        header: "step 3 - find where function crosses the Y axis",
        explanation: "determine the value of f(x) when x = 0",
        solution: [
            "1: substitute 0 for x in the function equation",
            `$ f(0)=\\frac{${a} \\ \\cdot \\ 0^2 ${signedCoef(b, '+')} \\ \\cdot \\ 0 ${signedCoef(c, '+')}}{${d} \\ \\cdot \\ 0^2 ${signedCoef(e, '+')} \\ \\cdot \\ 0 ${signedCoef(f, '+')}}$`,
            "2: cancel the 0's",
            `$f(0)=\\frac{${signedCoef(c, '+')}}{ ${signedCoef(f, '+')}}$`,
            "3: solve",
            `$f(0)=${c / f}$`,
        ]
    },

    ] as ItemProps[]
};

export default solutionArray;