import * as React from 'react';
import { FC, ReactElement } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';

const Input = styled(MuiInput)`
  width: 42px;
`;

type InputSliderProps = {
    label: string;
}

const InputSlider = ({ label }: InputSliderProps) => {
    const name = label;
    const [value, setValue] = React.useState<number | string | Array<number | string>>(
        30,
    );

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < -100) {
            setValue(-100);
        } else if (value > 100) {
            setValue(100);
        }
    };

    return (
        <Box sx={{ width: 250 }}>
            <Typography id="input-slider" gutterBottom>
                {name}
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <Slider
                        min={-100}
                        max={100}
                        value={typeof value === 'number' ? value : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
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
                            step: 10,
                            min: -100,
                            max: 100,
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