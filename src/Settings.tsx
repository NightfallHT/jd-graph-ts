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

export interface SimpleDialogProps {
    open: boolean;
    radioValue: string;
    rangeSliderVal: number;
    checkedZoom: boolean;
    checkedDerivative: boolean;
    checkedGrid: boolean;
    onClose: (value: Omit<SimpleDialogProps, 'open' | 'onClose'>) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
    const { onClose, open, radioValue, rangeSliderVal, checkedZoom, checkedDerivative, checkedGrid } = props;
    const handleClose = () => {
        onClose({ radioValue, rangeSliderVal, checkedZoom, checkedDerivative, checkedGrid });
    };
    // const [radioValue, setRadioValue] = useState();
    // const [rangeSliderVal, setRangeSliderVal] = useState(1);
    // const [checkedZoom, setCheckedZoom] = useState(true);
    // const [checkedDerivative, setCheckedDerivative] = useState(true);
    // const [checkedGrid, setCheckedGrid] = useState(true);
    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Set graph and slider settings</DialogTitle>
            <FormGroup>
                <FormControlLabel control={<Checkbox checked={checkedZoom} />} label="Enable zoom" />
                <FormControlLabel control={<Checkbox checked={checkedDerivative} />} label="Show derivative" />
                <FormControlLabel control={<Checkbox checked={checkedGrid} />} label="Show grid" />
            </FormGroup>
            <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">Coefficient slider scale</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={radioValue}
                >
                    <FormControlLabel value="0.1" control={<Radio />} label="0.1" />
                    <FormControlLabel value="1" control={<Radio />} label="1" />
                    <FormControlLabel value="10" control={<Radio />} label="10" />
                </RadioGroup>
            </FormControl>
            <InputSlider step={1} range={[1, 1000]} label="Set slider range" initval={rangeSliderVal} />
        </Dialog>
    );
}

export default function Settings(props: Omit<SimpleDialogProps, 'open'>) {
    const [open, setOpen] = React.useState(false);
    // const [selectedValue, setSelectedValue] = React.useState(emails[1]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
        // setSelectedValue(value);
    };

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                Settings
            </Button>
            <SimpleDialog
                {...props}
                open={open}
            />
        </div>
    );
}