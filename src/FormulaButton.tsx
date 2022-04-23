import { Button } from '@mui/material'
import React from 'react'
import Latex from 'react-latex'

function signedCoef(coef: number, op: string) {
    if ((op === "-" && coef < 0) || (op === "+" && coef >= 0))
        return `+ ${coef}`;
    if (op === "-" && coef === 0) return "- 0";
    return `${coef}`;
}

// interface FormulaButtonsProps {
//     buttonArr: FormulaButtonProps[];
// }

interface FormulaButtonProps {
    coeffs: number[],
    onClick: () => void;
}

// export default function FormulaButtons = ({ buttonArr }): FormulaButtonsProps => {
//     return (
//         <>

//         </>
//     )
// }

export default function FormulaButton({ coeffs, onClick }: FormulaButtonProps) {
    return (
        <div>
            <Button onClick={onClick} variant="contained" >
                <Latex>
                    {`$\\frac {${coeffs[0]}x^2 ${signedCoef(coeffs[1], '+')}x ${signedCoef(coeffs[2], '+')}}
                              {${coeffs[3]}x^2 ${signedCoef(coeffs[4], '+')}x ${signedCoef(coeffs[5], '+')}}$`}
                </Latex>
            </Button >
        </div>
    )
}
