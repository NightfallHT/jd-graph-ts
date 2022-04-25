import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputSection from "./InputSection";

export interface SimpleDialogProps {
  open: boolean;
  step: string;
  range: number;
  zoom: boolean;
  derivative: boolean;
  grid: boolean;
  setOpen: (value: boolean) => void;
  setStep: (value: string) => void;
  setRange: (value: number) => void;
  setZoom: (value: boolean) => void;
  setDerivative: (value: boolean) => void;
  setGrid: (value: boolean) => void;
  //update: (value: Omit<SimpleDialogProps, 'open' | 'onClose'>) => void;
}

export default function Settings({
  open,
  step,
  range,
  zoom,
  derivative,
  grid,
  setOpen,
  setStep,
  setRange,
  setZoom,
  setDerivative,
  setGrid,
}: SimpleDialogProps) {
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDerivativeCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>,
    newValue: boolean
  ) => {
    setDerivative(newValue);
  };
  const handleZoomCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>,
    newValue: boolean
  ) => {
    setZoom(newValue);
  };
  const handleGridCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>,
    newValue: boolean
  ) => {
    setGrid(newValue);
  };
  const handleRangeSlider = (newValue: number) => {
    setRange(newValue);
  };
  const handleStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStep((event.target as HTMLInputElement).value);
  };



  return (
    <div className="settings-button">
      <Button disableRipple={true} variant="contained" onClick={handleClickOpen}>
        Settings
      </Button>
      <Dialog className="settings" onClose={handleClose} open={open}>
        <DialogTitle>Set graph and slider settings</DialogTitle>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleZoomCheckbox}
                checked={zoom}
                value={zoom}
              />
            }
            label="Enable zoom"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleDerivativeCheckbox}
                checked={derivative}
                value={derivative}
              />
            }
            label="Show derivative"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleGridCheckbox}
                checked={grid}
                value={grid}
              />
            }
            label="Show grid"
          />
        </FormGroup>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">
            Coefficient slider scale
          </FormLabel>
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
        <InputSection
          step={1}
          range={[1, 1000]}
          label="Set slider range"
          value={range}
          update={handleRangeSlider}
        />
      </Dialog>
    </div>
  );
}