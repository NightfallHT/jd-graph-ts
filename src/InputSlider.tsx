import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import "./App.css";
import { NumberLiteralType } from "typescript";

const Input = styled(MuiInput)`
  width: 42px;
`;

type InputSliderProps = {
  label: string;
  initval: number;
  update?: (arg: number) => void;
  range: number[];
  step: number;
  cantBeZero?: boolean;
};

const InputSlider = ({ label, update, initval, range, step, cantBeZero }: InputSliderProps) => {
  const name = label;
  const [value, setValue] = React.useState<
    number | string | Array<number | string>
  >(initval);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (cantBeZero && newValue === 0) return;
    setValue(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setValue(1);
      return
    }
    if (parseFloat(event.target.value) < range[0]) {
      setValue(range[0]);
    } else if (parseFloat(event.target.value) > range[1]) {
      setValue(range[1]);
    }
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < range[0]) {
      setValue(range[0]);
    } else if (value > range[1]) {
      setValue(range[1]);
    }
  };

  React.useEffect(() => {
    if (!update) return
    if (value < range[0]) {
      setValue(range[0]);
    } else if (value > range[1]) {
      setValue(range[1]);
    }
    update(value === "" ? 0 : (value as number));

  });

  return (
    <Box sx={{ width: 250 }}>
      <Typography id="input-slider" gutterBottom>
        {name}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            min={range[0]}
            max={range[1]}
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            step={step}
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
              value: value,
              step: step,
              min: range[0],
              max: range[1],
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default InputSlider;
