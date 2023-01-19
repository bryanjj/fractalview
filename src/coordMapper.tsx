import * as React from "react";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
// import Box from '@mui/material/Box'
import TextField from "@mui/material/TextField";

interface CoordMappingButtonProps {
  value?: string;
  setValue: any;
  defaultButton: string;
}
const CoordMappingButton = (props: CoordMappingButtonProps): JSX.Element => {
  const [constVal, setConstVal] = React.useState<string>("0.0");
  const [groupVal, setGroupVal] = React.useState<string>(props.defaultButton);
  const [disabled, setDisabled] = React.useState<boolean>(
    props.defaultButton !== "const"
  );

  const textChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    setConstVal(e.target.value);
    props.setValue(e.target.value);
  };

  const toggleChange = (e: React.MouseEvent, value: string): void => {
    setGroupVal(value);
    if (value === "const") {
      setDisabled(false);
    } else {
      setDisabled(true);
      props.setValue(value);
    }
  };

  return (
    <Grid container>
      <Grid item xs={7}>
        <ToggleButtonGroup
          color="primary"
          value={groupVal}
          exclusive
          onChange={toggleChange}
        >
          <ToggleButton value="x">X</ToggleButton>
          <ToggleButton value="y">Y</ToggleButton>
          <ToggleButton value="const">const</ToggleButton>
          {/* <ToggleButton value="time">t</ToggleButton> */}
        </ToggleButtonGroup>
      </Grid>
      <Grid item xs={5}>
        <TextField
          id="blah"
          type="number"
          size="small"
          disabled={disabled}
          value={constVal}
          onChange={textChange}
          InputProps={{ inputProps: { min: "-2.0", max: "2.0", step: "0.01" } }}
        />
      </Grid>
    </Grid>
  );
};

interface CoordMapperProps {
  coordRealZ0: string | undefined;
  coordImagZ0: string | undefined;
  coordRealC: string | undefined;
  coordImagC: string | undefined;
  setCoordRealZ0: (s: string) => void;
  setCoordImagZ0: (s: string) => void;
  setCoordRealC: (s: string) => void;
  setCoordImagC: (s: string) => void;
}
const CoordMapper = (props: CoordMapperProps): JSX.Element => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={4}>
        <h4>real Z0</h4>
      </Grid>
      <Grid item xs={6}>
        <CoordMappingButton
          setValue={props.setCoordRealZ0}
          value={props.coordRealZ0}
          defaultButton="const"
        />
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={4}>
        <h4>imag Z0</h4>
      </Grid>
      <Grid item xs={6}>
        <CoordMappingButton
          setValue={props.setCoordImagZ0}
          value={props.coordImagZ0}
          defaultButton="const"
        />
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={4}>
        <h4>real c</h4>
      </Grid>
      <Grid item xs={6}>
        <CoordMappingButton
          setValue={props.setCoordRealC}
          value={props.coordRealC}
          defaultButton="x"
        />
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={4}>
        <h4>imag c</h4>
      </Grid>
      <Grid item xs={6}>
        <CoordMappingButton
          setValue={props.setCoordImagC}
          value={props.coordImagC}
          defaultButton="y"
        />
      </Grid>
    </Grid>
  );
};

export default CoordMapper;
