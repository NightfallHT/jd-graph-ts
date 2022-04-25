import { Button } from '@mui/material'
import React from 'react'
import Latex from 'react-latex'
import { prettifyCoeffs } from './utils'

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
            <Button style={{ padding: '12px', margin: '5px' }} onClick={onClick} variant="contained" >
                <Latex>
                    {`$\\Large{\\frac {${prettifyCoeffs(coeffs[0], coeffs[1], coeffs[2])}}
                              {${prettifyCoeffs(coeffs[3], coeffs[4], coeffs[5])}}}$`}
                </Latex>
            </Button >
        </div>
    )
}
