import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxLabels(props) {
  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox defaultChecked />} label={props.label} />
      {//<FormControlLabel required control={<Checkbox />} label="Required" />
      //<FormControlLabel disabled control={<Checkbox />} label="Disabled" />}
}
    </FormGroup>
  );
}


