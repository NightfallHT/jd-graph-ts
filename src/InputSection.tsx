import React from 'react'
import InputField from './InputField';
import InputSlider from './InputSlider';

type InputSectionProps = {
    label: string;
    value: number;
    update: (arg: number) => void;
    range: number[];
    step: number;
    cantBeZero?: boolean;
};

export default function InputSection({ label, value, range, step, cantBeZero, update }: InputSectionProps) {
    return (
        <div className='input-section'>
            <InputSlider step={step} range={[range[0], range[1]]} label={label} update={update} value={value} cantBeZero={cantBeZero} />
            <InputField step={step} range={[range[0], range[1]]} label={label} update={update} value={value} cantBeZero={cantBeZero} />
        </div>
    )
}