import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import { grey } from "@mui/material/colors";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import "./App.css";

const theme = createTheme({
  components: {
    // Name of the component
    MuiSlider: {
      styleOverrides: {
        colorPrimary: "#efefef",
        colorSecondary: "#efefef",
        thumbColorPrimary: "#efefef",

      },
    },
  },
});

type InputSliderProps = {
  label: string;
  value: number;
  update: (arg: number) => void;
  range: number[];
  step: number;
  cantBeZero?: boolean;
};

const InputSlider = ({ label, update, value, range, step, cantBeZero }: InputSliderProps) => {
  const name = label;
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (cantBeZero && newValue === 0) return;
    update(newValue as number);
  };
  const sliderColor = grey[200];

  return (
    <Box sx={{ width: 250 }}>
      <Typography id="input-slider" gutterBottom>
        {name}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <ThemeProvider theme={theme}>
            <Slider
              min={range[0]}
              max={range[1]}
              value={typeof value === "number" ? value : 0}
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
              step={step}
            />
          </ThemeProvider>
        </Grid>
        <Grid item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InputSlider;
