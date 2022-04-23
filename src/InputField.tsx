import { Input } from '@mui/material'
import React from 'react'


interface InputFieldProps {
    label: string;
    value: number;
    update: (arg: number) => void;
    range: number[];
    step: number;
    cantBeZero?: boolean;
}

const InputField = ({ label, value, update, range, step, cantBeZero }: InputFieldProps) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "" && !cantBeZero) {
            update(0);
            return
        } else if (event.target.value === "" && cantBeZero) {
            update(1);
            return
        }
        if (parseFloat(event.target.value) < range[0]) {
            update(range[0]);
        } else if (parseFloat(event.target.value) > range[1]) {
            update(range[1]);
        }
        update(Number(event.target.value));
    };
    const handleBlur = () => {
        if (value < range[0]) {
            update(range[0]);
        } else if (value > range[1]) {
            update(range[1]);
        }
    };

    return (
        <div className='input-field'>
            <Input
                sx={{ width: 45 }}
                value={value}
                size="small"
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{
                    value: value,
                    step: step,
                    min: range[0],
                    max: range[1],
                    type: "number",
                    "aria-labelledby": "input-slider",
                }}
            />
        </div>
    )
}
export default InputField;