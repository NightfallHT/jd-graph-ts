import { ItemProps } from "./SolutionCarousel";

const solutionArray = (a: number, b: number, c: number, d: number, e: number, f: number) => {
    let deltaNum = b ^ 2 - 4 * a * c;
    let deltaDen = e ^ 2 - 4 * d * f;

    function signedCoef(coef: number, op: string) {
        if ((op === '-' && coef < 0) || (op === '+' && coef >= 0)) return `+ ${coef}`
        if (op === '-' && coef === 0) return "- 0"
        return `${coef}`
    }

    function rootsOfQuadratic(a: number, b: number, c: number) {
        let delta = (b ^ 2) - (4 * a * c);
        if (delta < 0) return `$$\\Delta < 0 \\Rightarrow  x \\notin \\varnothing$$`;
        if (delta === 0) return `$$\\Delta = 0 \\Rightarrow \\\\ x = \\frac{-b}{2*a} \\\\ x = \\frac{${signedCoef(b, '-')}}{2\\cdot ${a}}$$`
        if (delta > 0) return `$\\Delta > 0 \\Rightarrow
                                \\\\ x = \\frac{-b\\pm \\sqrt{\\Delta}}{2*a}
                                \\\\ x = \\frac{${signedCoef(b, '-')} + \\sqrt{${delta}}}{2\\cdot ${a}}\\wedge x = \\frac{${signedCoef(b, '-')} - \\sqrt{${delta}}}{2\\cdot ${a}}
                                \\\\ x = ${-b + Math.sqrt(delta) / 2 * a} \\wedge x = ${-b - Math.sqrt(delta) / 2 * a}$$`
    }

    return [{
        header: "step 1 - find the domain",
        explanation: "find xs where the denominator = 0",
        solution: [
            "1: take the denominator",
            `$$ ${d}x^2 ${signedCoef(e, '+')}x ${signedCoef(f, '+')}$$`,
            "2: calculate delta",
            `$$\\Delta = b^2 - 4ac \\\\ \\Delta = ${e}^2 - 4\\cdot ${d}\\cdot ${f}\\\\ \\Delta = ${deltaDen}$$`,
            "3: determine the roots based on delta value",
            rootsOfQuadratic(d, e, f),
            "4: roots of the equatikon are where the denominator = 0, therefore:",
        ]
    },

    ] as ItemProps[]
};

export default solutionArray;