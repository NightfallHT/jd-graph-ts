import Button, { ButtonProps } from '@mui/material/Button';
import React from 'react'
import Latex from 'react-latex'
import { prettifyCoeffs } from './utils'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(grey[200]),
    backgroundColor: grey[200],
    boxShadow: `-6px -6px 14px rgba(255, 255, 255, .7),
                -6px -6px 10px rgba(255, 255, 255, .5),
                6px 6px 8px rgba(255, 255, 255, .075),
                6px 6px 10px rgba(0, 0, 0, .15)`,
    '&:hover': {
        backgroundColor: grey[200],
        boxShadow: `-2px -2px 6px rgba(255, 255, 255, .6),
        -2px -2px 4px rgba(255, 255, 255, .4),
        2px 2px 2px rgba(255, 255, 255, .05),
        2px 2px 4px rgba(0, 0, 0, .1)`
    },
    '&:active': {
        boxShadow: `inset -2px -2px 6px rgba(255, 255, 255, .7),
              inset -2px -2px 4px rgba(255, 255, 255, .5),
              inset 2px 2px 2px rgba(255, 255, 255, .075),
              inset 2px 2px 4px rgba(0, 0, 0, .15)`
    }
}));

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
    randomize?: boolean;
}

// export default function FormulaButtons = ({ buttonArr }): FormulaButtonsProps => {
//     return (
//         <>

//         </>
//     )
// }

export default function FormulaButton({ coeffs, onClick, randomize }: FormulaButtonProps) {
    function checkIfRandom() {
        if (randomize) return 'RANDOMIZE'
        return `$\\Large{\\frac {${prettifyCoeffs(coeffs[0], coeffs[1], coeffs[2])}}
            {${prettifyCoeffs(coeffs[3], coeffs[4], coeffs[5])}}}$`
    }
    return (
        <div className='formula-button'>
            <ColorButton disableRipple={true} style={{ width: '100%', height: '100%' }} onClick={onClick} variant="contained" >
                <Latex>
                    {checkIfRandom()}
                </Latex>
            </ColorButton >
        </div>
    )
}
