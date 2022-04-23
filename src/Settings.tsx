import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputSlider from './InputSlider';
import { grid } from '@mui/system';
import { stepButtonClasses } from '@mui/material';
import InputSection from './InputSection';

export interface SimpleDialogProps {
    // open: boolean;
    defaultStep: string;
    defaultRange: number;
    defaultZoom: boolean;
    defaultDerivative: boolean;
    defaultGrid: boolean;
    onClose: (value: Omit<SimpleDialogProps, 'open' | 'onClose'>) => void;
}


export default function Settings({ /*open*/ defaultStep, defaultRange, defaultZoom, defaultDerivative, defaultGrid, onClose }: SimpleDialogProps) {
    // const [selectedValue, setSelectedValue] = React.useState(emails[1]);
    const [open, setOpen] = React.useState(false);
    const [range, setRange] = React.useState(20);
    const [zoomValue, setZoomValue] = React.useState(true);
    const [derivativeValue, setDerivativeValue] = React.useState(true);
    const [gridValue, setGridValue] = React.useState(false);
    const [step, setStep] = React.useState('1');
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleDerivativeCheckbox = (event: React.ChangeEvent<HTMLInputElement>, newValue: boolean) => {
        setDerivativeValue(newValue)
    }
    const handleZoomCheckbox = (event: React.ChangeEvent<HTMLInputElement>, newValue: boolean) => {
        setZoomValue(newValue)
    }
    const handleGridCheckbox = (event: React.ChangeEvent<HTMLInputElement>, newValue: boolean) => {
        setGridValue(newValue)
    }
    const handleRangeSlider = (newValue: number) => {
        setRange(newValue)
    }
    const handleStep = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStep((event.target as HTMLInputElement).value);
    };
    // const handleClose = ({/*value: string*/ }) => {
    //     setOpen(false);
    //     // setSelectedValue(value);
    // };
    const handleClose = () => {
        setOpen(false);
        onClose({ defaultStep: step, defaultRange: range, defaultZoom: zoomValue, defaultDerivative: derivativeValue, defaultGrid: gridValue })
    };




    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                Settings
            </Button>
            <Dialog className='settings' onClose={handleClose} open={open}>
                <DialogTitle>Set graph and slider settings</DialogTitle>
                <FormGroup>
                    <FormControlLabel control={<Checkbox onChange={handleZoomCheckbox} checked={zoomValue} value={zoomValue} />} label="Enable zoom" />
                    <FormControlLabel control={<Checkbox onChange={handleDerivativeCheckbox} checked={derivativeValue} value={derivativeValue} />} label="Show derivative" />
                    <FormControlLabel control={<Checkbox onChange={handleGridCheckbox} checked={gridValue} value={gridValue} />} label="Show grid" />
                </FormGroup>
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">Coefficient slider scale</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={step}
                        onChange={handleStep}
                    >
                        <FormControlLabel value={0.1} control={<Radio />} label="0.1" />
                        <FormControlLabel value={1} control={<Radio />} label="1" />
                        <FormControlLabel value={10} control={<Radio />} label="10" />
                    </RadioGroup>
                </FormControl>
                <InputSection step={1} range={[1, 1000]} label="Set slider range" value={range} update={handleRangeSlider} />
            </Dialog>
        </div>
    );
}