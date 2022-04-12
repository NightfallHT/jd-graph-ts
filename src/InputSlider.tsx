import * as React from 'react';
import { FC, ReactElement } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import './App.css'

const Input = styled(MuiInput)`
  width: 42px;
`;

type InputSliderProps = {
    label: string;
    initval: number;
    update: (arg: number) => void;
}

const InputSlider = ({ label, update, initval }: InputSliderProps) => {
    const name = label;
    const [value, setValue] = React.useState<number | string | Array<number | string>>(
        initval,
    );

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < -10) {
            setValue(-10);
        } else if (value > 10) {
            setValue(10);
        }
    };

    React.useEffect(() => {
        update(value as number);
    })

    return (
        <Box sx={{ width: 250 }}>
            <Typography id="input-slider" gutterBottom>
                {name}
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <Slider
                        min={-10}
                        max={10}
                        value={typeof value === 'number' ? value : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                        step={0.1}
                    />
                </Grid>
                <Grid item>
                    <Input
                        sx={{ width: 45 }}
                        value={value}
                        size="small"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 0.1,
                            min: -10,
                            max: 10,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default InputSlider;